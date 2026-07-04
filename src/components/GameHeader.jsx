import React from 'react';

export default function GameHeader({
  min, setMin,
  max, setMax,
  mode, handleModeChange,
  operation, setOperation,
  delay, setDelay,
  sessionTime, setSessionTime,
  thinkTime, setThinkTime,
  complementBase, setComplementBase,
  isDarkMode, setIsDarkMode,
  speedState,
  onGenerateClick,
  onStartSession,
  onStopSession,
  onOpenSettings
}) {
  return (
    <div className="glass-panel sticky top-0 shadow-xl px-3 py-3 sm:px-5 sm:py-4 z-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-center w-full lg:w-auto">
          <div className="col-span-2 sm:col-span-1 flex gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Min</span>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                disabled={speedState === 'playing'}
                className="w-16 sm:w-20 px-3 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-900 dark:text-white transition-all text-sm font-bold disabled:opacity-40"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Max</span>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                disabled={speedState === 'playing'}
                className="w-16 sm:w-20 px-3 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-900 dark:text-white transition-all text-sm font-bold disabled:opacity-40"
              />
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

          <div className="col-span-2 flex flex-col max-w-full">
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Operation</span>
            <div className="flex rounded-xl overflow-x-auto hide-scrollbar dark-input p-1 max-w-[calc(100vw-1.5rem)] sm:max-w-none gap-0.5">
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

          <div className="hidden sm:block w-px h-8 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

          <div className="col-span-2 flex flex-col sm:col-span-1">
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Mode</span>
            <div className="flex rounded-xl overflow-hidden p-1 dark-input gap-0.5 w-full sm:w-auto">
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

          {mode === 'timed' && (
            <div className="col-span-2 flex flex-col animate-in fade-in slide-in-from-top-1 duration-200 sm:col-span-1">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Delay (s)</span>
              <input
                type="number"
                min="1"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
                className="w-14 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>
          )}

          {mode === 'speed' && (
            <div className="col-span-2 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-1 duration-200 sm:flex sm:flex-wrap sm:items-end sm:gap-2 sm:col-span-1">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Session</span>
                <input
                  type="number"
                  min="10"
                  value={sessionTime}
                  disabled={speedState === 'playing'}
                  onChange={(e) => setSessionTime(e.target.value)}
                  className="w-16 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold text-slate-900 dark:text-white disabled:opacity-40"
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
                  className="w-16 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold text-slate-900 dark:text-white disabled:opacity-40"
                />
              </div>

              <div className="hidden sm:block w-px h-8 bg-zinc-300 dark:bg-zinc-700 mx-1 mt-3"></div>

              <div className="col-span-2 flex items-end sm:col-span-1">
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-900/10 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-900/15 dark:hover:bg-white/15 transition-all border border-slate-300/60 dark:border-white/10 font-bold text-xs uppercase tracking-wider"
                >
                  Settings
                </button>
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
                className="w-16 px-2.5 py-1.5 dark-input rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-bold text-slate-900 dark:text-white disabled:opacity-40"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
          {mode === 'speed' ? (
            speedState === 'playing' ? (
              <button onClick={onStopSession} className="w-full sm:w-auto px-5 py-2.5 bg-zinc-900 dark:bg-zinc-200 hover:bg-black dark:hover:bg-white text-white dark:text-black font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm">
                Stop Session
              </button>
            ) : (
              <button onClick={onStartSession} className="w-full sm:w-auto px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/20 transition-all active:scale-95 text-sm">
                Start Session
              </button>
            )
          ) : (
            <button onClick={onGenerateClick} className="w-full sm:w-auto px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/20 transition-all active:scale-95 text-sm">
              Generate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
