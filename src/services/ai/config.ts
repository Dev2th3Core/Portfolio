import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIConfig } from '../../types/ai';

export const defaultConfig: AIConfig = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  modelName: import.meta.env.VITE_GEMINI_MODEL_NAME || 'gemini-2.0-flash',
  maxTokens: 1048576,
  temperature: 0.7,
};

export const initializeAI = (config: Partial<AIConfig> = {}): GoogleGenerativeAI => {
  const finalConfig = { ...defaultConfig, ...config };
  
  if (!finalConfig.apiKey) {
    throw new Error('Gemini API key is required');
  }

  return new GoogleGenerativeAI(finalConfig.apiKey);
};

// Utility to count tokens (simple approximation)
export const countTokens = (text: string): number => {
  // Rough approximation: 100 characters ≈ 75 tokens
  return Math.ceil(text.length * 0.75);
};

// Chunk text into smaller pieces
export const chunkText = (text: string, maxTokens: number = defaultConfig.maxTokens): string[] => {
  const tokens = countTokens(text);
  if (tokens <= maxTokens) return [text];

  const chunks: string[] = [];
  const sentences = text.split(/[.!?]+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    const chunkTokens = countTokens(currentChunk + sentence);
    
    if (chunkTokens > maxTokens) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
};