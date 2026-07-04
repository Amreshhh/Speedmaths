import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function App() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [mode, setMode] = useState('manual');
  const [delay, setDelay] = useState(3);
  const [operation, setOperation] = useState('square');
  const [complementBase, setComplementBase] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [numberOne, setNumberOne] = useState(null);
  const [numberTwo, setNumberTwo] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const timeoutRef = useRef(null);

  const generateNumber = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const actualMin = Math.min(Number(min), Number(max));
    const actualMax = Math.max(Number(min), Number(max));
    const getRand = () => Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin;

    setNumberOne(getRand());
    setNumberTwo(operation === 'multiply' ? getRand() : null);
    setIsRevealed(false);

    if (mode === 'timed') {
      timeoutRef.current = setTimeout(() => {
        setIsRevealed(true);
      }, Number(delay) * 1000);
    }
  }, [min, max, mode, delay, operation]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        if (mode === 'manual' && numberOne !== null && !isRevealed) {
          setIsRevealed(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode, numberOne, isRevealed]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <div className="bg-white dark:bg-slate-800 shadow-md p-4 sm:p-6 z-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-end gap-4 justify-center w-full xl:w-auto">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Lower Limit</label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="w-20 sm:w-24 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Upper Limit</label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="w-20 sm:w-24 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors"
                />
              </div>

              <div className="w-px h-10 bg-slate-200 dark:bg-slate-600 hidden sm:block mx-1"></div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Operation</label>
                <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
                  <button
                    onClick={() => setOperation('square')}
                    className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${operation === 'square' ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                  >
                    Square
                  </button>
                  <button
                    onClick={() => setOperation('multiply')}
                    className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${operation === 'multiply' ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                  >
                    Multiply
                  </button>
                  <button
                    onClick={() => setOperation('complement')}
                    className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${operation === 'complement' ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                  >
                    Complement
                  </button>
                </div>
              </div>

              <div className="w-px h-10 bg-slate-200 dark:bg-slate-600 hidden sm:block mx-1"></div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Reveal Mode</label>
                <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
                  <button
                    onClick={() => setMode('manual')}
                    className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${mode === 'manual' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                  >
                    Manual
                  </button>
                  <button
                    onClick={() => setMode('timed')}
                    className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${mode === 'timed' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                  >
                    Timed
                  </button>
                </div>
              </div>

              {mode === 'timed' && (
                <div className="flex flex-col animate-in fade-in slide-in-from-left-4">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Time (s)</label>
                  <input
                    type="number"
                    min="1"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                    className="w-16 sm:w-20 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors"
                  />
                </div>
              )}

              {operation === 'complement' && (
                <div className="flex flex-col animate-in fade-in slide-in-from-left-4">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Target Base</label>
                  <input
                    type="number"
                    value={complementBase}
                    onChange={(e) => setComplementBase(e.target.value)}
                    className="w-20 sm:w-24 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 sm:p-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                title="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              <button
                onClick={generateNumber}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 whitespace-nowrap"
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row p-4 sm:p-8 gap-4 sm:gap-8 max-w-[1600px] w-full mx-auto">
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-2 border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-6 relative overflow-hidden group min-h-[40vh] transition-colors duration-300">
            <div className="absolute top-6 left-6 text-slate-400 font-medium tracking-widest uppercase text-sm">
              Generated {operation === 'multiply' ? 'Numbers' : 'Number'}
            </div>

            {numberOne !== null ? (
              <div className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-indigo-600 dark:text-indigo-400 leading-tight text-center whitespace-nowrap tracking-tighter">
                {operation === 'multiply' ? (
                  <span>{numberOne} <span className="text-slate-300 dark:text-slate-600 mx-2">×</span> {numberTwo}</span>
                ) : (
                  numberOne
                )}
              </div>
            ) : (
              <div className="text-2xl text-slate-400 text-center flex flex-col items-center gap-4">
                <svg className="w-16 h-16 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Click "Generate" to start
              </div>
            )}
          </div>

          <div className={`flex-1 rounded-3xl shadow-sm border-2 flex flex-col items-center justify-center p-6 relative transition-all duration-500 min-h-[40vh]
            ${isRevealed
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
              : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 border-dashed'}`}
          >
            <div className={`absolute top-6 left-6 font-medium tracking-widest uppercase text-sm transition-colors duration-300
              ${isRevealed ? 'text-emerald-600 dark:text-emerald-500' : 'text-slate-400'}`}>
              {operation === 'multiply' ? 'The Product' : operation === 'complement' ? 'The Complement' : 'The Square'}
            </div>

            {numberOne !== null ? (
              isRevealed ? (
                <div className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-emerald-600 dark:text-emerald-400 leading-tight text-center whitespace-nowrap tracking-tighter animate-in zoom-in spin-in-3 duration-500">
                  {operation === 'multiply' ? numberOne * numberTwo : operation === 'complement' ? Number(complementBase) - numberOne : numberOne ** 2}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 text-slate-400 dark:text-slate-500">
                  <div className="text-[6rem] sm:text-[8rem] font-black opacity-20 blur-sm select-none">
                    ?
                  </div>
                  {mode === 'manual' ? (
                    <div className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-6 py-3 rounded-full font-semibold animate-pulse text-center">
                      Press <kbd className="font-mono bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm mx-1 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600">ENTER</kbd> to reveal
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-6 py-3 rounded-full font-semibold">
                      <svg className="animate-spin h-5 w-5 text-slate-500 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Revealing in {delay}s...
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="text-2xl text-slate-300 dark:text-slate-600 font-light italic text-center">
                Waiting for number{operation === 'multiply' ? 's' : ''}...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
