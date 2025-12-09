export interface VideoAula {
  id: string;
  disciplinaId: number;
  titulo: string;
  descricao: string;
  videoUrl: string;
  duracao: string;
  proximaAulaId?: string;
}

// recebe o link do vídeo
const criarAula = (
  discId: number, 
  slug: string, 
  num: number, 
  total: number, 
  titulo: string,
  urlVideo: string
): VideoAula => ({
  id: `${slug}-${num.toString().padStart(2, '0')}`,
  disciplinaId: discId,
  titulo: `${titulo}`,
  descricao: `Conteúdo aprofundado da aula ${num} do módulo principal.`,
  videoUrl: urlVideo, 
  duracao: "20:00",
  proximaAulaId: num < total ? `${slug}-${(num + 1).toString().padStart(2, '0')}` : undefined
});

export const BANCO_DE_AULAS: Record<string, VideoAula> = {
  
// matematica id 01
  ...Object.fromEntries([
    [1, "Funções de 1º Grau", "https://www.youtube.com/embed/4q2N2HzSivA"],
    [2, "Funções de 2º Grau", "https://www.youtube.com/embed/ZpW9Xb5iyt4"],
    [3, "Potenciação e Radiciação", "https://www.youtube.com/embed/FzkAWvOAEUI"],
    [4, "Logaritmos", "https://www.youtube.com/embed/tR6S4dz6UGA"],
    [5, "Trigonometria no Triângulo", "https://www.youtube.com/embed/C7NrVLmEYcs"],
    [6, "Ciclo Trigonométrico", "https://www.youtube.com/embed/9FgfEQM1a3c"],
    [7, "Geometria Plana: Áreas", "https://www.youtube.com/embed/th5k6bzSDTA"],
    [8, "Geometria Espacial: Prismas", "https://www.youtube.com/embed/Bz1lw74k4XI"],
    [9, "Análise Combinatória", "https://www.youtube.com/embed/_8mZOSXCRp8"],
    [10, "Probabilidade", "https://www.youtube.com/embed/iNCkGogNtKI"],
    [11, "Estatística Básica", "https://www.youtube.com/embed/mSk2vjGXA90"],
    [12, "Matrizes e Determinantes", "https://www.youtube.com/embed/HNpSOOhtqkA"]
  ].map(([num, titulo, url], i, arr) => {
    const aula = criarAula(1, "matematica", num as number, arr.length, titulo as string, url as string);
    return [aula.id, aula];
  })),

// portugues id 02
  ...Object.fromEntries([
    [1, "Fonética e Fonologia", "https://www.youtube.com/embed/BOj2xCwIo8M"],
    [2, "Acentuação Gráfica", "https://www.youtube.com/embed/Sy_LUnePfRE"],
    [3, "Ortografia", "https://www.youtube.com/embed/AZQ7w--hR00"],
    [4, "Estrutura das Palavras", "https://www.youtube.com/embed/U_nRXQh5L40"],
    [5, "Classes Gramaticais I", "https://www.youtube.com/embed/s8a6eXncWY8"],
    [6, "Classes Gramaticais II", "https://www.youtube.com/embed/ohblr5iboO8"],
    [7, "Análise Sintática: Sujeito", "https://www.youtube.com/embed/jv2Nucfx-Rk"],
    [8, "Predicado e Predicativo", "https://www.youtube.com/embed/3uH39VAnAv8"],
    [9, "Concordância Nominal", "https://www.youtube.com/embed/wtYgEDzjcWM"],
    [10, "Concordância Verbal", "https://www.youtube.com/embed/4ZJnTqTk4_Y"]
  ].map(([num, titulo, url], i, arr) => {
    const aula = criarAula(2, "portugues", num as number, arr.length, titulo as string, url as string);
    return [aula.id, aula];
  })),

// historia id 03
  ...Object.fromEntries([
    [1, "Brasil Colônia: Ciclo do Açúcar", "https://www.youtube.com/embed/fGfFmA8nJDE"],
    [2, "Brasil Colônia: Ciclo do Ouro", "https://www.youtube.com/embed/COLOQUE_O_LINK_AQUI"],
    [3, "Independência do Brasil", "https://www.youtube.com/embed/hOiKSiek0xw"],
    [4, "Primeiro Reinado", "https://www.youtube.com/embed/cmro798TOP8"],
    [5, "Segundo Reinado", "https://www.youtube.com/embed/BXN4w9BPhPs"],
    [6, "República Velha", "https://www.youtube.com/embed/K8ovV4WVwjI"],
    [7, "Era Vargas", "https://www.youtube.com/embed/rXztkEF-TmM"],
    [8, "Ditadura Militar", "https://www.youtube.com/embed/COLOQUE_O_LINK_AQUI"],
    [9, "Redemocratização", "https://www.youtube.com/embed/dc8Ah0R2QNE"],
    [10, "Revolução Industrial", "https://www.youtube.com/embed/eDDGqU9OgAc"],
    [11, "Guerra Fria", "https://www.youtube.com/embed/Ap6sqsfIEmM"]
  ].map(([num, titulo, url], i, arr) => {
    const aula = criarAula(3, "historia", num as number, arr.length, titulo as string, url as string);
    return [aula.id, aula];
  })),

  // geografia id 04
  ...Object.fromEntries([
    [1, "Cartografia Básica", "https://www.youtube.com/embed/kTuh98rQZeo"],
    [2, "Geologia e Relevo", "https://www.youtube.com/embed/r2nP_S9Milc"],
    [3, "Climatologia", "https://www.youtube.com/embed/F7ju8Tq5p6M"],
    [4, "Biomas Brasileiros", "https://www.youtube.com/embed/_1UaytDLMGk"],
    [5, "Hidrografia", "https://www.youtube.com/embed/kaHwgUCIKFI"],
    [6, "Demografia", "https://www.youtube.com/embed/0K3t7Kfo7RY"],
    [7, "Urbanização", "https://www.youtube.com/embed/jPZyKuMrAj4"],
    [8, "Agropecuária", "https://www.youtube.com/embed/L7J8Ke8_gjs"],
    [9, "Fontes de Energia", "https://www.youtube.com/embed/zUIJQAmgXX8"],
    [10, "Geopolítica Mundial", "https://www.youtube.com/embed/GwSuwiKeFZ8"]
  ].map(([num, titulo, url], i, arr) => {
    const aula = criarAula(4, "geografia", num as number, arr.length, titulo as string, url as string);
    return [aula.id, aula];
  })),

// ingles id 05
  ...Object.fromEntries([
    [1, "Verb To Be", "link"],
    [2, "Present Simple", "link"],
    [3, "Present Continuous", "link"],
    [4, "Simple Past", "link"],
    [5, "Past Continuous", "link"],
    [6, "Future with Will/Going to", "link"],
    [7, "Present Perfect", "link"], 
    [8, "Modal Verbs", "link"],
    [9, "Passive Voice", "link"], 
    [10, "Conditional Sentences", "link"]
  ].map(([num, titulo, url], i, arr) => {
    const aula = criarAula(5, "ingles", num as number, arr.length, titulo as string, url as string);
    return [aula.id, aula];
  })),

// redação id 06
  ...Object.fromEntries([
    [1, "Estrutura Dissertativa", "https://www.youtube.com/embed/4C9lTDSowzc"], 
    [2, "A Tese", "https://www.youtube.com/embed/gkxwPqt-Hrk"], 
    [3, "Argumentação I", "https://www.youtube.com/embed/5ZyvEKtMC24"], 
    [4, "Argumentação II", "https://www.youtube.com/embed/mYmrLdf5AWE"], 
    [5, "Coesão Textual", "https://www.youtube.com/embed/WsY0MbTlPIY"], 
    [6, "Coerência", "https://www.youtube.com/embed/hA4ip53JcK8"], 
    [7, "Proposta de Intervenção", "https://www.youtube.com/embed/IzKWgBCe5Rs"], 
    [8, "Citação e Repertório", "https://www.youtube.com/embed/WUHfO8zx2bI"], 
    [9, "Análise de Temas", "https://www.youtube.com/embed/W3XrpIRTgzA"], 
    [10, "Erros Comuns", "https://www.youtube.com/embed/eKHQqsdjnOc"]
  ].map(([num, titulo, url], i, arr) => {
    const aula = criarAula(6, "redacao", num as number, arr.length, titulo as string, url as string);
    return [aula.id, aula];
  })),
};

export const getPrimeiraAula = (disciplinaId: number) => {
  const todasAulas = Object.values(BANCO_DE_AULAS);
  const aula = todasAulas
    .filter(a => a.disciplinaId === disciplinaId)
    .sort((a, b) => a.id.localeCompare(b.id))[0];
    
  return aula ? aula.id : null;
};

// playlist de aulas
export const getAulasPorDisciplina = (disciplinaId: number) => {
  return Object.values(BANCO_DE_AULAS)
    .filter(aula => aula.disciplinaId === disciplinaId)
    .sort((a, b) => a.id.localeCompare(b.id)); 
};