export interface Question {
  question_number: string;
  question_text: string;
  question_text_example?: string;
  question_type: 'multiple_choice' | 'free_text' | 'multiline_text' | 'matching';
  options?: Record<string, string> | string[];
  correct_answer: string;
  source: 'real_matura' | 'spelling';
  source_file?: string;
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
export type DisplayMode = 'single' | 'all';
