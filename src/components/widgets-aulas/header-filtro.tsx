"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export function HeaderFiltro() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          Minhas Aulas
        </h1>
        <h2 className="text-xl text-slate-500 mt-2 font-medium">
          Gerencie seu aprendizado por disciplina.
        </h2>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Buscar matéria ou aula..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium"
          />
        </div>
        <button className="p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-slate-600 hover:text-slate-900 transition-all active:scale-95">
          <SlidersHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}