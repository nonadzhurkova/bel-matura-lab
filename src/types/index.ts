export interface Question {
  question_number: number;
  question_text: string;
  question_text_example?: string;
  question_type: 'multiple_choice' | 'free_text' | 'multiline_text' | 'matching';
  options?: Record<string, string> | string[];
  correct_answer: string;
  source: 'real_matura' | 'spelling';
  source_file?: string;
  metadata?: {
    exam_date: string;
    exam_year: string;
    exam_month: string;
  };
}

export interface TextData {
  title: string;
  content?: string;
  diagram_image?: string;
  related_questions: number[];
}

export interface QuestionsData {
  metadata: {
    processed_date: string;
    source: string;
    exam_date: string;
    exam_year: string;
    exam_month: string;
    texts?: {
      [key: string]: TextData;
    };
  };
  questions: Question[];
}

export type SourceFilter = 'all' | 'real_matura' | 'spelling';
export type QuestionTypeFilter = 'all' | 'multiple_choice' | 'free_text' | 'multiline_text' | 'matching';
export type MaturaFilter = 'all' | 'matura-2023' | 'matura-2023-05' | 'matura-2025' | 'matura-2025-08';
export type DisplayMode = 'single' | 'all';
