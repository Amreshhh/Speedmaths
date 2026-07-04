import React from 'react';

export default function SessionEndModal({ score, onRestart }) {
  return (
    <div className="absolute inset-4 sm:inset-8 z-30 flex flex-col items-center justify-center bg-zinc-100/95 dark:bg-black/95 rounded-3xl backdrop-blur-md animate-in fade-in zoom-in duration-300 border border-zinc-300/50 dark:border-white/10 shadow-2xl">
      <div className="text-center p-8 max-w-lg bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <span className="px-3 py-1 text-xs font-black tracking-widest text-black bg-yellow-400 rounded-full uppercase">Speed Session</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 mb-6 text-black dark:text-white tracking-tight">Challenge Over!</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-zinc-50 dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-black text-green-500">{score.right}</div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Right</div>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-black text-red-500">{score.wrong}</div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Wrong</div>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-black text-zinc-400 dark:text-zinc-600">{score.missed}</div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Missed</div>
          </div>
        </div>

        <button 
          onClick={onRestart}
          className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-yellow-400/20 text-lg"
        >
          Restart Challenge
        </button>
      </div>
    </div>
  );
}
