export interface ConteudoPostIt {
  titulo: string;
  itens: string[];
}

export interface Nota {
  id: string;
  titulo: string;
  postIt: ConteudoPostIt;
  textoTitulo: string;
  textoCorpo: string;
  dataCriacao: number;
}