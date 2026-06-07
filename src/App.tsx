import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Kanban from './components/kanban/KanbanBoard';
import Clientes from './pages/Clientes';
import Relatorios from './pages/Relatorios';
import ModalProject from './components/ModalProject';
import { useLuminaStore } from './hooks/useLuminaStore';

export default function App() {
  const [currentTab, setCurrentTab] = useState<
    'dashboard' | 'kanban' | 'clients' | 'reports'
  >('dashboard');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const store = useLuminaStore();

  if (!store) return null;

  return (
    <div className="relative h-screen overflow-hidden font-sans text-zinc-100 selection:bg-brand-500/30 selection:text-white">

      {/* 🌌 IMAGEM DE FUNDO GLOBAL */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      {/* 🖤 OVERLAY + BLUR (legibilidade premium) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* ✨ LUZES NEON AMBIENTAIS */}
      <div className="absolute top-[-20%] left-[25%] w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 🧱 APP */}
      <div className="relative z-10 flex h-full">

        {/* Menu Lateral */}
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">

          <div className="max-w-[1600px] mx-auto w-full animate-fade-in space-y-6">

            {/* ⚡ CABEÇALHO */}
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="
                  px-5 py-2.5
                  bg-zinc-950 text-white
                  text-xs font-black
                  rounded-xl
                  transition-all
                  border border-transparent
                  modal-cyber-rgb
                  flex items-center gap-2
                  cursor-pointer
                  uppercase tracking-wider
                  hover:scale-105
                  active:scale-95
                "
              >
                <span className="text-sm">✦</span>
                Nova Comissão
              </button>
            </div>

            {/* Abas */}
            {currentTab === 'dashboard' && (
              <Dashboard store={store} setCurrentTab={setCurrentTab} />
            )}

            {currentTab === 'kanban' && (
              <Kanban store={store} />
            )}

            {currentTab === 'clients' && (
              <Clientes store={store} />
            )}

            {currentTab === 'reports' && (
              <Relatorios store={store} />
            )}
          </div>
        </main>

        {/* Modal */}
        <ModalProject
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          store={store}
        />
      </div>
    </div>
  );
}