'use client';

import { useState, useEffect } from 'react';
import { Question, SourceFilter, QuestionTypeFilter, DisplayMode, TextData } from '@/types';
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
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('real_matura');
  const [questionTypeFilter, setQuestionTypeFilter] = useState<QuestionTypeFilter>('all');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('single');
  const [loading, setLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [textsData, setTextsData] = useState<{[key: string]: TextData}>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const {questions: allQuestions, textsData} = await loadQuestions();
        setQuestions(allQuestions);
        setFilteredQuestions(allQuestions);
        setTextsData(textsData);
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

  // Helper function to get text data for a question
  const getTextDataForQuestion = (questionNumber: number): TextData | undefined => {
    for (const [key, textData] of Object.entries(textsData)) {
      if (textData.related_questions.includes(questionNumber)) {
        return textData;
      }
    }
    return undefined;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Зареждане на въпроси...</p>
        </div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Няма намерени въпроси</h1>
          <p className="text-gray-600">Моля, опитайте с различни филтри.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen relative" style={{ background: '#0a012c', minHeight: '100vh' }}>
      {/* Dark navy with purple radial gradient background */}
      <div className="absolute inset-0 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(circle, rgba(38,8,95,0.8156862745), rgba(17,3,49,0.8078431373))' 
      }}></div>
      <div className="flex relative z-10">

        {/* Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-10 transition-opacity duration-300"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <div className={`relative z-10 w-80 max-w-sm bg-white h-full shadow-xl transform transition-transform duration-300 ease-out ${
              isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
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
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 shadow-lg px-3 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                    <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-white">БЕЛ Quiz</h1>
                  <p className="text-xs sm:text-sm text-slate-300">Matura Lab</p>
                </div>
              </div>
              
              {/* Hamburger Menu - Always visible */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-700 text-slate-300 transition-colors"
                aria-label="Отвори меню"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
            {displayMode === 'single' ? (
              <div>
                <ProgressBar current={currentQuestionIndex} total={filteredQuestions.length} />
                
                <Navigation
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onRandom={handleRandom}
                  onShuffle={handleShuffle}
                  canGoPrevious={currentQuestionIndex > 0}
                  canGoNext={currentQuestionIndex < filteredQuestions.length - 1}
                />

                <div className="mt-6">
                  <QuestionCard
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  totalQuestions={filteredQuestions.length}
                  allTextsData={textsData}
                />
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {filteredQuestions.map((question, index) => (
                  <div key={`${question.question_number}-${index}`}>
                    <QuestionCard
                      question={question}
                      questionIndex={index}
                      totalQuestions={filteredQuestions.length}
                      allTextsData={textsData}
                    />
                    {index < filteredQuestions.length - 1 && (
                      <div className="border-b border-purple-300 my-6"></div>
                    )}
                  </div>
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