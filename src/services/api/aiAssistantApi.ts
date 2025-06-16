import { AIAssistantResponse } from "../../types/assistant";

// Get the base URL from environment variables, fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ASSISTANT_ENDPOINT = `${BASE_URL}/.netlify/functions/ai-assistant`;

// Add some basic validation for the environment
if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn('VITE_API_BASE_URL is not set. Using default localhost:8888');
}

export const aiAssistant = async (
  question: string, 
  section: string
): Promise<AIAssistantResponse> => {
  try {
    console.log('Sending request to:', ASSISTANT_ENDPOINT);
    console.log('Request payload:', { question, section });
    
    const response = await fetch(ASSISTANT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        section
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Server error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`Failed to get AI Assistant Response: ${response.status} ${response.statusText}`);
    }

    const responseText = await response.text();

    let result;
    try {
      result = JSON.parse(responseText);
      console.log('Parsed response:', result);
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      throw new Error('Invalid JSON response from server');
    }
    
    // Validate the response structure
    if (!result || typeof result.answer !== 'string' || !Array.isArray(result.followUpQuestions)) {
      console.error('Invalid response structure:', result);
      throw new Error('Invalid response structure from AI Assistant');
    }

    const typedResult: AIAssistantResponse = {
      answer: result.answer,
      followUpQuestions: result.followUpQuestions
    };

    return typedResult;
  } catch (error) {
    console.error('Error getting assistant response:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Unable to connect to ${ASSISTANT_ENDPOINT}. Please check if the server is running and accessible.`);
    }
    throw error;
  }
};