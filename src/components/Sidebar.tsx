'use client';

import { SourceFilter, QuestionTypeFilter, MaturaFilter, DisplayMode } from '@/types';

interface SidebarProps {
  sourceFilter: SourceFilter;
  questionTypeFilter: QuestionTypeFilter;
  maturaFilter: MaturaFilter;
  displayMode: DisplayMode;
  onSourceFilterChange: (filter: SourceFilter) => void;
  onQuestionTypeFilterChange: (filter: QuestionTypeFilter) => void;
  onMaturaFilterChange: (filter: MaturaFilter) => void;
  onDisplayModeChange: (mode: DisplayMode) => void;
}

export default function Sidebar({
  sourceFilter,
  questionTypeFilter,
  maturaFilter,
  displayMode,
  onSourceFilterChange,
  onQuestionTypeFilterChange,
  onMaturaFilterChange,
  onDisplayModeChange
}: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
          </svg>
          <h3 className="text-lg font-semibold text-white">Филтри</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Източник:
            </label>
            <select
              value={sourceFilter}
              onChange={(e) => onSourceFilterChange(e.target.value as SourceFilter)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 hover:border-slate-500"
            >
              <option value="all" className="bg-slate-800 text-white">Всички</option>
              <option value="real_matura" className="bg-slate-800 text-white">Реални матури</option>
              <option value="spelling" className="bg-slate-800 text-white">Правопис</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Матура:
            </label>
            <select
              value={maturaFilter}
              onChange={(e) => onMaturaFilterChange(e.target.value as MaturaFilter)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 hover:border-slate-500"
            >
              <option value="all" className="bg-slate-800 text-white">Всички матури</option>
              <option value="matura-2023" className="bg-slate-800 text-white">24 август 2023</option>
              <option value="matura-2023-05" className="bg-slate-800 text-white">19 май 2023</option>
              <option value="matura-2025" className="bg-slate-800 text-white">21 май 2025</option>
              <option value="matura-2025-08" className="bg-slate-800 text-white">22 август 2024</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Тип въпрос:
            </label>
            <select
              value={questionTypeFilter}
              onChange={(e) => onQuestionTypeFilterChange(e.target.value as QuestionTypeFilter)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 hover:border-slate-500"
            >
              <option value="all" className="bg-slate-800 text-white">Всички</option>
              <option value="multiple_choice" className="bg-slate-800 text-white">Множествен избор</option>
              <option value="free_text" className="bg-slate-800 text-white">Свободен текст</option>
              <option value="multiline_text" className="bg-slate-800 text-white">Многоредов текст</option>
              <option value="matching" className="bg-slate-800 text-white">Свързване</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display Mode */}
      <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="9"/>
            <line x1="9" y1="13" x2="15" y2="13"/>
            <line x1="9" y1="17" x2="15" y2="17"/>
          </svg>
          <h3 className="text-lg font-semibold text-white">Режим на показване</h3>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
            <input
              type="radio"
              name="displayMode"
              value="single"
              checked={displayMode === 'single'}
              onChange={(e) => onDisplayModeChange(e.target.value as DisplayMode)}
              className="w-4 h-4 text-purple-600 focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-slate-300">Един въпрос</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
            <input
              type="radio"
              name="displayMode"
              value="all"
              checked={displayMode === 'all'}
              onChange={(e) => onDisplayModeChange(e.target.value as DisplayMode)}
              className="w-4 h-4 text-purple-600 focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-slate-300">Всички въпроси</span>
          </label>
        </div>
      </div>
    </div>
  );
}
