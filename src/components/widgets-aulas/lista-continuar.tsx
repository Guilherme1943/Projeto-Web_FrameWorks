"use client";

import { PlayCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AulaRecente, CorDisciplina } from "@/types/aulas";
import { useRouter } from "next/navigation";

const mapCores: Record<CorDisciplina, string> = {
  azul: "text-blue-600 bg-blue-50",
  verde: "text-emerald-600 bg-emerald-50",
  laranja: "text-orange-600 bg-orange-50",
  roxo: "text-purple-600 bg-purple-50",
  vermelho: "text-red-600 bg-red-50",
  rosa: "text-pink-600 bg-pink-50",
  ciano: "text-cyan-600 bg-cyan-50",
};

export function ListaContinuar({ aulas }: { aulas: AulaRecente[] }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Clock size={20} className="text-slate-400" />
        Recentes
      </h3>

      <div className="space-y-1">
        {aulas.length === 0 ? (
          <p className="text-sm text-slate-400 italic">Nenhuma aula assistida recentemente.</p>
        ) : (
          aulas.map((aula) => (
            <div 
              key={aula.id} 
              onClick={() => router.push(`/assistir/${aula.aulaId}`)}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className={cn("p-2.5 rounded-lg shrink-0", mapCores[aula.cor])}>
                <PlayCircle size={20} fill="currentColor" className="opacity-20" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-500 uppercase mb-0.5">{aula.disciplina}</p>
                <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-700 transition-colors">
                  {aula.titulo}
                </h4>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  {aula.duracao} • {aula.status === "iniciado" ? "Em andamento" : "Não iniciado"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {aulas.length > 0 && (
        <button className="w-full mt-6 py-2 text-sm text-slate-500 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          Ver histórico completo
        </button>
      )}
    </div>
  );
}