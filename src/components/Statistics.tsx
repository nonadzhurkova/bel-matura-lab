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
    <div className="bg-slate-800/30 backdrop-blur-sm border-t border-slate-700 py-2 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-xs text-gray-300">
        {/* Main stats - always visible */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <span className="flex items-center gap-1">
            <span>Общо въпроси:</span>
            <span className="font-semibold text-white">{totalQuestions}</span>
          </span>
          <span className="flex items-center gap-1">
            <span>Филтрирани въпроси:</span>
            <span className="font-semibold text-white">{filteredQuestions}</span>
          </span>
        </div>
        
        {/* Source breakdown - responsive layout */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span>Реални матури:</span>
            <span className="font-semibold text-white">{realMaturaCount}</span>
          </span>
          <span className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <span>Правопис:</span>
            <span className="font-semibold text-white">{spellingCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
