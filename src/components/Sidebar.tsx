'use client';

import { SourceFilter, QuestionTypeFilter, DisplayMode } from '@/types';

interface SidebarProps {
  sourceFilter: SourceFilter;
  questionTypeFilter: QuestionTypeFilter;
  displayMode: DisplayMode;
  onSourceFilterChange: (filter: SourceFilter) => void;
  onQuestionTypeFilterChange: (filter: QuestionTypeFilter) => void;
  onDisplayModeChange: (mode: DisplayMode) => void;
}

export default function Sidebar({
  sourceFilter,
  questionTypeFilter,
  displayMode,
  onSourceFilterChange,
  onQuestionTypeFilterChange,
  onDisplayModeChange
}: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
          </svg>
          <h3 className="text-lg font-semibold text-gray-800">Филтри</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Източник:
            </label>
            <select
              value={sourceFilter}
              onChange={(e) => onSourceFilterChange(e.target.value as SourceFilter)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Всички</option>
              <option value="real_matura">Реални матури</option>
              <option value="spelling">Правопис</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип въпрос:
            </label>
            <select
              value={questionTypeFilter}
              onChange={(e) => onQuestionTypeFilterChange(e.target.value as QuestionTypeFilter)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Всички</option>
              <option value="multiple_choice">Множествен избор</option>
              <option value="free_text">Свободен текст</option>
              <option value="multiline_text">Многоредов текст</option>
              <option value="matching">Свързване</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display Mode */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="9"/>
            <line x1="9" y1="13" x2="15" y2="13"/>
            <line x1="9" y1="17" x2="15" y2="17"/>
          </svg>
          <h3 className="text-lg font-semibold text-gray-800">Режим на показване</h3>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="displayMode"
              value="single"
              checked={displayMode === 'single'}
              onChange={(e) => onDisplayModeChange(e.target.value as DisplayMode)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Един въпрос</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="displayMode"
              value="all"
              checked={displayMode === 'all'}
              onChange={(e) => onDisplayModeChange(e.target.value as DisplayMode)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Всички въпроси</span>
          </label>
        </div>
      </div>
    </div>
  );
}
