import React from 'react';

export default function GameHeader({
  min, setMin,
  max, setMax,
  mode, handleModeChange,
  operation, setOperation,
  delay, setDelay,
  sessionTime, setSessionTime,
  thinkTime, setThinkTime,
  keyRight, setKeyRight,
  keyWrong, setKeyWrong,
  complementBase, setComplementBase,
  isDarkMode, setIsDarkMode,
  speedState,
  onGenerateClick,
  onStartSession,
  onStopSession,
  onHome
}) {
  return (
    <div className="glass-panel sticky top-0 shadow-xl p-4 sm:p-5 z-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
        
        <div className="flex flex-wrap items-end gap-3 justify-center w-full lg:w-auto">
          
          {/* Limit Sliders / Inputs */}
          <div className="flex gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Min</span>
              <input 
                type="number" 
                value={min} 
                onChange={(e) => setMin(e.target.value)}
                disabled={speedState === 'playing'}
                className="w-16 sm:w-20 px-3 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:text-white transition-all text-sm font-bold disabled:opacity-40"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Max</span>
              <input 
                type="number" 
                value={max} 
                onChange={(e) => setMax(e.target.value)}
                disabled={speedState === 'playing'}
                className="w-16 sm:w-20 px-3 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:text-white transition-all text-sm font-bold disabled:opacity-40"
              />
            </div>
          </div>

          <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-700 hidden sm:block mx-1"></div>

          {/* Operation Segments */}
          <div className="flex flex-col max-w-full">
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Operation</span>
            <div className="flex rounded-xl overflow-x-auto hide-scrollbar dark-input p-1 max-w-[90vw] sm:max-w-none gap-0.5">
              {[
                { id: 'square', label: 'x²' }, 
                { id: 'sqrt', label: '√x' }, 
                { id: 'add', label: '+' }, 
                { id: 'sub', label: '−' }, 
                { id: 'multiply', label: '×' }, 
                { id: 'complement', label: 'Comp' }
              ].map((op) => (
                <button 
                  key={op.id}
                  onClick={() => setOperation(op.id)}
                  disabled={speedState === 'playing'}
                  className={`px-3 py-1 text-xs font-bold rounded-lg whitespace-nowrap transition-all duration-200 disabled:opacity-40
                    ${operation === op.id 
                      ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20' 
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-700 hidden sm:block mx-1"></div>

          {/* Game Mode Picker */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Mode</span>
            <div className="flex rounded-xl overflow-hidden p-1 dark-input gap-0.5">
              {[
                { id: 'manual', label: 'Manual' },
                { id: 'timed', label: 'Timed' },
                { id: 'speed', label: 'Speed' }
              ].map((m) => (
                <button 
                  key={m.id}
                  onClick={() => handleModeChange(m.id)}
                  disabled={speedState === 'playing'}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-200 disabled:opacity-40
                    ${mode === m.id 
                      ? 'bg-yellow-400 text-black shadow-md' 
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Sub-settings */}
          {mode === 'timed' && (
            <div className="flex flex-col animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Delay (s)</span>
              <input 
                type="number" 
                min="1" 
                value={delay} 
                onChange={(e) => setDelay(e.target.value)} 
                className="w-14 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold dark:text-white"
              />
            </div>
          )}

          {mode === 'speed' && (
            <div className="flex gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Session</span>
                <input 
                  type="number" 
                  min="10" 
                  value={sessionTime} 
                  disabled={speedState === 'playing'} 
                  onChange={(e) => setSessionTime(e.target.value)} 
                  className="w-16 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold dark:text-white disabled:opacity-40" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Think (s)</span>
                <input 
                  type="number" 
                  min="1" 
                  value={thinkTime} 
                  disabled={speedState === 'playing'} 
                  onChange={(e) => setThinkTime(e.target.value)} 
                  className="w-16 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold dark:text-white disabled:opacity-40" 
                />
              </div>
              
              <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-700 hidden sm:block mx-1 mt-3"></div>
              
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Key (R)</span>
                <input 
                  type="text" 
                  maxLength={1}
                  value={keyRight.toUpperCase()} 
                  disabled={speedState === 'playing'} 
                  onChange={(e) => setKeyRight(e.target.value.toLowerCase() || 'r')} 
                  className="w-12 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold dark:text-white disabled:opacity-40 text-center uppercase" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Key (W)</span>
                <input 
                  type="text" 
                  maxLength={1}
                  value={keyWrong.toUpperCase()} 
                  disabled={speedState === 'playing'} 
                  onChange={(e) => setKeyWrong(e.target.value.toLowerCase() || 'w')} 
                  className="w-12 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold dark:text-white disabled:opacity-40 text-center uppercase" 
                />
              </div>
            </div>
          )}

          {operation === 'complement' && (
            <div className="flex flex-col animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Base</span>
              <input 
                type="number" 
                value={complementBase} 
                disabled={speedState === 'playing'} 
                onChange={(e) => setComplementBase(e.target.value)} 
                className="w-16 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold dark:text-white disabled:opacity-40" 
              />
            </div>
          )}
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onHome}
            className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all border border-slate-300/30 dark:border-white/5 shadow-inner"
            title="Back to Home"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-zinc-200/50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 transition-all border border-zinc-300/30 dark:border-white/5 shadow-inner"
            title="Toggle UI Theme"
          >
            {isDarkMode ? (
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05L5.75 4.343a1 1 0 10-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
            ) : (
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>
          
          {mode === 'speed' ? (
            speedState === 'playing' ? (
              <button onClick={onStopSession} className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-200 hover:bg-black dark:hover:bg-white text-white dark:text-black font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm">
                Stop Session
              </button>
            ) : (
              <button onClick={onStartSession} className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/20 transition-all active:scale-95 text-sm">
                Start Session
              </button>
            )
          ) : (
            <button onClick={onGenerateClick} className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/20 transition-all active:scale-95 text-sm">
              Generate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
