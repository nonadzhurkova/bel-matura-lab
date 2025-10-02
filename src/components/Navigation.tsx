'use client';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onRandom: () => void;
  onShuffle: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  questionNumber?: string;
  maturaDate?: string;
}

export default function Navigation({
  onPrevious,
  onNext,
  onRandom,
  onShuffle,
  canGoPrevious,
  canGoNext,
  questionNumber,
  maturaDate
}: NavigationProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      {/* Empty space on the left */}
      <div></div>
      
      {/* Navigation buttons in the center */}
      <div className="flex gap-3">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        title="Предишен"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span className="text-sm font-medium">Предишен</span>
      </button>
      
      <button
        onClick={onRandom}
        className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded-lg transition-colors"
        title="Случаен"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
          <path d="M3 21v-5h5"/>
        </svg>
      </button>
      
      <button
        onClick={onShuffle}
        className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded-lg transition-colors"
        title="Разбъркай"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z"/>
          <path d="m8 21 4-7 4 7"/>
        </svg>
      </button>
      
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        title="Следващ"
      >
        <span className="text-sm font-medium">Следващ</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
      </div>
      
      {/* Question info on the right */}
      <div className="flex items-center gap-1 text-xs text-gray-400">
        {questionNumber && (
          <span className="font-medium text-purple-300">Въпрос {questionNumber}</span>
        )}
        {maturaDate && (
          <span className="text-gray-500">• {maturaDate}</span>
        )}
      </div>
    </div>
  );
}
