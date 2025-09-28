'use client';

import { Question } from '@/types';
import { useState, useEffect } from 'react';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
}

export default function QuestionCard({ question, questionIndex, totalQuestions }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer('');
    setUserInput('');
    setShowAnswer(false);
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      {/* Question Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold min-w-[30px] text-center">
          {question.question_number}
        </div>
        <div className="text-base text-gray-800 font-medium leading-relaxed">
          {question.question_text}
        </div>
      </div>

      {/* Multiple Choice Options */}
      {question.question_type === 'multiple_choice' && question.options && (
        <div className="space-y-2 mb-4">
          {Object.entries(question.options).map(([key, value]) => {
            const isCorrectAnswer = showAnswer && key.toLowerCase() === question.correct_answer.toLowerCase();
            const isSelectedWrong = showAnswer && selectedAnswer === key && key.toLowerCase() !== question.correct_answer.toLowerCase();
            return (
              <label key={key} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors ${
                isCorrectAnswer 
                  ? 'bg-green-100 border-2 border-green-500' 
                  : isSelectedWrong
                  ? 'bg-red-100 border-2 border-red-500'
                  : 'bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={key}
                  checked={selectedAnswer === key}
                  onChange={(e) => handleRadioChange(e.target.value)}
                  className="w-3 h-3 text-blue-600"
                />
                <span className={`font-medium w-6 h-6 text-white rounded-full flex items-center justify-center text-xs ${
                  isCorrectAnswer 
                    ? 'bg-green-500' 
                    : isSelectedWrong
                    ? 'bg-red-500'
                    : 'text-blue-600 bg-blue-500'
                }`}>
                  {key.toUpperCase()}
                </span>
                <span className={`flex-1 text-sm ${
                  isCorrectAnswer 
                    ? 'text-green-800 font-semibold' 
                    : isSelectedWrong
                    ? 'text-red-800 font-semibold'
                    : 'text-gray-700'
                }`}>
                  {value}
                </span>
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleShowAnswer}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Покажи отговора
        </button>
      </div>

      {/* Show Answer Result for Text Input Questions */}
      {showAnswer && question.correct_answer && (question.question_type === 'free_text' || question.question_type === 'multiline_text') && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 font-medium text-sm">
            Правилният отговор е: <span className="font-bold">{question.correct_answer}</span>
          </p>
        </div>
      )}

    </div>
  );
}
