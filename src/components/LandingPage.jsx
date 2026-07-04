import React from 'react';

export default function LandingPage({ isDarkMode, setIsDarkMode }) {
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-stretch overflow-hidden transition-colors duration-500">
        {/* Left Section: Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 dark:from-black dark:via-slate-950 dark:to-slate-900 flex flex-col items-center justify-center px-8 md:px-12 py-16 md:py-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="text-center md:text-left max-w-lg relative z-10 pt-32 sm:pt-36 md:pt-28">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              Speed<span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">maths</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light mb-12 leading-relaxed">
              Master mental arithmetic with precision and speed
            </p>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all border border-white/20 backdrop-blur-sm"
            >
              {isDarkMode ? (
                <>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05L5.75 4.343a1 1 0 10-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Section: Information */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center px-8 md:px-12 py-16 md:py-0 relative overflow-hidden transition-colors duration-500">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/3 rounded-full blur-3xl"></div>
          
          <div className="max-w-lg w-full relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">About Speedmaths</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center mt-1 shadow-md">
                  <span className="text-slate-900 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Multiple Operations</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    Practice squares, square roots, addition, subtraction, multiplication, and number complements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center mt-1 shadow-md">
                  <span className="text-slate-900 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Three Practice Modes</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    Manual reveal on demand, timed challenges, or speed sessions with automatic grading and scoring.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center mt-1 shadow-md">
                  <span className="text-slate-900 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Customizable Experience</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    Set number ranges, adjust reveal timing, configure custom key bindings, and track your progress.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Whether you're preparing for exams, sharpening your mental math skills, or just looking for a productive challenge, Speedmaths helps you build speed and accuracy through focused, intelligent practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
