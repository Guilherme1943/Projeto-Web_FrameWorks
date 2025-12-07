export interface AulaAtual {
  materia: string;
  titulo: string;
  modulo: string;
  progresso: number;
  tempoRestante: string;
  aulaId: string;
  imagem?: string;
}


export interface EventoAgenda {
  id: string | number;
  titulo: string;
  horario: string;
  dataOriginal?: string;
  tipo: string; 
}

export interface NotificacaoItem {
  id: number;
  titulo: string;
  mensagem: string;
  tempo: string;
  tipo: "sistema" | "material" | "aula" | "prova"; 
}

export interface DadosDesempenho {
  progressoGeral: number;
  aulasConcluidas: number;
  totalAulas: number;
  mediaGeral: number;
  atividadeSemanal: number[];
}