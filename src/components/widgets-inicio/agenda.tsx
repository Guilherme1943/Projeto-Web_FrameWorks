"use client";

import Link from "next/link";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventoAgenda } from "@/types/inicio";

const coresAgenda: Record<string, string> = {
  aula: "bg-blue-200 group-hover:bg-blue-500",
  prova: "bg-red-200 group-hover:bg-red-500",
  entrega: "bg-orange-200 group-hover:bg-orange-500",
  mentoria: "bg-purple-200 group-hover:bg-purple-500",
  live: "bg-cyan-200 group-hover:bg-cyan-500",
  estudo: "bg-slate-200 group-hover:bg-slate-500",
  padrao: "bg-gray-200 group-hover:bg-gray-400"
};

export function WidgetAgenda({ eventos }: { eventos: EventoAgenda[] }) {
  const hoje = new Date().getDate();

  return (
    <Link 
      href="/calendario"
      className="block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all group hover:border-blue-200 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-100 transition-colors">
            <CalendarIcon size={20} />
          </div>
          <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Agenda</h3>
        </div>
        
        <div className="flex flex-col items-center bg-gray-50 px-3 py-1 rounded-lg border border-gray-100 group-hover:border-purple-200 transition-colors">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Hoje</span>
          <span className="text-lg font-bold text-slate-900 leading-none">{hoje}</span>
        </div>
      </div>

      <div className="space-y-4">
        {eventos.length === 0 ? (
          <div className="text-center py-4 opacity-50">
            <p className="text-sm font-medium text-slate-500">Sem eventos próximos.</p>
          </div>
        ) : (
          eventos.map((evento) => {
            
            const corBarra = coresAgenda[evento.tipo] || coresAgenda.padrao;

            return (
              <div key={evento.id} className="flex gap-4 items-start">
                <div className={cn(
                  "w-1 rounded-full h-10 transition-colors shrink-0",
                  corBarra
                )} />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-purple-700 transition-colors truncate">
                    {evento.titulo}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 capitalize">
                    {evento.horario}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
         <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
            Ver calendário completo <ArrowRight size={12} />
         </span>
      </div>
    </Link>
  );
}