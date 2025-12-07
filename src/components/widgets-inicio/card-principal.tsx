"use client";

import { Play, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AulaAtual } from "@/types/inicio";

export function CardPrincipal({ aula }: { aula: AulaAtual }) {
  const router = useRouter();

  const handleContinuar = () => {
    if (aula.aulaId) {
      router.push(`/assistir/${aula.aulaId}`);
    }
  };

  return (
    <div className="h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-all duration-300">
      
      {/*imagem card de materia) */}
      <div className="w-full md:w-1/3 relative min-h-[200px] md:min-h-full bg-slate-100">
        
        
        {aula.imagem ? (
          <img 
            src={aula.imagem} 
            alt={aula.titulo}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
        )}
        
        
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

        {/* botao do play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            onClick={handleContinuar}
            className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform cursor-pointer hover:bg-white"
          >
            <Play size={24} className="text-blue-700 ml-1" fill="currentColor" />
          </button>
        </div>

        {/*tempo de aula */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-black/60 text-white text-xs font-bold rounded-lg backdrop-blur-md border border-white/10">
            {aula.tempoRestante}
          </span>
        </div>
      </div>

      {/* conteudo da direita */}
      <div className="flex-1 p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Aula Atual</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
            {aula.materia}: {aula.titulo}
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            {aula.modulo}
          </p>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Progresso</span>
            <span>{aula.progresso}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-slate-900 rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
              style={{ width: `${aula.progresso}%` }}
            >
               <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleContinuar}
              className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Continuar Aula <ArrowRight size={16} />
            </button>
            <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-slate-600 transition-colors" title="Marcar como visto">
              <CheckCircle2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}