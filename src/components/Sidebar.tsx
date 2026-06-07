import React from 'react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: 'dashboard' | 'kanban' | 'clients' | 'reports') => void;
}

export default function Sidebar({ currentTab, setCurrentTab }: SidebarProps) {
  const menuItens = [
    { id: 'dashboard', label: 'Visão Geral' },
    { id: 'kanban', label: 'Quadro Kanban' },
    { id: 'clients', label: 'Clientes' },
    { id: 'reports', label: 'Relatórios' },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-white/5 flex flex-col justify-between p-5 h-full">
      <div className="space-y-8">
        {/* Logo / Título */}
        <div className="px-2 py-3">
          <h2 className="text-xl font-semibold tracking-widest text-brand-400 font-serif">
            LUMINA
          </h2>
          <p className="text-xs text-zinc-500 uppercase font-medium tracking-[0.25em]">
            Workspace
          </p>
        </div>

        {/* Links de Navegação */}
        <nav className="space-y-2">
          {menuItens.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id as any)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-brand-400 border border-white/5 shadow-inner'
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Rodapé do Menu */}
      <div className="border-t border-white/5 pt-4 px-2 text-xs text-zinc-600 font-light tracking-wide">
        v1.0.0 • Premium
      </div>
    </aside>
  );
}