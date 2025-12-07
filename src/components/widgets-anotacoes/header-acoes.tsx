"use client";

import { Plus, Trash2, Sparkles } from "lucide-react";

interface HeaderAcoesProps {
  onAdd: () => void;
  onClearAll: () => void;
  totalNotas: number;
}

export function HeaderAcoes({ onAdd, onClearAll, totalNotas }: HeaderAcoesProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <div className="flex items-center gap-2 mb-1">
           <Sparkles size={16} className="text-blue-600" />
           <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Sua área de pensamentos</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Suas Anotações
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base max-w-lg leading-relaxed">
          Você tem <strong className="text-slate-900">{totalNotas}</strong> anotações. 
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/*botao excluir*/}
        {totalNotas > 0 && (
          <button 
            onClick={onClearAll}
            className="h-12 px-4 rounded-xl border border-gray-200 text-slate-600 text-sm font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center gap-2"
          >
            <Trash2 size={18} />
            <span className="hidden md:inline">Limpar</span>
          </button>
        )}

        {/* botao adicionar */}
        <button 
          onClick={onAdd}
          className="h-12 px-6 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center gap-2 font-semibold text-sm"
        >
          <Plus size={20} />
          Nova Anotação
        </button>
      </div>
    </div>
  );
}