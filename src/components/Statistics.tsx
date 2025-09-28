'use client';

import { Question } from '@/types';

interface StatisticsProps {
  totalQuestions: number;
  filteredQuestions: number;
  questions: Question[];
}

export default function Statistics({ totalQuestions, filteredQuestions, questions }: StatisticsProps) {
  const realMaturaCount = questions.filter(q => q.source === 'real_matura').length;
  const spellingCount = questions.filter(q => q.source === 'spelling').length;

  return (
    <div className="bg-gray-50 border-t border-gray-200 py-4 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 text-sm text-gray-600">
        {/* Main stats - always visible */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <span className="flex items-center gap-1">
            <span>Общо въпроси:</span>
            <span className="font-semibold text-gray-800">{totalQuestions}</span>
          </span>
          <span className="flex items-center gap-1">
            <span>Филтрирани въпроси:</span>
            <span className="font-semibold text-gray-800">{filteredQuestions}</span>
          </span>
        </div>
        
        {/* Source breakdown - responsive layout */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="flex items-center gap-1">
            <span>📚</span>
            <span>Реални матури:</span>
            <span className="font-semibold text-gray-800">{realMaturaCount}</span>
          </span>
          <span className="flex items-center gap-1">
            <span>✏️</span>
            <span>Правопис:</span>
            <span className="font-semibold text-gray-800">{spellingCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
