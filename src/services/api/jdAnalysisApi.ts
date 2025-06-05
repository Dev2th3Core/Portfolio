import { JDAnalysisResult } from '../../types/ai';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ANALYSIS_ENDPOINT = `${BASE_URL}/.netlify/functions/jd-analysis`;

export const analyzeJobDescription = async (
  jdText: string, 
  customPrompt?: string
): Promise<JDAnalysisResult> => {
  try {
    const response = await fetch(ANALYSIS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jdText,
        customPrompt
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Server error:', errorData);
      throw new Error('Failed to analyze job description');
    }

    const result: JDAnalysisResult = await response.json();
    return result;
  } catch (error) {
    console.error('Error analyzing JD:', error);
    throw new Error('Failed to analyze job description');
  }
};
