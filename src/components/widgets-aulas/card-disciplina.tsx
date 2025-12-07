"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Disciplina, CorDisciplina } from "@/types/aulas";
import { useRouter } from "next/navigation";
import { getPrimeiraAula } from "@/data/conteudo-aulas";

// mapa de estilos
const estilos: Record<CorDisciplina, { bg: string, text: string, bar: string, border: string }> = {
  azul: { bg: "bg-blue-50", text: "text-blue-700", bar: "bg-blue-600", border: "group-hover:border-blue-200" },
  verde: { bg: "bg-emerald-50", text: "text-emerald-700", bar: "bg-emerald-600", border: "group-hover:border-emerald-200" },
  laranja: { bg: "bg-orange-50", text: "text-orange-700", bar: "bg-orange-600", border: "group-hover:border-orange-200" },
  roxo: { bg: "bg-purple-50", text: "text-purple-700", bar: "bg-purple-600", border: "group-hover:border-purple-200" },
  vermelho: { bg: "bg-red-50", text: "text-red-700", bar: "bg-red-600", border: "group-hover:border-red-200" },
  rosa: { bg: "bg-pink-50", text: "text-pink-700", bar: "bg-pink-600", border: "group-hover:border-pink-200" },
  ciano: { bg: "bg-cyan-50", text: "text-cyan-700", bar: "bg-cyan-600", border: "group-hover:border-cyan-200" },
};

export function CardDisciplina({ disciplina }: { disciplina: Disciplina }) {
  const router = useRouter();
  const estilo = estilos[disciplina.cor];
  const Icone = disciplina.icone;

  const handleContinuar = () => {
    // abre primeira aula da materia
    const primeiraAulaId = getPrimeiraAula(disciplina.id);
    
    if (primeiraAulaId) {
      router.push(`/assistir/${primeiraAulaId}`);
    }
        
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm transition-all duration-300 group hover:shadow-md cursor-pointer flex flex-col justify-between h-full",
      estilo.border
    )}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-3 rounded-xl transition-colors", estilo.bg, estilo.text)}>
            <Icone size={24} />
          </div>
          <span className="text-xs font-bold text-slate-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            {disciplina.totalAulas} Aulas
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
          {disciplina.nome}
        </h3>
        <p className="text-sm text-slate-500 mb-6 line-clamp-2">
          {disciplina.descricao}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
          <span>{disciplina.progresso}% Concluído</span>
          <span>{disciplina.aulasConcluidas}/{disciplina.totalAulas}</span>
        </div>
        
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
          <div 
            className={cn("h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-out", estilo.bar)}
            style={{ width: `${disciplina.progresso}%` }}
          />
        </div>

        <button 
          onClick={handleContinuar}
          className="w-full py-2.5 rounded-xl border border-gray-200 text-slate-600 text-sm font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2 group/btn"
        >
          Continuar
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}