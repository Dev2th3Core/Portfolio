export interface Message {
  role: 'ai' | 'user';
  text: string;
  section: string;
  isError?: boolean;
}

export interface AIAssistantResponse {
  answer: string;
  followUpQuestions: string[];
}