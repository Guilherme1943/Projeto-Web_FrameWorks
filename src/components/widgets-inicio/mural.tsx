"use client";

import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvisoMural } from "@/types/inicio";

export function WidgetMural({ avisos }: { avisos: AvisoMural[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all flex-1 h-full">
      <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
            <Bell size={20} />
         </div>
         <h3 className="font-bold text-slate-900">Mural</h3>
      </div>
      <div className="space-y-4">
        {avisos.map((aviso) => (
          <div key={aviso.id} className={cn(
            "rounded-xl",
            aviso.tipo === "materia" ? "p-3 bg-gray-50 border border-gray-100" : "px-3"
          )}>
            {aviso.tipo === "materia" && (
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-blue-600">{aviso.titulo}</span>
                <span className="text-[10px] text-slate-400">{aviso.tempo}</span>
              </div>
            )}
            <p className="text-sm text-slate-700 font-medium">{aviso.mensagem}</p>
            {aviso.tipo === "sistema" && (
               <p className="text-[10px] text-slate-400 mt-1">{aviso.tempo} • Sistema</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}