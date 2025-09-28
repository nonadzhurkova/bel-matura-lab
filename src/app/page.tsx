'use client';

import { useState, useEffect } from 'react';
import { Question, SourceFilter, QuestionTypeFilter, DisplayMode } from '@/types';
import { loadQuestions, filterQuestions } from '@/lib/questions';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import Statistics from '@/components/Statistics';

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [questionTypeFilter, setQuestionTypeFilter] = useState<QuestionTypeFilter>('all');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('single');
  const [loading, setLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const allQuestions = await loadQuestions();
        setQuestions(allQuestions);
        setFilteredQuestions(allQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const filtered = filterQuestions(questions, sourceFilter, questionTypeFilter);
    setFilteredQuestions(filtered);
    setCurrentQuestionIndex(0);
  }, [questions, sourceFilter, questionTypeFilter]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentQuestionIndex(randomIndex);
  };

  const handleShuffle = () => {
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffled);
    setCurrentQuestionIndex(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Зареждане на въпроси...</p>
        </div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Няма намерени въпроси</h1>
          <p className="text-gray-600">Моля, опитайте с различни филтри.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200 p-4">
          <Sidebar
            sourceFilter={sourceFilter}
            questionTypeFilter={questionTypeFilter}
            displayMode={displayMode}
            onSourceFilterChange={setSourceFilter}
            onQuestionTypeFilterChange={setQuestionTypeFilter}
            onDisplayModeChange={setDisplayMode}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="relative z-10 w-80 max-w-sm bg-white h-full shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Филтри</h2>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Затвори меню"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <div className="p-4">
                <Sidebar
                  sourceFilter={sourceFilter}
                  questionTypeFilter={questionTypeFilter}
                  displayMode={displayMode}
                  onSourceFilterChange={(filter) => {
                    setSourceFilter(filter);
                    setIsMobileSidebarOpen(false);
                  }}
                  onQuestionTypeFilterChange={(filter) => {
                    setQuestionTypeFilter(filter);
                    setIsMobileSidebarOpen(false);
                  }}
                  onDisplayModeChange={(mode) => {
                    setDisplayMode(mode);
                    setIsMobileSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with Overlay Effect */}
          <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 border-b border-blue-400/20 px-6 py-6 overflow-hidden">
            {/* Overlay pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-purple-600/90"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="absolute bottom-8 right-16 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute top-12 left-1/3 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute bottom-12 right-1/3 w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">БЕЛ Quiz - Matura Lab</h1>
                <p className="text-blue-100 drop-shadow-md">Въпроси от ДЗИ БЕЛ минали години</p>
              </div>
              
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md bg-white/20 hover:bg-white/30 text-white transition-all duration-200 backdrop-blur-sm"
                aria-label="Отвори меню"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {displayMode === 'single' ? (
              <div>
                <ProgressBar current={currentQuestionIndex} total={filteredQuestions.length} />

                <QuestionCard
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  totalQuestions={filteredQuestions.length}
                />
                
                <Navigation
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onRandom={handleRandom}
                  onShuffle={handleShuffle}
                  canGoPrevious={currentQuestionIndex > 0}
                  canGoNext={currentQuestionIndex < filteredQuestions.length - 1}
                />
              </div>
            ) : (
              <div className="space-y-6">
                {filteredQuestions.map((question, index) => (
                  <QuestionCard
                    key={`${question.question_number}-${index}`}
                    question={question}
                    questionIndex={index}
                    totalQuestions={filteredQuestions.length}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Statistics Footer */}
          <Statistics
            totalQuestions={questions.length}
            filteredQuestions={filteredQuestions.length}
            questions={questions}
          />
        </div>
      </div>
    </div>
  );
}