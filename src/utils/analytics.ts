type TimeLog = {
  durationSeconds: number;
};

type Project = {
  timeLogs: TimeLog[];
  receivedValue: number;
  status: string;
  clientId: string;
};

export const AnalyticsEngine = {
  // 1. Calcula o total de horas gastas em um projeto
  calculateTotalHours: (timeLogs: TimeLog[]): number => {
    const totalSeconds = timeLogs.reduce((acc, log) => acc + log.durationSeconds, 0);
    return totalSeconds / 3600; // Retorna em horas decimais
  },

  // 2. Calcula o lucro real por hora de um projeto específico
  calculateHourlyRate: (project: Project): number => {
    const totalHours = AnalyticsEngine.calculateTotalHours(project.timeLogs);
    if (totalHours === 0) return 0;
    return project.receivedValue / totalHours;
  },

  // 3. Média de lucro por hora global (Todos os projetos finalizados)
  calculateGlobalAverageHourlyRate: (projects: Project[]): number => {
    const completedProjects = projects.filter(p => p.status === 'Finalizado');
    if (completedProjects.length === 0) return 0;

    let totalRevenue = 0;
    let totalHours = 0;

    completedProjects.forEach(p => {
      totalRevenue += p.receivedValue;
      totalHours += AnalyticsEngine.calculateTotalHours(p.timeLogs);
    });

    return totalHours > 0 ? totalRevenue / totalHours : 0;
  },

  // 4. Identifica o Cliente Mais Lucrativo
  getTopClient: (projects: Project[], clients: any[]) => {
    const revenueByClient = projects.reduce((acc, project) => {
      acc[project.clientId] = (acc[project.clientId] || 0) + project.receivedValue;
      return acc;
    }, {} as Record<string, number>);

    const topClientId = Object.keys(revenueByClient).reduce((a, b) => 
      revenueByClient[a] > revenueByClient[b] ? a : b
    , '');

    const clientInfo = clients.find(c => c.id === topClientId);
    
    return {
      clientName: clientInfo?.name || 'N/A',
      totalRevenue: revenueByClient[topClientId] || 0
    };
  }
};