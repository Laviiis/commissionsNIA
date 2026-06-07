import { useState, useEffect } from 'react';
import type { Project, Client, TimeLog, ProjectStatus } from '../types/types.ts';

interface StoreState {
  projects: Project[];
  clients: Client[];
  activeTimer: { projectId: string; startTime: string } | null;
}

export const useLuminaStore = () => {
  // Inicialização segura com tratamento de erros para o localStorage
  const [state, setState] = useState<StoreState>(() => {
    const saved = localStorage.getItem('@lumina_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          projects: parsed.projects || [],
          clients: parsed.clients || [],
          activeTimer: parsed.activeTimer || null
        };
      } catch (e) {
        console.error("Erro ao analisar o estado salvo no localStorage. Resetando...", e);
      }
    }
    return { projects: [], clients: [], activeTimer: null };
  });

  // Efeito permanente para persistência de dados no navegador
  useEffect(() => {
    localStorage.setItem('@lumina_state', JSON.stringify(state));
  }, [state]);

  // === CRUD CLIENTES ===
  const addClient = (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, clients: [...(prev.clients || []), newClient] }));
  };

  const updateClient = (id: string, updatedFields: Partial<Client>) => {
    setState(prev => ({
      ...prev,
      clients: (prev.clients || []).map(c => c.id === id ? { ...c, ...updatedFields } : c)
    }));
  };

  const deleteClient = (id: string) => {
    setState(prev => ({
      ...prev,
      clients: (prev.clients || []).filter(c => c.id !== id),
      projects: (prev.projects || []).filter(p => p.clientId !== id) // Deleção em cascata
    }));
  };

  // === CRUD PROJETOS ===
  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'timeLogs' | 'isArchived' | 'isFavorite' | 'completedAt'>) => {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completedAt: null,
      timeLogs: [],
      isArchived: false,
      isFavorite: false
    };
    setState(prev => ({ ...prev, projects: [...(prev.projects || []), newProject] }));
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setState(prev => ({
      ...prev,
      projects: (prev.projects || []).map(p => p.id === id ? { ...p, ...updatedFields } : p)
    }));
  };

  const updateProjectStatus = (id: string, status: ProjectStatus) => {
    setState(prev => ({
      ...prev,
      projects: (prev.projects || []).map(p => 
        p.id === id ? { ...p, status, completedAt: status === 'Finalizado' ? new Date().toISOString() : null } : p
      )
    }));
  };

  const deleteProject = (id: string) => {
    setState(prev => ({ ...prev, projects: (prev.projects || []).filter(p => p.id !== id) }));
  };

  // === CONTROLE DO CRONÔMETRO ===
  const toggleTimer = (projectId: string) => {
    const now = new Date().toISOString();
    
    setState(prev => {
      if (prev.activeTimer?.projectId === projectId) {
        const start = new Date(prev.activeTimer.startTime).getTime();
        const end = new Date(now).getTime();
        const diffSeconds = Math.floor((end - start) / 1000);

        const log: TimeLog = {
          id: crypto.randomUUID(),
          projectId,
          startTime: prev.activeTimer.startTime,
          endTime: now,
          durationSeconds: diffSeconds
        };

        return {
          ...prev,
          activeTimer: null,
          projects: (prev.projects || []).map(p => p.id === projectId ? { ...p, timeLogs: [...(p.timeLogs || []), log] } : p)
        };
      } 
      
      return {
        ...prev,
        activeTimer: { projectId, startTime: now }
      };
    });
  };

  // Desestruturamos as propriedades no retorno para bater perfeitamente com os componentes filhos
  return {
    projects: state.projects,
    clients: state.clients,
    activeTimer: state.activeTimer,
    addClient,
    updateClient,
    deleteClient,
    addProject,
    updateProject,
    updateProjectStatus,
    deleteProject,
    toggleTimer
  };
};

export default useLuminaStore;