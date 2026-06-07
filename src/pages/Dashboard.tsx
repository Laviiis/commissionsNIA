import React, { useEffect, useState } from 'react';

interface DashboardProps {
  store: any;
  setCurrentTab: (tab: 'dashboard' | 'kanban' | 'clients' | 'reports') => void;
}

export default function Dashboard({ store, setCurrentTab }: DashboardProps) {
  const projetos = store?.projects || [];
  const clientes = store?.clients || [];
  const activeTimer = store?.activeTimer;

  const [, setTick] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeTimer) {
      interval = setInterval(() => setTick(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const formatDuration = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getLiveTimerDuration = (startTime: string) => {
    const start = new Date(startTime).getTime();
    const now = new Date().getTime();
    return Math.max(0, Math.floor((now - start) / 1000));
  };

  const checkDeadlineStatus = (dueDateStr: string | null) => {
    if (!dueDateStr) return { label: 'Sem prazo', styles: 'bg-purple-950/40 text-zinc-400 border border-purple-500/20 backdrop-blur-md' };
    
    const now = new Date();
    now.setHours(0,0,0,0);
    const deadline = new Date(dueDateStr);
    deadline.setHours(0,0,0,0);

    if (deadline.getTime() < now.getTime()) {
      return { 
        label: '✦ CRÍTICO: ATRASADO ⚠️', 
        styles: 'bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse' 
      };
    } else if (deadline.getTime() === now.getTime()) {
      return { 
        label: '✦ ENTREGA HOJE ⏳', 
        styles: 'bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
      };
    }
    
    return { 
      label: `Prazo: ${new Date(dueDateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}`, 
      styles: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 backdrop-blur-md' 
    };
  };

  const projetosEmAndamento = projetos.filter((p: any) => p?.status !== 'Finalizado');
  const receitaProjetada = projetos.reduce((acc: number, p: any) => acc + (p?.totalValue || 0), 0);

  return (
    /* CONTAINER PRINCIPAL: Adicionada a classe utilitária "animate-page-enter" ao final para transição suave */
    <div className="space-y-12 relative min-h-screen p-6 overflow-hidden bg-[#030305]/40 text-zinc-100 selection:bg-purple-500/30 rounded-2xl border border-purple-500/10 shadow-2xl backdrop-blur-xl animate-page-enter">
      
      {/* 🔮 ESTILOS INJETADOS PARA ANIMAÇÕES CÓSMICAS AVANÇADAS */}
      <style>{`
        @keyframes cosmic-pulse {
          0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.35; }
          50% { transform: scale(1.2) translate(30px, -40px); opacity: 0.6; }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes meteor-slide {
          0% { transform: translateX(100%) translateY(-100%); opacity: 0; }
          8% { opacity: 1; }
          25% { transform: translateX(-100%) translateY(100%); opacity: 0; }
          100% { transform: translateX(-100%) translateY(100%); opacity: 0; }
        }
        .animate-cosmic-1 { animation: cosmic-pulse 14s infinite ease-in-out; }
        .animate-cosmic-2 { animation: cosmic-pulse 20s infinite ease-in-out reverse; }
        .animate-star { animation: star-twinkle 3.5s infinite ease-in-out; }
        .animate-meteor-1 { animation: meteor-slide 8s infinite linear; }
        .animate-meteor-2 { animation: meteor-slide 12s infinite linear 3s; }
      `}</style>

      {/* 🌌 AMBIENTE DE BACKGROUND ULTRA-INTENSO */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden rounded-2xl">
        <div className="absolute -top-[10%] -right-[10%] w-[650px] h-[650px] bg-gradient-to-br from-purple-600/40 via-fuchsia-800/20 to-transparent rounded-full blur-[130px] animate-cosmic-1" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/30 via-indigo-600/20 to-transparent rounded-full blur-[140px] animate-cosmic-2" />
        
        <div className="absolute top-16 left-[25%] text-purple-400 text-xs font-mono animate-star">✦</div>
        <div className="absolute top-44 right-[35%] text-cyan-300 text-sm font-mono animate-star [animation-delay:1.2s]">✦</div>
        <div className="absolute bottom-36 left-[45%] text-fuchsia-400 text-xs font-mono animate-star [animation-delay:2.2s]">✦</div>
        <div className="absolute bottom-60 right-[15%] text-indigo-300 text-base font-mono animate-star [animation-delay:0.6s]">✦</div>

        <div className="absolute top-0 right-12 w-[250px] h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-transparent rotate-[-45deg] animate-meteor-1" />
        <div className="absolute top-32 right-1/4 w-[300px] h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rotate-[-45deg] animate-meteor-2" />
      </div>

      {/* 🪐 CONTEÚDO DA INTERFACE */}
      <div className="relative z-10 space-y-10">
        
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
              <span>✦</span> LUMINA INTERSTELLAR WORKSPACE <span>✦</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mt-1">
              Visão Geral
            </h1>
            <p className="text-xs text-zinc-400 mt-1 font-medium tracking-wide">Bem-vindo de volta ao cockpit de monitoramento e performance.</p>
          </div>
          
          <button 
            onClick={() => {
              const btn = document.querySelector('[class*="Fixed"], [class*="fixed"] button');
              if (btn) (btn as HTMLElement).click();
              else alert('Para criar uma nova comissão, utilize o painel de controle lateral ou superior.');
            }}
            className="px-4 py-2 bg-purple-950/20 hover:bg-purple-900/40 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] cursor-pointer"
          >
            ✦ Abrir Linha de Comando
          </button>
        </div>

        {/* ⏱️ CRONÔMETRO DE REGISTRO DE TEMPO (Translúcido Roxo Elétrico) */}
        {activeTimer && (() => {
          const projetoAtual = projetos.find((p: any) => p.id === activeTimer.projectId);
          const tempoPassado = getLiveTimerDuration(activeTimer.startTime);
          return (
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-950/30 via-indigo-950/20 to-purple-900/10 border border-purple-500/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_40px_rgba(139,92,246,0.15)] backdrop-blur-xl group">
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 opacity-90" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500 shadow-[0_0_12px_#a855f7]"></span>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-purple-400">Tempo de Renderização Ativo</span>
                  <h3 className="text-base font-bold text-white mt-0.5 tracking-wide">{projetoAtual?.title || 'Ilustração'}</h3>
                </div>
              </div>
              <div className="flex items-center gap-6 relative z-10">
                <span className="text-3xl font-mono font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-purple-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {formatDuration(tempoPassado)}
                </span>
                <button 
                  onClick={() => store.toggleTimer(activeTimer.projectId)}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 via-fuchsia-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] border border-white/10 cursor-pointer active:scale-95"
                >
                  INTERROMPER SESSÃO
                </button>
              </div>
            </div>
          );
        })()}

        {/* 📊 GRID DE METRICAS CYBER-GLOW (Vidro Violeta/Indigo Semitransparente) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Faturamento */}
          <div className="relative overflow-hidden bg-purple-950/10 border border-purple-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 group hover:-translate-y-1">
            <div className="absolute top-4 right-4 text-emerald-500/20 font-mono text-[9px] font-bold tracking-widest group-hover:text-emerald-500/40 transition-colors">✦ CASH_FLOW</div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Faturamento Projetado</span>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400 mt-3 tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              R$ {receitaProjetada.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
          </div>

          {/* Card 2: Demandas */}
          <div className="relative overflow-hidden bg-purple-950/10 border border-purple-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 group hover:-translate-y-1">
            <div className="absolute top-4 right-4 text-purple-500/20 font-mono text-[9px] font-bold tracking-widest group-hover:text-purple-500/40 transition-colors">✦ CORE_QUEUE</div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Demandas Pendentes</span>
            <div className="flex items-baseline gap-2 mt-3">
              <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                {projetosEmAndamento.length}
              </h2>
              <span className="text-xs font-bold text-zinc-400 tracking-wide">artes ativas</span>
            </div>
          </div>

          {/* Card 3: Clientes */}
          <div className="relative overflow-hidden bg-indigo-950/10 border border-indigo-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 group hover:-translate-y-1">
            <div className="absolute top-4 right-4 text-cyan-500/20 font-mono text-[9px] font-bold tracking-widest group-hover:text-cyan-500/40 transition-colors">✦ LEDGER_USER</div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Clientes Ativos</span>
            <div className="flex items-baseline gap-2 mt-3">
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 tracking-tight">
                {clientes.length}
              </h2>
              <span className="text-xs font-bold text-zinc-400 tracking-wide">compradores</span>
            </div>
          </div>
        </div>

        {/* 📋 LISTAGEM GLASSMOURPHISM DE ARTES (Fundo de Vidro Neon Filtrado) */}
        <div className="relative overflow-hidden bg-indigo-950/5 border border-indigo-500/15 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <div className="flex justify-between items-center border-b border-purple-500/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-purple-400 text-xs animate-pulse">✨</span>
              <h3 className="text-base font-black tracking-wide text-zinc-200">Próximas Linhas de Entrega</h3>
            </div>
            <span className="text-[10px] font-mono text-purple-300 bg-purple-950/30 px-2.5 py-1 rounded-md border border-purple-500/20 backdrop-blur-md">Volume: {projetosEmAndamento.length}</span>
          </div>

          {projetosEmAndamento.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-purple-500/20 rounded-2xl bg-purple-950/5 backdrop-blur-md">
              <p className="text-xs text-zinc-400 font-medium tracking-wide">✨ Todos os canais estão limpos. Nenhuma arte pendente no momento!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projetosEmAndamento.map((p: any) => {
                const cliente = clientes.find((c: any) => c.id === p.clientId);
                const isRunning = activeTimer?.projectId === p.id;
                const segundosSalvos = (p.timeLogs || []).reduce((acc: number, log: any) => acc + log.durationSeconds, 0);
                
                const statusPrazo = checkDeadlineStatus(p.dueDate);

                return (
                  <div 
                    key={p.id} 
                    className={`relative overflow-hidden border p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 group backdrop-blur-md ${
                      isRunning 
                        ? 'border-purple-500/50 bg-purple-950/20 shadow-[0_0_30px_rgba(139,92,246,0.15)]' 
                        : 'border-purple-500/10 bg-purple-950/5 hover:border-purple-500/30 hover:bg-purple-900/10'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="space-y-2 relative z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-zinc-100 tracking-wide group-hover:text-white transition-colors">
                          {p.title}
                        </h4>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 font-black tracking-widest border border-purple-500/20 backdrop-blur-md uppercase">
                          {p.status}
                        </span>
                        
                        <span className={`text-[9px] px-2 py-0.5 rounded-md font-black tracking-widest ${statusPrazo.styles}`}>
                          {statusPrazo.label}
                        </span>
                      </div>
                      
                      <p className="text-xs text-zinc-400 font-medium">
                        Contratante: <span className="text-purple-300 font-semibold">{cliente?.name || 'Canal Desconhecido'}</span>
                      </p>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-1.5 pt-1 text-[10px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1">
                          <span className="text-purple-400">📅</span> Início: <span className="text-zinc-300">{p.startDate ? new Date(p.startDate).toLocaleDateString('pt-BR') : 'N/A'}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-purple-400">✦</span> Acumulado: <span className="text-purple-400 font-bold">{formatDuration(segundosSalvos)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center relative z-10">
                      <button
                        onClick={() => store.toggleTimer(p.id)}
                        className={`px-4 py-2 text-xs font-black tracking-wide rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-md ${
                          isRunning 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                            : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/40 border-purple-500/20 hover:border-purple-500/40'
                        }`}
                      >
                        {isRunning ? '⏸ PAUSAR SESSÃO' : '▶ CAPTURAR FOCO'}
                      </button>
                      <button
                        onClick={() => {
                          if (isRunning) store.toggleTimer(p.id);
                          store.updateProjectStatus(p.id, 'Finalizado');
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500 hover:to-teal-600 text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-transparent text-xs font-black tracking-wide rounded-xl transition-all duration-200 cursor-pointer shadow-md"
                      >
                        ✓ CONCLUIR
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}