export interface Question {
  question_number: string;
  question_text: string;
  question_type: 'multiple_choice' | 'free_text' | 'multiline_text' | 'matching';
  options?: Record<string, string> | string[];
  correct_answer: string;
  source: 'real_matura' | 'spelling';
  source_file?: string;
}

export interface QuestionsData {
  questions: Question[];
}

export type SourceFilter = 'all' | 'real_matura' | 'spelling';
export type QuestionTypeFilter = 'all' | 'multiple_choice' | 'free_text' | 'multiline_text' | 'matching';
export type DisplayMode = 'single' | 'all';
