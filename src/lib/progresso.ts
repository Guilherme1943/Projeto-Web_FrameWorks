import { BANCO_DE_AULAS } from "@/data/conteudo-aulas";

const STORAGE_KEY = "conectaedu-aulas-vistas";

// calculo de aulas vistas

const calcularTotais = () => {
  const totais: Record<number, number> = {};
  Object.values(BANCO_DE_AULAS).forEach(aula => {
    totais[aula.disciplinaId] = (totais[aula.disciplinaId] || 0) + 1;
  });
  return totais;
};

// totais dinâmicos
export const TOTAIS_POR_DISCIPLINA = calcularTotais();

export const getTotalGeralAulas = () => {
  return Object.values(BANCO_DE_AULAS).length;
};

// retorna id das aulas concluídas
export const getAulasConcluidas = (): string[] => {
  if (typeof window === "undefined") return [];
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
};

// alterna o status de uma aula
export const toggleAulaVista = (aulaId: string): boolean => {
  const concluidas = getAulasConcluidas();
  const index = concluidas.indexOf(aulaId);
  let novoEstado = [];

  if (index > -1) {
    novoEstado = concluidas.filter(id => id !== aulaId);
  } else {
    novoEstado = [...concluidas, aulaId];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(novoEstado));

  window.dispatchEvent(new Event("storage"));
  return index === -1;
};

export const isAulaConcluida = (aulaId: string): boolean => {
  const concluidas = getAulasConcluidas();
  return concluidas.includes(aulaId);
};

// calcula estatísticas para disciplina
export const getProgressoDisciplina = (disciplinaId: number) => {
  const concluidasIds = getAulasConcluidas();
  
  // conta as aulas marcadas como vistas
  const count = concluidasIds.filter(id => BANCO_DE_AULAS[id]?.disciplinaId === disciplinaId).length;
  const total = TOTAIS_POR_DISCIPLINA[disciplinaId] || 1; // Evita divisão por zero

  return {
    concluidas: count,
    total: total,
    porcentagem: Math.round((count / total) * 100)
  };
};

// estatisticas gerais
export const getProgressoGeral = () => {
  const concluidasIds = getAulasConcluidas();

  const validas = concluidasIds.filter(id => BANCO_DE_AULAS[id]);
  
  const totalConcluidas = validas.length;
  const totalGeral = getTotalGeralAulas();

  return {
    concluidas: totalConcluidas,
    total: totalGeral,
    porcentagem: totalGeral > 0 ? Math.round((totalConcluidas / totalGeral) * 100) : 0
  };
};