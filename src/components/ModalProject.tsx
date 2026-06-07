import React, { useState } from 'react';
import type { Priority, ProjectStatus } from '../types/types';

interface ModalProjectProps {
  isOpen: boolean;
  onClose: () => void;
  store: any;
}

export default function ModalProject({ isOpen, onClose, store }: ModalProjectProps) {
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  if (!isOpen) return null;

  const listaClientes = store?.clients || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !clientId || !startDate || !dueDate) {
      return alert('Por favor, preencha o Título, Cliente e ambas as Datas!');
    }

    store?.addProject?.({
      title,
      clientId,
      description: '',
      category: 'Design',
      priority: 'Média' as Priority,
      status: 'Novo' as ProjectStatus,
      totalValue: Number(totalValue) || 0,
      receivedValue: 0,
      paymentMethod: 'A combinar',
      startDate: new Date(startDate).toISOString(),
      dueDate: new Date(dueDate).toISOString(),
      tags: []
    });

    // Resetando os campos
    setTitle(''); setClientId(''); setTotalValue(''); setStartDate(''); setDueDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md animate-fade-in">
      
      {/* 🔮 EFEITO DE LUZ NEON TRASERA (AURA RGB) */}
      <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-brand-500 via-indigo-500 to-emerald-500 rounded-full blur-[100px] opacity-25 pointer-events-none animate-pulse-slow" />

      {/* Caixa do Formulário Glassmorphism com SUPER RGB */}
      {/* ⚡ Adicionado 'modal-cyber-rgb' aqui */}
      <div className="bg-zinc-950/90 w-full max-w-md rounded-2xl p-7 relative z-10 backdrop-blur-xl modal-cyber-rgb">
        
        {/* Linha Decorativa RGB no Topo */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-500 rounded-t-2xl" />

        <div className="mb-6">
          {/* ⚡ Adicionado 'text-rgb-chroma' aqui */}
          <h2 className="text-xl font-black tracking-wide text-rgb-chroma uppercase">Nova Comissão</h2>
          <p className="text-[11px] text-zinc-500 mt-1">Configure o escopo técnico e cronograma da entrega.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Título do Projeto</label>
            {/* ⚡ Adicionado 'input-rgb-focus' aqui */}
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-sm text-white transition-all input-rgb-focus" 
              placeholder="Ex: Concept Art Ilustração Berserk" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Cliente Destinatário</label>
            {/* ⚡ Adicionado 'input-rgb-focus' aqui */}
            <select 
              value={clientId} 
              onChange={e => setClientId(e.target.value)} 
              className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-sm text-zinc-300 transition-all cursor-pointer input-rgb-focus"
            >
              <option value="">Selecione um cliente da carteira...</option>
              {listaClientes.map((c: any) => (
                <option key={c?.id} value={c?.id}>{c?.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Preço Ajustado (R$)</label>
            {/* ⚡ Adicionado 'input-rgb-focus' aqui */}
            <input 
              type="number" 
              value={totalValue} 
              onChange={e => setTotalValue(e.target.value)} 
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-sm text-white transition-all input-rgb-focus" 
              placeholder="0.00" 
            />
          </div>

          {/* CRONOGRAMA DE DATAS DUPLO */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Data de Início</label>
              {/* ⚡ Adicionado 'input-rgb-focus' aqui */}
              <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)} 
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs text-zinc-300 transition-all input-rgb-focus" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Entrega Prevista</label>
              {/* ⚡ Adicionado 'input-rgb-focus' aqui */}
              <input 
                type="date" 
                value={dueDate} 
                onChange={e => setDueDate(e.target.value)} 
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs text-zinc-300 transition-all input-rgb-focus" 
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05] mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Descartar
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] transition-all cursor-pointer"
            >
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}