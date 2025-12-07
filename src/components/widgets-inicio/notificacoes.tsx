"use client";

import { Bell, PlayCircle, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificacaoItem } from "@/types/inicio";

export function WidgetNotificacoes({ notificacoes }: { notificacoes: NotificacaoItem[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all flex-1 h-full">
      <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-red-50 rounded-lg text-red-600">
            <Bell size={20} />
         </div>
         <h3 className="font-bold text-slate-900">Notificações</h3>
      </div>
      
      <div className="space-y-4">
        {notificacoes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center opacity-50">
            <Bell size={32} className="text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-500">Nenhuma notificação nova.</p>
          </div>
        ) : (
          notificacoes.map((item) => (
            <div key={item.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-blue-50/50 transition-colors cursor-default">
              <div className="flex justify-between items-start mb-1">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                  item.tipo === "aula" ? "bg-blue-100 text-blue-700" :
                  item.tipo === "prova" ? "bg-red-100 text-red-700" :
                  "bg-slate-200 text-slate-600"
                )}>
                  {item.titulo}
                </span>
                <span className="text-[10px] text-slate-400">{item.tempo}</span>
              </div>
              <div className="flex gap-3 mt-2">
                <div className="mt-0.5 shrink-0">
                  {item.tipo === "aula" && <PlayCircle size={16} className="text-blue-500" />}
                  {item.tipo === "prova" && <AlertCircle size={16} className="text-red-500" />}
                  {(item.tipo === "material" || item.tipo === "sistema") && <FileText size={16} className="text-emerald-500" />}
                </div>
                <p className="text-sm text-slate-700 font-medium leading-snug">
                  {item.mensagem}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}