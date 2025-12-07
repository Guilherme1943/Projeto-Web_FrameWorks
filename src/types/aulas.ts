export type CorDisciplina = "azul" | "verde" | "laranja" | "roxo" | "vermelho" | "rosa" | "ciano";

export interface Disciplina {
  id: number;
  nome: string;
  descricao: string;
  progresso: number;
  aulasConcluidas: number;
  totalAulas: number;
  cor: CorDisciplina;
  icone: any;
}

export interface AulaRecente {
  id: number;
  titulo: string;
  disciplina: string;
  duracao: string;
  status: "iniciado" | "pendente" | "concluido";
  cor: CorDisciplina;
  aulaId: string;
}