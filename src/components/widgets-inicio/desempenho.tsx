"use client";

import { Trophy, BarChart3, BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { DadosDesempenho } from "@/types/inicio";

export function GraficoProgresso({ dados }: { dados: DadosDesempenho }) {
  const raio = 56;
  const circunferencia = 2 * Math.PI * raio;
  const offset = circunferencia - (dados.progressoGeral / 100) * circunferencia;

  return (
    <div className="h-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-md transition-all">
       <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
         <Trophy size={100} />
       </div>
       
       <div className="relative w-32 h-32 mb-4">
         <svg className="w-full h-full transform -rotate-90">
           <circle cx="64" cy="64" r={raio} stroke="#f1f5f9" strokeWidth="10" fill="none" />
           <circle 
            cx="64" 
            cy="64" 
            r={raio} 
            stroke="#2563eb" 
            strokeWidth="10" 
            fill="none" 
            strokeDasharray={circunferencia} 
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
         </svg>
         <div className="absolute inset-0 flex flex-col items-center justify-center">
           <span className="text-3xl font-bold text-slate-900">{dados.progressoGeral}%</span>
         </div>
      </div>
      <div className="w-full mt-2 text-center">
         <p className="text-sm font-medium text-slate-600">Geral do Curso</p>
         <p className="text-xs text-slate-400 mt-1">
            {dados.aulasConcluidas}/{dados.totalAulas} aulas concluídas
         </p>
      </div>
    </div>
  );
}

// gráfico semanal
export function GraficoAtividadeSemanal({ dados }: { dados: number[] }) {
  const dias = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  return (
    <div className="h-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col hover:shadow-md transition-all">
       <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={20} className="text-slate-400" />
          <h3 className="font-bold text-slate-900">Estudos na Semana</h3>
       </div>
       
       {dados.every(d => d === 0) ? (
         <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 pb-4">
            <div className="w-full h-24 flex items-end justify-between gap-2 px-2 mb-2 opacity-30">
               {[20, 40, 30, 50, 20, 60, 40].map((h, i) => (
                 <div key={i} className="w-full bg-slate-100 rounded-t-md" style={{ height: `${h}%` }} />
               ))}
            </div>
            <p className="text-xs font-medium text-slate-500">Nenhuma atividade registrada ainda.</p>
         </div>
       ) : (
         <div className="flex-1 flex items-end justify-between gap-2 px-2">
            {dados.map((altura, index) => (
              <div key={index} className="flex flex-col items-center gap-2 w-full group">
                <div className="w-full relative h-32 flex items-end justify-center">
                    <div 
                      className="w-full bg-slate-100 rounded-t-md group-hover:bg-blue-600 transition-all duration-500 relative"
                      style={{ height: `${altura === 0 ? 5 : altura}%` }}
                    />
                </div>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                  {dias[index]}
                </span>
              </div>
            ))}
         </div>
       )}
    </div>
  );
}