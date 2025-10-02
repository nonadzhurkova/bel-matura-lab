'use client';

import { Question, TextData } from '@/types';
import { useState, useEffect } from 'react';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  allTextsData?: {[key: string]: TextData};
}

export default function QuestionCard({ question, questionIndex, totalQuestions, allTextsData }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showTexts, setShowTexts] = useState<boolean>(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer('');
    setUserInput('');
    setShowAnswer(false);
    setShowTexts(false);
  }, [questionIndex]);

  const handleRadioChange = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleInputChange = (value: string) => {
    setUserInput(value);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleToggleTexts = () => {
    setShowTexts(!showTexts);
  };

  // Find related texts for this question
  const getRelatedTexts = () => {
    if (!allTextsData) return [];
    
    const relatedTexts: TextData[] = [];
    
    // Get the file key from the question's source_file
    const fileKey = question.source_file?.replace('/data/', '').replace('.json', '');
    
    Object.entries(allTextsData).forEach(([textKey, textData]) => {
      // Check if this text belongs to the same file as the question
      if (textKey.startsWith(`${fileKey}_`) && textData.related_questions.includes(question.question_number)) {
        relatedTexts.push(textData);
      }
    });
    
    return relatedTexts;
  };

  const relatedTexts = getRelatedTexts();

  return (
    <div className="bg-transparent mb-4">

      {/* Question Text */}
      <div className="text-base text-gray-400 font-semibold leading-relaxed whitespace-pre-line mb-2">
        {question.question_text}
      </div>
      
      {/* Question info */}
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
        <span className="text-xs" style={{fontSize: '10px'}}>Въпрос {question.question_number}</span>
        <span className="text-xs" style={{fontSize: '10px'}}>• {question.metadata?.exam_month} {question.metadata?.exam_year}</span>
      </div>

      {/* Question Example */}
      {question.question_text_example && (
        <div className="mb-6 p-4 bg-gray-300 border-l-4 border-purple-500 rounded-r-lg shadow-sm">
          <div className="text-sm text-black whitespace-pre-line leading-relaxed italic">
            {question.question_text_example}
          </div>
        </div>
      )}

      {/* Multiple Choice Options */}
      {question.question_type === 'multiple_choice' && question.options && (
        <div className="space-y-1 mb-6">
          {Object.entries(question.options).map(([key, value]) => {
            // Special handling for matching questions (like question 39)
            const isMatchingQuestion = question.correct_answer.includes(')');
            let isCorrectAnswer = false;
            let isSelectedWrong = false;
            
            if (isMatchingQuestion) {
              // For matching questions, we can't easily determine correct answers from the format
              // So we'll just show the correct answer text below
              isCorrectAnswer = false;
              isSelectedWrong = false;
            } else {
              isCorrectAnswer = showAnswer && key.toLowerCase() === question.correct_answer.toLowerCase();
              isSelectedWrong = showAnswer && selectedAnswer === key && key.toLowerCase() !== question.correct_answer.toLowerCase();
            }
            
            const isSelected = selectedAnswer === key;
            return (
              <label key={key} className={`flex items-center justify-between p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                isCorrectAnswer 
                  ? 'bg-green-500/20 border-green-400' 
                  : isSelectedWrong
                  ? 'bg-red-500/20 border-red-400'
                  : isSelected
                  ? 'bg-purple-500/20 border-purple-400'
                  : 'bg-white/20 border-white/30 hover:bg-white/30 hover:border-white/40'
              }`}>
                <div className="flex items-center gap-3 flex-1">
                  <span className={`text-base whitespace-pre-line ${
                    isCorrectAnswer 
                      ? 'text-green-200 font-semibold' 
                      : isSelectedWrong
                      ? 'text-red-200 font-semibold'
                      : isSelected
                      ? 'text-purple-200 font-medium'
                      : 'text-white'
                  }`}>
                    {value}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={key}
                    checked={selectedAnswer === key}
                    onChange={(e) => handleRadioChange(e.target.value)}
                    className="w-5 h-5 text-blue-600 opacity-0 absolute"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    selectedAnswer === key
                      ? 'bg-purple-500 border-purple-400'
                      : 'bg-white/20 border-white/40 hover:border-white/60'
                  }`}>
                    {selectedAnswer === key && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      )}

      {/* Free Text Input */}
      {question.question_type === 'free_text' && (
        <div className="mb-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Въведете отговора тук..."
            className="w-full p-2 bg-white/30 border border-white/40 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-white placeholder-gray-200 text-sm"
          />
        </div>
      )}

      {/* Multiline Text Input */}
      {question.question_type === 'multiline_text' && (
        <div className="mb-4">
          <textarea
            value={userInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Въведете отговора тук..."
            rows={3}
            className="w-full p-2 bg-white/30 border border-white/40 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-white placeholder-gray-200 resize-none text-sm"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {relatedTexts.length > 0 && (
          <button
            onClick={handleToggleTexts}
            className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-600 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 border border-slate-500 shadow-lg shadow-slate-500/25"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            {showTexts ? 'Скрий текстове' : 'Покажи текстове'}
        </button>
        )}
        
        <button
          onClick={handleShowAnswer}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 border border-purple-400 shadow-lg shadow-purple-500/25"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Покажи отговора
        </button>
      </div>

      {/* Show Answer Result for Text Input Questions and Matching Questions */}
      {showAnswer && question.correct_answer && (question.question_type === 'free_text' || question.question_type === 'multiline_text' || question.correct_answer.includes(')')) && (
        <div className="mt-3 p-3 bg-white/20 border border-white/30 rounded-md backdrop-blur-sm">
          <p className="text-white font-medium text-sm">
            Правилният отговор е: <span className="font-bold text-purple-200">{question.correct_answer}</span>
          </p>
        </div>
      )}

      {/* Texts and Diagrams Section */}
      {showTexts && relatedTexts.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="border-t border-white/20 pt-4">
            <h3 className="text-lg font-semibold text-white mb-4">Текстове и диаграми</h3>
            {relatedTexts.map((textData, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-md font-semibold text-purple-200 mb-3">{textData.title}</h4>
                
                {textData.content && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-100 whitespace-pre-line leading-relaxed bg-white/20 p-4 rounded-md border border-white/30">
                      {textData.content}
                    </div>
                  </div>
                )}
                
                {textData.diagram_image && (
                  <div className="mb-4">
                    <div className="bg-white/20 p-3 rounded-md border border-white/30">
                      <img 
                        src={textData.diagram_image} 
                        alt={textData.title} 
                        className="max-w-full h-auto rounded-md shadow-sm"
                        style={{ maxHeight: '400px' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
