import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameHeader from './components/GameHeader';
import NumberDisplay from './components/NumberDisplay';
import AnswerDisplay from './components/AnswerDisplay';
import SessionEndModal from './components/SessionEndModal';
import LandingPage from './components/LandingPage';

export default function App() {
  // Landing page state - removed, now showing both
  const [showGameOnly, setShowGameOnly] = useState(false);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [mode, setMode] = useState('manual');
  const [delay, setDelay] = useState(3);
  const [operation, setOperation] = useState('square');
  const [complementBase, setComplementBase] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(true);

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
          keyRight={keyRight} setKeyRight={setKeyRight}
          keyWrong={keyWrong} setKeyWrong={setKeyWrong}
          complementBase={complementBase} setComplementBase={setComplementBase}
          isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}
          speedState={speedState}
          onGenerateClick={generateNumber}
          onStartSession={startSession}
          onStopSession={endSession}
          onHome={() => {
            const landingSection = document.querySelector('div > div > div:first-child');
            landingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row p-4 sm:p-8 gap-4 sm:gap-8 max-w-[1500px] w-full mx-auto relative justify-center items-stretch mt-4">
          
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
          />

        </div>

      </div>
      </div>
    </div>
  );
}
