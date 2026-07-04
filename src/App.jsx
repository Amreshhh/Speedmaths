import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameHeader from './components/GameHeader';
import { Analytics } from '@vercel/analytics/react';
import NumberDisplay from './components/NumberDisplay';
import AnswerDisplay from './components/AnswerDisplay';
import SessionEndModal from './components/SessionEndModal';
import LandingPage from './components/LandingPage';

export default function App() {
  // Landing  page state - removed, now showing both
  const [showGameOnly, setShowGameOnly] = useState(false);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [mode, setMode] = useState('manual');
  const [delay, setDelay] = useState(3);
  const [operation, setOperation] = useState('square');
  const [complementBase, setComplementBase] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [feedbackText, setFeedbackText] = useState('');
  const suggestionEmail = import.meta.env.VITE_SUGGESTION_EMAIL || '';
  const feedbackEndpoint = suggestionEmail
    ? `https://formsubmit.co/${encodeURIComponent(suggestionEmail)}`
    : '';
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsKeyRight, setSettingsKeyRight] = useState('r');
  const [settingsKeyWrong, setSettingsKeyWrong] = useState('w');

  // Game States
  const [numberOne, setNumberOne] = useState(null);
  const [numberTwo, setNumberTwo] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [questionId, setQuestionId] = useState(0);
  const [activeCountdown, setActiveCountdown] = useState(null);

  // Speed Session States
  const [sessionTime, setSessionTime] = useState(60);
  const [thinkTime, setThinkTime] = useState(10);
  const [speedState, setSpeedState] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState({ right: 0, wrong: 0, missed: 0 });
  const [gradePhase, setGradePhase] = useState(false);

  // Custom Controls for Speed Mode
  const [keyRight, setKeyRight] = useState('r');
  const [keyWrong, setKeyWrong] = useState('w');

  useEffect(() => {
    if (settingsOpen) {
      setSettingsKeyRight(keyRight);
      setSettingsKeyWrong(keyWrong);
    }
  }, [settingsOpen, keyRight, keyWrong]);

  // Timer Refs
  const countdownIntervalRef = useRef(null);
  const speedThinkTimeoutRef = useRef(null);
  const gradeTimeoutRef = useRef(null);
  const sessionIntervalRef = useRef(null);

  // Generate number and handle timed reveal
  const generateNumber = useCallback(() => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    const actualMin = Math.min(Number(min), Number(max));
    const actualMax = Math.max(Number(min), Number(max));
    const getRand = () => Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin;
    
    setNumberOne(getRand());
    setNumberTwo(['multiply', 'add', 'sub'].includes(operation) ? getRand() : null);
    
    setIsRevealed(false);
    setGradePhase(false);
    setActiveCountdown(null);
    setQuestionId(prev => prev + 1);

    if (mode === 'timed') {
      setActiveCountdown(Number(delay));
      countdownIntervalRef.current = setInterval(() => {
        setActiveCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            setIsRevealed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [min, max, mode, delay, operation]);

  // Handle mode changes
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setSpeedState('idle');
    setGradePhase(false);
    setIsRevealed(false);
    setNumberOne(null);
    setNumberTwo(null);
    
    if (sessionIntervalRef.current) clearInterval(sessionIntervalRef.current);
    if (speedThinkTimeoutRef.current) clearInterval(speedThinkTimeoutRef.current);
    if (gradeTimeoutRef.current) clearTimeout(gradeTimeoutRef.current);
  };

  // End the speed session
  const endSession = useCallback(() => {
    setSpeedState('ended');
    setGradePhase(false);
    if (sessionIntervalRef.current) clearInterval(sessionIntervalRef.current);
    if (speedThinkTimeoutRef.current) clearInterval(speedThinkTimeoutRef.current);
    if (gradeTimeoutRef.current) clearTimeout(gradeTimeoutRef.current);
  }, []);

  // Start speed session
  const startSession = () => {
    setSpeedState('playing');
    setTimeLeft(sessionTime);
    setScore({ right: 0, wrong: 0, missed: 0 });
    
    if (sessionIntervalRef.current) clearInterval(sessionIntervalRef.current);
    
    sessionIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    generateNumber();
  };

  // Speed mode think time and auto-advance logic
  useEffect(() => {
    if (speedThinkTimeoutRef.current) clearInterval(speedThinkTimeoutRef.current);
    if (gradeTimeoutRef.current) clearTimeout(gradeTimeoutRef.current);

    if (mode === 'speed' && speedState === 'playing' && numberOne !== null) {
      if (!isRevealed) {
        setActiveCountdown(Number(thinkTime));
        speedThinkTimeoutRef.current = setInterval(() => {
          setActiveCountdown(prev => {
            if (prev <= 1) {
              clearInterval(speedThinkTimeoutRef.current);
              setIsRevealed(true);
              setGradePhase(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else if (gradePhase) {
        gradeTimeoutRef.current = setTimeout(() => {
          setScore(s => ({...s, missed: s.missed + 1}));
          generateNumber();
        }, 2000);
      }
    }
  }, [mode, speedState, isRevealed, gradePhase, thinkTime, questionId, numberOne, generateNumber, endSession]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      
      if (key === 'enter') {
        event.preventDefault(); 
        if (mode === 'manual' && numberOne !== null && !isRevealed) {
          setIsRevealed(true);
        } else if (mode === 'speed' && speedState === 'playing' && numberOne !== null && !isRevealed) {
          setIsRevealed(true);
          setGradePhase(true);
        }
      }

      if (mode === 'speed' && speedState === 'playing' && gradePhase) {
        if (key === keyRight.toLowerCase()) {
          setScore(s => ({...s, right: s.right + 1}));
          generateNumber();
        } else if (key === keyWrong.toLowerCase()) {
          setScore(s => ({...s, wrong: s.wrong + 1}));
          generateNumber();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, speedState, gradePhase, numberOne, isRevealed, generateNumber, keyRight, keyWrong]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (sessionIntervalRef.current) clearInterval(sessionIntervalRef.current);
      if (speedThinkTimeoutRef.current) clearInterval(speedThinkTimeoutRef.current);
      if (gradeTimeoutRef.current) clearTimeout(gradeTimeoutRef.current);
    };
  }, []);

  // Calculate answer based on operation
  const getRightBoxAnswer = () => {
    if (numberOne === null) return null;
    switch (operation) {
      case 'square': return numberOne ** 2;
      case 'sqrt': return Math.sqrt(numberOne).toFixed(3);
      case 'add': return numberOne + numberTwo;
      case 'sub': return numberOne - numberTwo;
      case 'multiply': return numberOne * numberTwo;
      case 'complement': return Number(complementBase) - numberOne;
      default: return '';
    }
  };

  const sanitizeSingleKey = (value, fallback) => {
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    return trimmed.slice(0, 1).toLowerCase();
  };

  const handleSaveKeyBindings = () => {
    setKeyRight(sanitizeSingleKey(settingsKeyRight, 'r'));
    setKeyWrong(sanitizeSingleKey(settingsKeyWrong, 'w'));
    setSettingsOpen(false);
  };

  const handleFeedbackSubmit = (event) => {
    const trimmedFeedback = feedbackText.trim();
    if (!trimmedFeedback || !suggestionEmail) {
      event.preventDefault();
      return;
    }

    window.setTimeout(() => setFeedbackText(''), 0);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <style>{`
        @keyframes shrinkBar {
          from { width: 100%; }
          to { width: 0%; }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .dark .glass-panel {
          background: rgba(15, 15, 15, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .dark-input {
          background: rgba(244, 244, 245, 0.9);
          border: 1px solid rgba(228, 228, 231, 1);
        }
        .dark .dark-input {
          background: rgba(30, 30, 30, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
      `}</style>

      {/* Full-page scrollable container */}
      <div className="w-full overflow-y-auto">
        
        {/* Landing Page Section - Full Height */}
        <div className="w-full min-h-screen">
          <LandingPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>

        {/* Game Section - Full Height */}
        <div id="game-section" className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 dark:from-black dark:via-slate-950 dark:to-slate-900 flex flex-col font-sans text-white transition-colors duration-500 relative overflow-x-hidden">
        
        {/* Header */}
        <GameHeader
          min={min} setMin={setMin}
          max={max} setMax={setMax}
          mode={mode} handleModeChange={handleModeChange}
          operation={operation} setOperation={setOperation}
          delay={delay} setDelay={setDelay}
          sessionTime={sessionTime} setSessionTime={setSessionTime}
          thinkTime={thinkTime} setThinkTime={setThinkTime}
          complementBase={complementBase} setComplementBase={setComplementBase}
          isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}
          speedState={speedState}
          onGenerateClick={generateNumber}
          onStartSession={startSession}
          onStopSession={endSession}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {/* Global Progress Timer for Speed mode */}
        {mode === 'speed' && speedState === 'playing' && (
          <div className="w-full h-1 bg-zinc-300 dark:bg-zinc-800">
            <div 
              className="h-full bg-yellow-400 shadow-md shadow-yellow-400/50 transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / sessionTime) * 100}%` }}
            />
          </div>
        )}

        {/* Main  Content Area */}
        <div className="flex-1 flex flex-col md:flex-row p-3 sm:p-8 gap-3 sm:gap-8 max-w-[1500px] w-full mx-auto relative justify-center items-stretch mt-3 sm:mt-4">
          
          {/* Session End Modal */}
          {speedState === 'ended' && (
            <SessionEndModal 
              score={score} 
              onRestart={() => { setSpeedState('idle'); setNumberOne(null); }}
            />
          )}

          {/* Left Panel: Number Display */}
          <NumberDisplay 
            numberOne={numberOne}
            numberTwo={numberTwo}
            operation={operation}
            mode={mode}
            speedState={speedState}
            timeLeft={timeLeft}
            sessionTime={sessionTime}
          />

          {/* Right Panel: Answer Display */}
          <AnswerDisplay
            numberOne={numberOne}
            numberTwo={numberTwo}
            operation={operation}
            isRevealed={isRevealed}
            gradePhase={gradePhase}
            mode={mode}
            speedState={speedState}
            complementBase={complementBase}
            activeCountdown={activeCountdown}
            thinkTime={thinkTime}
            delay={delay}
            keyRight={keyRight}
            keyWrong={keyWrong}
            onReveal={() => {
              setIsRevealed(true);
              if (mode === 'speed') setGradePhase(true);
            }}
            onMarkCorrect={() => {
              setScore(s => ({...s, right: s.right + 1}));
              generateNumber();
            }}
            onMarkIncorrect={() => {
              setScore(s => ({...s, wrong: s.wrong + 1}));
              generateNumber();
            }}
            getRightBoxAnswer={getRightBoxAnswer}
            onGenerateClick={mode !== 'speed' ? generateNumber : null}
            showMobileGenerateButton={mode !== 'speed'}
          />

        </div>

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 pb-6 sm:pb-8">
          <div className="glass-panel rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-black/20 shadow-2xl p-5 sm:p-7 text-slate-900 dark:text-white transition-colors duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-yellow-500 dark:text-yellow-400 font-bold mb-2">
                  Mobile Guide
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                  How to download this in Mobile?
                </h2>
              </div>
              <a
                href="https://www.youtube.com/shorts/to8PFEoQsqM"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-sm sm:text-base shadow-lg shadow-black/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                Open mobile install guide
              </a>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 pb-12 sm:pb-16">
          <div className="glass-panel rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-black/20 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-white transition-colors duration-300">
            <div className="flex flex-col lg:flex-row lg:items-end gap-6">
              <div className="flex-1">
                
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mb-3">
                  Suggest a new mode
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  If you want a different practice mode, type it here and I’ll shape the next update around it.
                </p>
              </div>

              <form onSubmit={handleFeedbackSubmit} action={feedbackEndpoint} method="POST" target="feedback-submission-frame" className="flex-1">
                <input type="hidden" name="_subject" value="Speedmaths suggestion" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="box" />
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  What should we add?
                </label>
                <textarea
                  name="suggestion"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Example: fraction mode, multiplication sprint, daily challenge..."
                  className="w-full min-h-[112px] rounded-2xl bg-white dark:bg-slate-900/80 text-slate-950 dark:text-white border border-slate-300 dark:border-slate-700 px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 resize-none placeholder:text-slate-400 shadow-sm"
                />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/20 transition-all active:scale-95 text-sm"
                  >
                    Send suggestion via email
                  </button>
                </div>
              </form>
              <iframe title="feedback-submission-frame" name="feedback-submission-frame" className="hidden" />
            </div>
          </div>
        </div>

        {settingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSettingsOpen(false)} />
            <div className="relative w-full max-w-md rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-950 shadow-2xl p-6 sm:p-7 text-slate-900 dark:text-white">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-yellow-500 dark:text-yellow-400 font-bold mb-2">Settings</p>
                  <h3 className="text-2xl font-black">Speed mode keys</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Close settings"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Correct key
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    value={settingsKeyRight.toUpperCase()}
                    onChange={(e) => setSettingsKeyRight(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold uppercase"
                    placeholder="R"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Incorrect key
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    value={settingsKeyWrong.toUpperCase()}
                    onChange={(e) => setSettingsKeyWrong(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold uppercase"
                    placeholder="W"
                  />
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  These keys are used only in Speed mode. Enter any single character you want.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveKeyBindings}
                  className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm shadow-lg shadow-yellow-400/20 transition-all active:scale-95"
                >
                  Save keys
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      </div>
      <Analytics />
    </div>
  );
}
