import React from 'react';
import type { ProjectStatus } from '../../types/types.ts';

export default function Kanban({ store }: { store: any }) {
  const colunas: ProjectStatus[] = ['Novo', 'Planejamento', 'Em andamento', 'Revisão', 'Finalizado'];

  // Mapeamento seguro
  const projetos = store?.projects || [];
  const clientes = store?.clients || [];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-semibold tracking-wide text-white">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(168,85,247,0.6)]">
            Quadro Kanban
          </span>
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Visualize e acompanhe o progresso dos seus projetos.
        </p>
      </div>

      {/* Colunas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {colunas.map(col => {
          const projetosFiltrados = projetos.filter((p: any) => p?.status === col);

          return (
            <div
              key={col}
              className="bg-surface/60 border border-white/5 rounded-2xl p-4 min-w-[240px]"
            >
              {/* Cabeçalho da coluna */}
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {col}
                </span>
                <span className="bg-black/40 text-xs px-2 py-0.5 rounded-full font-semibold text-white shadow-inner">
                  {projetosFiltrados.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-4">
                {projetosFiltrados.map((p: any) => {
                  const cliente = clientes.find((c: any) => c?.id === p?.clientId);
                  const isThisTimerActive = store?.activeTimer?.projectId === p?.id;

                  return (
                    <div
                      key={p.id}
                      className="bg-surface border border-white/10 rounded-xl p-4 shadow-md
                      hover:border-brand-500/40 hover:shadow-[0_0_16px_rgba(99,102,241,0.25)]
                      transition-all"
                    >
                      <h4 className="text-sm font-semibold text-white">
                        {p?.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mb-3">
                        {cliente?.name || 'Cliente oculto'}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-sm font-semibold text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]">
                          R$ {(p?.totalValue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>

                        {/* Ações */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => store?.toggleTimer?.(p.id)}
                            className={`text-xs px-2 py-1 rounded font-semibold transition-all cursor-pointer ${
                              isThisTimerActive
                                ? 'bg-amber-400 text-black animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.7)]'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {isThisTimerActive ? '⏱️ Parar' : '⏱️ Iniciar'}
                          </button>

                          {col !== 'Finalizado' && (
                            <button
                              onClick={() => {
                                const nextStatus: Record<string, ProjectStatus> = {
                                  'Novo': 'Planejamento',
                                  'Planejamento': 'Em andamento',
                                  'Em andamento': 'Revisão',
                                  'Revisão': 'Finalizado'
                                };
                                store?.updateProjectStatus?.(p.id, nextStatus[col]);
                              }}
                              className="text-xs px-2 py-1 rounded font-semibold transition-all cursor-pointer
                              bg-brand-500/20 text-brand-400
                              hover:bg-brand-500 hover:text-white
                              shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                            >
                              →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}