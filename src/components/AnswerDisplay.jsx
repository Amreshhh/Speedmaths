import React from 'react';

export default function AnswerDisplay({
  numberOne, numberTwo, operation, isRevealed, gradePhase, mode, speedState,
  complementBase, timesNValue, activeCountdown, thinkTime, delay,
  keyRight, keyWrong,
  onReveal, onMarkCorrect, onMarkIncorrect, getRightBoxAnswer, onGenerateClick, showMobileGenerateButton
}) {
  return (
    <div className={`flex-1 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-5 sm:p-8 relative transition-all duration-500 min-h-[30vh] sm:min-h-[36vh] md:min-h-[50vh] border
      ${isRevealed 
        ? 'bg-yellow-400/5 dark:bg-yellow-400/10 border-yellow-400/20 shadow-yellow-400/5' 
        : 'glass-panel border-zinc-200 dark:border-zinc-700 border-dashed'}`}
    >
      {/* Top Indicator */}
      <div className={`absolute top-4 sm:top-6 left-4 sm:left-6 font-bold tracking-wider uppercase text-[10px] sm:text-[11px] transition-colors duration-300
        ${isRevealed ? 'text-yellow-600 dark:text-yellow-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
        {operation === 'multiply' ? 'The Product' :
         operation === 'add' ? 'The Sum' :
         operation === 'sub' ? 'The Difference' :
         operation === 'divide' ? 'The Quotient' :
         operation === 'sqrt' ? 'The Square Root' :
         operation === 'cube' ? 'The Cube' :
         operation === 'cuberoot' ? 'The Cube Root' :
         operation === 'times11' ? 'The ×11 Product' :
         operation === 'timesn' ? `The ×${timesNValue} Product` :
         operation === 'complement' ? 'The Complement' : 'The Square'}
      </div>

      {numberOne !== null ? (
        isRevealed ? (
          /* REVEALED ANSWER PANEL */
          <div className="flex flex-col items-center">
            <div className={`font-black text-yellow-600 dark:text-yellow-400 leading-tight text-center whitespace-nowrap tracking-tighter animate-in zoom-in spin-in-1 duration-300 ${
              ['multiply', 'add', 'sub', 'divide'].includes(operation) 
                ? 'text-[2.35rem] sm:text-[4.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[6rem]' 
                : 'text-[3.15rem] sm:text-[6rem] md:text-[5rem] lg:text-[7rem] xl:text-[8rem]'
            }`}>
              {getRightBoxAnswer()}
            </div>

            {(operation === 'sqrt' || operation === 'cuberoot' || operation === 'divide') && (
              <div className="text-xs text-yellow-600/60 dark:text-yellow-400/60 font-bold mt-3 animate-in fade-in duration-300 uppercase tracking-widest">
                (rounded up to three digits)
              </div>
            )}
            
            {/* SPEED SESSION: Evaluation Actions */}
            {mode === 'speed' && gradePhase && (
              <div className="mt-8 flex flex-col items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
                  <button 
                    onClick={onMarkCorrect}
                    className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40 active:scale-95 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black flex items-center gap-2 border border-green-300/50 dark:border-green-700/50 transition-all text-xs sm:text-sm uppercase"
                  >
                    <kbd className="bg-green-500 text-white px-2 py-0.5 rounded text-xs shadow-sm font-black uppercase">{keyRight}</kbd> Correct
                  </button>
                  <button 
                    onClick={onMarkIncorrect}
                    className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 active:scale-95 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black flex items-center gap-2 border border-red-300/50 dark:border-red-700/50 transition-all text-xs sm:text-sm uppercase"
                  >
                    <kbd className="bg-red-500 text-white px-2 py-0.5 rounded text-xs shadow-sm font-black uppercase">{keyWrong}</kbd> Incorrect
                  </button>
                </div>
                
                {/* 2-Second Countdown Auto-Advance Slider */}
                <div className="text-xs text-zinc-400 dark:text-zinc-500 font-bold flex items-center gap-3 w-44">
                  <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 origin-left" style={{ animation: 'shrinkBar 2s linear forwards' }} />
                  </div>
                  <span>2s</span>
                </div>
              </div>
            )}
          </div>
        ) : (
         /* HIDDEN STATE (MASKED) */
          <div
            className={`flex-1 flex flex-col items-center justify-center gap-6 text-zinc-400 dark:text-zinc-600 ${(!isRevealed && (mode === 'manual' || mode === 'speed')) ? 'cursor-pointer' : ''}`}
            onClick={(e) => {
              if (!isRevealed && (mode === 'manual' || mode === 'speed')) {
                e.stopPropagation();
                if (typeof onReveal === 'function') onReveal();
              }
            }}
          >
            <div className="text-[7rem] sm:text-[9rem] font-black opacity-10 dark:opacity-5 select-none tracking-tight">
              ?
            </div>

            {mode === 'manual' || mode === 'speed' ? (
              <div className="flex flex-col items-center gap-3">
                {/* Touch Friendly Reveal Button (stop propagation to avoid double-call) */}
                <button
                  onClick={(e) => { e.stopPropagation(); if (typeof onReveal === 'function') onReveal(); }}
                  className="px-5 sm:px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-2xl border border-yellow-500 active:scale-95 transition-all text-xs sm:text-sm shadow-lg shadow-yellow-400/20 uppercase tracking-wide"
                >
                  Reveal Answer
                </button>
                <div className="text-xs text-zinc-400/80 dark:text-zinc-500/80 hidden md:block mt-1 font-semibold uppercase tracking-wider">
                  or press <kbd className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded shadow-sm mx-1 text-black dark:text-white border border-zinc-300 dark:border-zinc-700">ENTER</kbd>
                </div>
                
                {mode === 'speed' && (
                  <div className="flex items-center gap-2 bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-xl font-bold text-xs border border-zinc-300/50 dark:border-zinc-700/50 shadow-inner mt-2 animate-in fade-in duration-300 uppercase tracking-wider">
                    <svg className="animate-spin h-3.5 w-3.5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Auto-reveal in {activeCountdown !== null ? activeCountdown : thinkTime}s
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm border border-zinc-300/50 dark:border-zinc-700/50 shadow-inner uppercase tracking-wider">
                <svg className="animate-spin h-4.5 w-4.5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Revealing in {activeCountdown !== null ? activeCountdown : delay}s...
              </div>
            )}
          </div>
        )
      ) : (
        /* EMPTY UNINITIALIZED STATE */
        <div className="text-lg text-zinc-300 dark:text-zinc-700 font-bold italic text-center uppercase tracking-widest">
          Awaiting first question...
        </div>
      )}

      {showMobileGenerateButton && onGenerateClick && (
        <div className="mt-4 w-full sm:hidden">
          <button
            onClick={onGenerateClick}
            className="w-full px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-2xl shadow-lg shadow-yellow-400/20 transition-all active:scale-95 text-sm uppercase tracking-wider"
          >
            Generate
          </button>
        </div>
      )}
    </div>
  );
}
