'use client';

import Link from 'next/link';

export default function ZaNas() {
  return (
    <div className="min-h-screen relative" style={{ background: '#0a012c', minHeight: '100vh' }}>
      {/* Dark navy with purple radial gradient background */}
      <div className="absolute inset-0 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(circle, rgba(38,8,95,0.8156862745), rgba(17,3,49,0.8078431373))' 
      }}></div>
      
      <div className="relative z-10">
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
            
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-2"
              aria-label="Назад към началото"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span className="hidden sm:inline">Начало</span>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-lg border border-slate-700">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">За нас</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Този проект е направен изцяло от доброволци, които вярват в важността на качественото образование 
                и искат да помогнат на учениците в подготовката им за матурата по български език и литература.
              </p>
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Доброволци
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800/70 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                      Н
                    </div>
                    <div>
                      <p className="text-white font-medium">Нона Джуркова</p>
                      <p className="text-sm text-slate-400">Доброволец</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800/70 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                      Б
                    </div>
                    <div>
                      <p className="text-white font-medium">Борис Джурков</p>
                      <p className="text-sm text-slate-400">Доброволец</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-slate-400 text-sm">
                  Ако искате да се присъедините към проекта или имате въпроси, моля свържете се с нас.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

