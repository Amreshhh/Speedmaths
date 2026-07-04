import React from 'react';

export default function NumberDisplay({ numberOne, numberTwo, operation, mode, speedState, timeLeft, sessionTime }) {
  return (
    <div className="flex-1 glass-panel rounded-3xl shadow-2xl flex flex-col items-center justify-center p-5 sm:p-8 relative overflow-hidden transition-all duration-300 min-h-[30vh] sm:min-h-[36vh] md:min-h-[50vh]">
      
      {/* Top Indicator */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center text-zinc-500 dark:text-zinc-400 font-bold tracking-wider uppercase text-[10px] sm:text-[11px]">
        <span>Expression Input</span>
        
        {mode === 'speed' && speedState === 'playing' && (
          <div className="flex items-center gap-2 bg-yellow-400 text-black px-2.5 py-1 rounded-lg shadow-sm font-black">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>{timeLeft}s</span>
          </div>
        )}
      </div>
      
      {numberOne !== null ? (
        <div className={`font-black text-black dark:text-white leading-tight text-center whitespace-nowrap tracking-tighter ${
          ['multiply', 'add', 'sub'].includes(operation) 
            ? 'text-[2.35rem] sm:text-[4.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[6rem]' 
            : 'text-[3.15rem] sm:text-[6rem] md:text-[5rem] lg:text-[7rem] xl:text-[8rem]'
        }`}>
          {['multiply', 'add', 'sub'].includes(operation) ? (
            <span>
              {numberOne} 
              <span className="text-zinc-400 dark:text-zinc-600 mx-2 sm:mx-3 font-light">
                {operation === 'multiply' ? '×' : operation === 'add' ? '+' : '−'}
              </span> 
              {numberTwo}
            </span>
          ) : (
            numberOne
          )}
        </div>
      ) : (
        <div className="text-center flex flex-col items-center gap-3 sm:gap-4 text-zinc-400 dark:text-zinc-500">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center border border-zinc-300 dark:border-zinc-700">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div className="font-semibold text-xs sm:text-sm max-w-xs leading-relaxed">
            {mode === 'speed' ? 'Initiate a speed session to begin' : 'Customize setup and click generate'}
          </div>
        </div>
      )}
    </div>
  );
}
