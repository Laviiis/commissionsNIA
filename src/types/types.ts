export type ProjectStatus = 'Novo' | 'Planejamento' | 'Em andamento' | 'Revisão' | 'Correções' | 'Aguardando cliente' | 'Finalizado' | 'Cancelado';

export type Priority = 'Baixa' | 'Média' | 'Alta' | 'Urgente';

export interface TimeLog {
  id: string;
  projectId: string;
  startTime: string;
  endTime: string | null;
  durationSeconds: number;
}

export interface Client {
  id: string;
  name: string;
  avatarUrl?: string;
  email: string;
  discord?: string;
  phone?: string;
  socialLinks: string[];
  notes: string;
  createdAt: string;
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  status: ProjectStatus;
  totalValue: number;
  receivedValue: number;
  paymentMethod: string;
  createdAt: string;
  startDate: string | null;
  dueDate: string | null;
  completedAt: string | null;
  timeLogs: TimeLog[];
  tags: string[];
  isArchived: boolean;
  isFavorite: boolean;
}

export interface FinancialGoal {
  month: number;
  year: number;
  targetAmount: number;
}
