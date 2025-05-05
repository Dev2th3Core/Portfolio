import { GoogleGenerativeAI } from '@google/generative-ai';
import { defaultConfig } from './config';
import { professionalProfile } from '../../data/ai-context/jd-context';
import { JDAnalysisResult, SkillMatch, ExperienceAnalysis, WorkPreferenceMatch } from '../../types/ai';

export class JDAnalysisService {
  private static instance: JDAnalysisService;

  private constructor() {}

  public static getInstance(): JDAnalysisService {
    if (!JDAnalysisService.instance) {
      JDAnalysisService.instance = new JDAnalysisService();
    }
    return JDAnalysisService.instance;
  }

  private cleanJsonResponse(text: string): string {
    // Remove markdown code block syntax and any other formatting
    return text
      .replace(/```json\s*/, '') // Remove opening ```json
      .replace(/```\s*$/, '')    // Remove closing ```
      .trim();                   // Remove extra whitespace
  }

  private parseWorkMode(requirement: string): string[] {
    // Convert requirement to lowercase and split by common separators
    return requirement.toLowerCase()
      .split(/[\/,\s]+/) // Split by forward slash, comma, or whitespace
      .filter(mode => mode) // Remove empty strings
      .map(mode => {
        // Map common variations to standard terms
        if (mode === 'wfh' || mode.includes('home')) return 'remote';
        if (mode === 'onsite' || mode.includes('office')) return 'onsite';
        return mode;
      });
  }

  private async analyzeJobDescription(jdText: string, customPrompt?: string): Promise<{
    skills: string[],
    experience: ExperienceAnalysis,
    preferences: WorkPreferenceMatch[]
  }> {
    const prompt = `
      Analyze this job description and extract:
      1. Technical skills and technologies required (as a list)
      2. Years of experience required (as a number)
      3. Work preferences like work mode and schedule
      ${customPrompt ? `\nAdditional focus areas:\n${customPrompt}` : ''}
      
      Return only a JSON object with this structure, no other text:
      {
        "skills": string[],
        "requiredYears": number,
        "workPreferences": [
          {
            "type": "workMode" | "workDays" | "other",
            "requirement": string,
            "details": string
          }
        ]
      }

      Job Description: ${jdText}
    `;

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: defaultConfig.modelName });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanResponse = this.cleanJsonResponse(response.text());
    
    try {
      const parsed = JSON.parse(cleanResponse);
      
      const currentYears = professionalProfile.totalExperience;
      const requiredYears = parsed.requiredYears || 0;
      
      // Build experience analysis
      const experienceAnalysis: ExperienceAnalysis = {
        requiredYears,
        currentYears,
        isMatch: currentYears >= requiredYears,
        analysis: this.generateExperienceAnalysis(currentYears, requiredYears)
      };

      // Map AI response to work preferences
      const workPreferences: WorkPreferenceMatch[] = parsed.workPreferences.map((pref: { type: string; requirement: string; }) => {
        let matches = false;
        
        if (pref.type === 'workMode') {
          const modes = this.parseWorkMode(pref.requirement);
          matches = modes.some(mode => 
            Boolean(professionalProfile.workPreferences.location[mode as keyof typeof professionalProfile.workPreferences.location])
          );

          // Update the requirement to be more readable
          pref.requirement = modes.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join('/');
        } else if (pref.type === 'workDays') {
          const daysMatch = pref.requirement.match(/(\d+)/);
          const requiredDays = daysMatch ? parseInt(daysMatch[1], 10) : 5;
          matches = requiredDays <= professionalProfile.workPreferences.workSchedule.daysPerWeek;
        } else {
          matches = true;
        }

        return {
          preference: pref.type,
          requirement: pref.requirement,
          matches,
          comment: matches 
            ? `Open to ${pref.requirement} work arrangement` 
            : `Current preferences don't align with ${pref.requirement} requirement`
        };
      });

      return { 
        skills: parsed.skills,
        experience: experienceAnalysis, 
        preferences: workPreferences 
      };
    } catch (error) {
      console.error('Failed to parse AI response:', cleanResponse);
      throw new Error('Failed to parse job description analysis');
    }
  }

  private generateExperienceAnalysis(current: number, required: number): string {
    if (current >= required) {
      return "Meets the required experience criteria.";
    }
    
    const gap = required - current;
    if (gap <= 2) {
      return `Slightly under the required experience by ${gap.toFixed(1)} years, but demonstrates rapid skill acquisition and diverse project experience that could compensate for the gap.`;
    }
    return `Experience gap of ${gap.toFixed(1)} years from the requirement.`;
  }

  public async analyzeJD(jdText: string, customPrompt?: string): Promise<JDAnalysisResult> {
    try {
      // Get all analysis in one call
      const { skills, experience, preferences } = await this.analyzeJobDescription(jdText, customPrompt);
      
      // Analyze skills
      const skillMatches: SkillMatch[] = [];
      for (const skill of skills) {
        const match = this.findSkillMatch(skill);
        skillMatches.push(match);
      }
      
      // Calculate overall score
      const overallScore = this.calculateOverallScore(
        skillMatches,
        experience,
        preferences
      );

      // Generate summary and key points
      const keyStrengths = this.generateKeyStrengths(skillMatches, experience);
      const potentialConcerns = this.generateConcerns(skillMatches, experience, preferences);

      return {
        skillsAnalysis: {
          matches: skillMatches,
          overallScore: Math.round((skillMatches.filter(s => s.match !== 'missing').length / skillMatches.length) * 100),
          summary: this.generateSkillsSummary(skillMatches)
        },
        experienceAnalysis: experience,
        workPreferences: preferences,
        overallFit: {
          score: Math.round(overallScore),
          summary: this.generateOverallSummary(overallScore),
          keyStrengths,
          ...(potentialConcerns.length && { potentialConcerns })
        }
      };
    } catch (error) {
      console.error('Error analyzing JD:', error);
      throw new Error('Failed to analyze job description');
    }
  }

  private findSkillMatch(requiredSkill: string): SkillMatch {
    const allSkills = Object.values(professionalProfile.skillsets).flat();
    const requiredSkillLower = requiredSkill.toLowerCase();
    
    // Look for exact or fuzzy match
    const exactOrFuzzyMatch = allSkills.find(skill => {
      const skillLower = skill.name.toLowerCase();
      return skillLower === requiredSkillLower || // Exact match
             skillLower.includes(requiredSkillLower) || // Skill contains required
             requiredSkillLower.includes(skillLower); // Required contains skill
    });

    if (exactOrFuzzyMatch) {
      return {
        skill: requiredSkill,
        match: 'exact',
        confidence: exactOrFuzzyMatch.name.toLowerCase() === requiredSkillLower ? 1 : 0.9,
        relevantExperience: `${exactOrFuzzyMatch.yearsOfExperience} years with ${exactOrFuzzyMatch.projectsUsed.join(', ')}`
      };
    }

    // Look for similar skills
    const similarSkill = allSkills.find(skill =>
      skill.relatedSkills.some(related => {
        const relatedLower = related.toLowerCase();
        return relatedLower === requiredSkillLower ||
               relatedLower.includes(requiredSkillLower) ||
               requiredSkillLower.includes(relatedLower);
      })
    );

    if (similarSkill) {
      return {
        skill: requiredSkill,
        match: 'similar',
        confidence: 0.7,
        alternativeSkills: [similarSkill.name, ...similarSkill.relatedSkills],
        relevantExperience: `Experience with similar technologies: ${similarSkill.name}`
      };
    }

    // No match found
    return {
      skill: requiredSkill,
      match: 'missing',
      confidence: 0
    };
  }

  private generateSkillsSummary(matches: SkillMatch[]): string {
    const exactMatches = matches.filter(m => m.match === 'exact').length;
    const similarMatches = matches.filter(m => m.match === 'similar').length;
    const missing = matches.filter(m => m.match === 'missing').length;

    return `Matches ${exactMatches} required skills exactly, has similar experience in ${similarMatches} skills, and lacks ${missing} required skills.`;
  }

  private generateKeyStrengths(
    skillMatches: SkillMatch[], 
    experienceAnalysis: ExperienceAnalysis
  ): string[] {
    const strengths: string[] = [];

    // Add experience-based strength
    if (experienceAnalysis.isMatch) {
      strengths.push("Meets or exceeds required years of experience");
    }

    // Add skills-based strengths
    const exactMatches = skillMatches.filter(m => m.match === 'exact');
    if (exactMatches.length > 0) {
      strengths.push(`Strong match in ${exactMatches.length} key required skills`);
    }

    // Add domain expertise if relevant
    if (professionalProfile.domainExpertise.healthcare) {
      strengths.push("Healthcare domain expertise with FHIR and HL7 standards");
    }

    return strengths;
  }

  private generateConcerns(
    skillMatches: SkillMatch[],
    experienceAnalysis: ExperienceAnalysis,
    workPreferences: WorkPreferenceMatch[]
  ): string[] {
    const concerns: string[] = [];

    // Experience concerns
    if (!experienceAnalysis.isMatch) {
      concerns.push(experienceAnalysis.analysis);
    }

    // Skills concerns
    const missingSkills = skillMatches.filter(m => m.match === 'missing');
    if (missingSkills.length > 0) {
      concerns.push(`Missing experience in: ${missingSkills.map(s => s.skill).join(', ')}`);
    }

    // Work preference concerns
    const unmatchedPreferences = workPreferences.filter(p => !p.matches);
    if (unmatchedPreferences.length > 0) {
      concerns.push(unmatchedPreferences[0].comment);
    }

    return concerns;
  }

  private calculateOverallScore(
    skillMatches: SkillMatch[],
    experience: ExperienceAnalysis,
    preferences: WorkPreferenceMatch[]
  ): number {
    const skillScore = (skillMatches.filter(s => s.match !== 'missing').length / skillMatches.length) * 100;
    const experienceScore = experience.isMatch ? 100 : 50;
    const preferenceScore = (preferences.filter(p => p.matches).length / preferences.length) * 100;

    // Weighted average: 50% skills, 30% experience, 20% preferences
    return (skillScore * 0.5) + (experienceScore * 0.3) + (preferenceScore * 0.2);
  }

  private generateOverallSummary(score: number): string {
    if (score >= 80) {
      return "Strong match for the position with relevant skills and experience.";
    } else if (score >= 60) {
      return "Good potential match with some areas for growth.";
    } else {
      return "May need additional experience or skills for this role.";
    }
  }
}