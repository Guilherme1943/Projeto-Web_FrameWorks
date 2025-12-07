"use client";

import { Pencil, Trash2, CheckCircle2, ListTodo } from "lucide-react";
import { Nota } from "@/types/anotacoes";
import { cn } from "@/lib/utils";

interface CardNotaProps {
  nota: Nota;
  onEdit: (nota: Nota) => void;
  onDelete: (id: string) => void;
}

export function CardNota({ nota, onEdit, onDelete }: CardNotaProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      
      {/* barra superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* cabeçalho do Card */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-slate-900 text-lg leading-tight truncate pr-2" title={nota.titulo}>
          {nota.titulo}
        </h3>
        <div className="p-2 bg-slate-50 text-slate-400 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          <ListTodo size={18} />
        </div>
      </div>

      {/* area da Lista */}
      <div className="bg-gray-50/50 rounded-xl p-3 mb-4 border border-gray-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          {nota.postIt.titulo || "Checklist"}
        </p>
        <ul className="space-y-1.5">
          {nota.postIt.itens.slice(0, 3).map((item, index) => (
            <li key={index} className="text-xs text-slate-600 font-medium flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="truncate">{item}</span>
            </li>
          ))}
          {nota.postIt.itens.length > 3 && (
            <li className="text-[10px] text-slate-400 pl-5">
              + {nota.postIt.itens.length - 3} itens...
            </li>
          )}
        </ul>
      </div>

      {/* texto do corpo */}
      <div className="flex-1 min-h-[60px]">
        <h4 className="font-semibold text-slate-800 text-sm mb-1">
          {nota.textoTitulo}
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
          {nota.textoCorpo}
        </p>
      </div>

      {/* rodape */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
        <span className="text-[10px] text-slate-300 font-medium">
          {new Date(nota.dataCriacao).toLocaleDateString('pt-BR')}
        </span>
        
        <div className="flex gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(nota); }}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar"
          >
            <Pencil size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(nota.id); }}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}