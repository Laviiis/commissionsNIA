import React from 'react';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#0A0A0A] text-gray-100 font-sans selection:bg-indigo-500/30">
      {/* Sidebar - Estilo Notion/Linear */}
      <aside className="w-64 border-r border-white/5 bg-[#0F0F11] flex flex-col transition-all duration-300">
        <div className="p-5 flex items-center gap-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            L
          </div>
          <span className="font-semibold text-sm tracking-wide">Lumina Workspace</span>
        </div>
        
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {/* Navegação */}
          <NavItem icon="📊" label="Dashboard" active />
          <NavItem icon="💼" label="Projetos" />
          <NavItem icon="👥" label="Clientes" />
          <NavItem icon="📅" label="Calendário" />
          <NavItem icon="📈" label="Relatórios" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar com Busca Global */}
        <header className="h-14 border-b border-white/5 flex items-center px-6 justify-between backdrop-blur-md bg-[#0A0A0A]/80 z-10">
          <div className="flex items-center bg-white/5 rounded-md px-3 py-1.5 w-96 border border-white/5 focus-within:border-indigo-500/50 transition-colors">
            <span className="text-gray-500 mr-2">⌘K</span>
            <input 
              type="text" 
              placeholder="Pesquisar projetos, clientes ou tags..." 
              className="bg-transparent border-none outline-none text-sm text-gray-200 w-full placeholder-gray-600"
            />
          </div>
          <div className="flex items-center gap-4">
            {/* Indicador de Timer Ativo Global */}
            <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse-slow">
              ⏱️ 01:24:10 em Project X
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active }: { icon: string; label: string; active?: boolean }) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
    active ? 'bg-white/10 text-white font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
  }`}>
    <span>{icon}</span>
    {label}
  </button>
);