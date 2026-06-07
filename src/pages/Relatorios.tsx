import React from 'react';

export default function Relatorios({ store }: { store: any }) {
  // Garante um array vazio caso store.projects esteja indefinido
  const projetos = store?.projects || [];

  // Filtra e calcula o faturamento de forma totalmente segura
  const projetosFinalizados = projetos.filter((p: any) => p?.status === 'Finalizado');
  const totalFaturado = projetosFinalizados.reduce((acc: number, p: any) => acc + (p?.totalValue || 0), 0);

  return (
    <div className="space-y-6">
      {/* ⚡ Título principal brilhando em sincronia cromática */}
      <h1 className="text-2xl font-black uppercase tracking-wide text-rgb-chroma">
        Relatórios Financeiros 📊
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🚀 Card 1: Faturamento com contorno animado RGB */}
        <div className="bg-surface/60 rounded-xl p-6 relative modal-cyber-rgb overflow-hidden backdrop-blur-md transition-all hover:scale-[1.02]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
            Total Faturado (Projetos Concluídos)
          </span>
          {/* Brilho neon estendido no valor monetário */}
          <h2 className="text-3xl font-black mt-2 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">
            R$ {totalFaturado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        
        {/* 🚀 Card 2: Contagem de itens com contorno animado RGB */}
        <div className="bg-surface/60 rounded-xl p-6 relative modal-cyber-rgb overflow-hidden backdrop-blur-md transition-all hover:scale-[1.02]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-500 to-indigo-500" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
            Comissões Entregues
          </span>
          {/* Brilho neon estendido no total de itens */}
          <h2 className="text-3xl font-black mt-2 text-brand-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.4)]">
            {projetosFinalizados.length} itens ⚡
          </h2>
        </div>
      </div>
    </div>
  );
}