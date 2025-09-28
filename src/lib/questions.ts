import { Question, QuestionsData } from '@/types';

export async function loadQuestions(): Promise<Question[]> {
  const allQuestions: Question[] = [];
  
  // Load real matura files
  const realMaturaFiles = [
    '/data/matura-2025_line_by_line.json',
    '/data/matura-2025-08_line_by_line.json'
  ];
  
  for (const filePath of realMaturaFiles) {
    try {
      const response = await fetch(filePath);
      if (response.ok) {
        const data: QuestionsData = await response.json();
        for (const question of data.questions) {
          question.source = 'real_matura';
          question.source_file = filePath;
          allQuestions.push(question);
        }
      }
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
    }
  }
  
  // Load spelling questions
  try {
    const response = await fetch('/data/improved_spelling_questions.json');
    if (response.ok) {
      const data: QuestionsData = await response.json();
      for (const question of data.questions) {
        question.source = 'spelling';
        question.source_file = '/data/improved_spelling_questions.json';
        allQuestions.push(question);
      }
    }
  } catch (error) {
    console.error('Error loading spelling questions:', error);
  }
  
  return allQuestions;
}

export function filterQuestions(
  questions: Question[],
  sourceFilter: string,
  questionTypeFilter: string
): Question[] {
  let filtered = [...questions];
  
  if (sourceFilter === 'real_matura') {
    filtered = filtered.filter(q => q.source === 'real_matura');
  } else if (sourceFilter === 'spelling') {
    filtered = filtered.filter(q => q.source === 'spelling');
  }
  
  if (questionTypeFilter === 'multiple_choice') {
    filtered = filtered.filter(q => q.question_type === 'multiple_choice');
  } else if (questionTypeFilter === 'free_text') {
    filtered = filtered.filter(q => q.question_type === 'free_text');
  } else if (questionTypeFilter === 'multiline_text') {
    filtered = filtered.filter(q => q.question_type === 'multiline_text');
  } else if (questionTypeFilter === 'matching') {
    filtered = filtered.filter(q => q.question_type === 'matching');
  }
  
  return filtered;
}
