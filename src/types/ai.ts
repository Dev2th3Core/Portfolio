export interface AIConfig {
  apiKey: string;
  modelName: string;
  maxTokens: number;
  temperature: number;
}

export interface SkillMatch {
  skill: string;
  match: 'exact' | 'similar' | 'missing';
  confidence: number;
  alternativeSkills?: string[];
  relevantExperience?: string;
}

export interface ExperienceAnalysis {
  requiredYears: number;
  currentYears: number;
  isMatch: boolean;
  analysis: string;
}

export interface WorkPreferenceMatch {
  preference: 'location' | 'workMode' | 'workDays' | 'other';
  requirement: string;
  matches: boolean;
  comment: string;
}

export interface JDAnalysisResult {
  skillsAnalysis: {
    matches: SkillMatch[];
    overallScore: number;
    summary: string;
  };
  experienceAnalysis: ExperienceAnalysis;
  workPreferences: WorkPreferenceMatch[];
  overallFit: {
    score: number; // 0-100
    summary: string;
    keyStrengths: string[];
    potentialConcerns?: string[];
  };
}

export interface ContextChunk {
  content: string;
  section: string;
  priority: number;
  tokens: number;
}