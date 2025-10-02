import { Question, QuestionsData, TextData } from '@/types';

export async function loadQuestions(): Promise<{questions: Question[], textsData: {[key: string]: TextData}}> {
  const allQuestions: Question[] = [];
  const allTextsData: {[key: string]: TextData} = {};
  
  // Load real matura files
  const realMaturaFiles = [
    '/data/matura-2023_line_by_line.json',
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
          question.metadata = {
            exam_date: data.metadata.exam_date,
            exam_year: data.metadata.exam_year,
            exam_month: data.metadata.exam_month
          };
          allQuestions.push(question);
        }
        
        // Load texts data from metadata with unique keys
        if (data.metadata?.texts) {
          const fileKey = filePath.replace('/data/', '').replace('.json', '');
          Object.entries(data.metadata.texts).forEach(([textKey, textData]) => {
            allTextsData[`${fileKey}_${textKey}`] = textData;
          });
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
  
  return {questions: allQuestions, textsData: allTextsData};
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
