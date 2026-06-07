import React, { useState, useEffect } from 'react';
import { useLuminaStore } from '../../hooks/useLuminaStore';

export const GlobalTimer = () => {
  const { state, toggleTimer } = useLuminaStore();
  const [elapsed, setElapsed] = useState(0);

  const activeTimer = state.activeTimer;

  // Atualiza o relógio a cada segundo se houver um timer ativo
  useEffect(() => {
    let interval: any;
    
    if (activeTimer?.startTime) {
      interval = setInterval(() => {
        const start = new Date(activeTimer.startTime!).getTime();
        const now = new Date().getTime();
        setElapsed(Math.floor((now - start) / 1000));
      }, 1000);
    } else {
      setElapsed(0);
    }

    return () => clearInterval(interval);
  }, [activeTimer]);

  if (!activeTimer) return null;

  // Encontra o nome do projeto atual
  const project = state.projects.find(p => p.id === activeTimer.projectId);

  // Formata os segundos em HH:MM:SS
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-[#121214] border border-white/10 shadow-2xl shadow-black/50 rounded-full p-1.5 pr-4 flex items-center gap-4 backdrop-blur-md">
        {/* Botão de Stop (Microinteração de UI) */}
        <button 
          onClick={() => toggleTimer(activeTimer.projectId!)}
          className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all group"
          title="Encerrar Timer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        </button>

        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
            {project?.title || 'Gravando...'}
          </span>
          <span className="text-sm font-bold text-white font-mono tabular-nums">
            {timeString}
          </span>
        </div>

        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-2" />
      </div>
    </div>
  );
};