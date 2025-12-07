"use client";

import React, { useEffect, useState } from "react";
import { Calculator, BookOpen, Globe, Landmark, Languages, PenTool } from "lucide-react";
import { HeaderFiltro } from "@/components/widgets-aulas/header-filtro";
import { CardDisciplina } from "@/components/widgets-aulas/card-disciplina";
import { ListaContinuar } from "@/components/widgets-aulas/lista-continuar";
import { Disciplina, AulaRecente } from "@/types/aulas";
import { getProgressoDisciplina, TOTAIS_POR_DISCIPLINA } from "@/lib/progresso";

// db das disciplinas
const DISCIPLINAS_BASE = [
  { id: 1, nome: "Matemática", descricao: "Álgebra, Geometria e Funções.", cor: "laranja", icone: Calculator },
  { id: 2, nome: "Português", descricao: "Gramática e Literatura.", cor: "azul", icone: BookOpen },
  { id: 3, nome: "História", descricao: "História do Brasil e Geral.", cor: "vermelho", icone: Landmark },
  { id: 4, nome: "Geografia", descricao: "Geopolítica e Física.", cor: "verde", icone: Globe },
  { id: 5, nome: "Inglês", descricao: "Vocabulary e Grammar.", cor: "roxo", icone: Languages },
  { id: 6, nome: "Redação", descricao: "Técnicas de escrita.", cor: "rosa", icone: PenTool }
];

export default function PageAulas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [aulasRecentes, setAulasRecentes] = useState<AulaRecente[]>([]);

  useEffect(() => {
    // calcula o progresso real 
    const disciplinasCalculadas = DISCIPLINAS_BASE.map((d) => {
      const stats = getProgressoDisciplina(d.id);
      return {
        ...d,
        progresso: stats.porcentagem,
        aulasConcluidas: stats.concluidas,
        totalAulas: stats.total,
      } as Disciplina;
    });

    setDisciplinas(disciplinasCalculadas);

    setAulasRecentes([]); 
  }, []);

  return (
    <div className="min-h-full w-full bg-white p-6 md:p-10 animate-in fade-in duration-700">
      <HeaderFiltro />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplinas.map((disciplina) => (
              <CardDisciplina key={disciplina.id} disciplina={disciplina} />
            ))}
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="sticky top-8">
            <ListaContinuar aulas={aulasRecentes} />
          </div>
        </div>
      </div>
    </div>
  );
}