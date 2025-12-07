"use client";

import Link from "next/link";
import { PlayCircle, CheckCircle2, Lock, ListVideo } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoAula } from "@/data/conteudo-aulas";
import { isAulaConcluida } from "@/lib/progresso";
import { useState, useEffect } from "react";

interface PlaylistAulasProps {
  aulaAtual: VideoAula;
  todasAulas: VideoAula[];
}

export function PlaylistAulas({ aulaAtual, todasAulas }: PlaylistAulasProps) {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const handleStorage = () => setUpdateTrigger(prev => prev + 1);
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full max-h-[600px]">
      
      {/* cabeçalho da playlist */}
      <div className="p-4 border-b border-gray-100 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
            <ListVideo size={18} />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Conteúdo do Módulo</h3>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-gray-200">
          {todasAulas.length} Aulas
        </span>
      </div>

      {/* lista */}
      <div className="overflow-y-auto custom-scrollbar p-2 space-y-1">
        {todasAulas.map((aula, index) => {
          const isCurrent = aula.id === aulaAtual.id;
          const isConcluida = isAulaConcluida(aula.id);

          return (
            <Link 
              href={`/assistir/${aula.id}`} 
              key={aula.id}
              className={cn(
                "group flex items-start gap-3 p-3 rounded-xl transition-all border",
                isCurrent 
                  ? "bg-blue-50 border-blue-200 shadow-sm" 
                  : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100"
              )}
            >
              {/* icone de aula concluida */}
              <div className="mt-0.5 shrink-0">
                {isCurrent ? (
                  <PlayCircle size={18} className="text-blue-600 animate-pulse" />
                ) : isConcluida ? (
                  <CheckCircle2 size={18} className="text-green-500" />
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300 group-hover:border-slate-400" />
                )}
              </div>

              {/* info */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-xs font-bold mb-0.5 truncate",
                  isCurrent ? "text-blue-700" : isConcluida ? "text-slate-600" : "text-slate-700"
                )}>
                  {index + 1}. {aula.titulo}
                </p>
                <p className="text-[10px] text-slate-400 font-medium flex items-center gap-2">
                  {aula.duracao} min
                  {isConcluida && <span className="text-green-600 bg-green-50 px-1.5 rounded">Visto</span>}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}