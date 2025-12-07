"use client";

import { useState, useEffect } from "react";
import { X, Clock, Calendar as CalIcon, AlignLeft, Trash2, Check } from "lucide-react";
import { CalendarioEvento, TipoEvento, CORES_EVENTOS } from "@/types/calendario";
import { cn } from "@/lib/utils";

interface ModalEventoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evento: Omit<CalendarioEvento, "id">) => void;
  onDelete?: (id: string) => void;
  eventoInicial?: CalendarioEvento | null;
  dataPreSelecionada?: string;
}

export function ModalEvento({ isOpen, onClose, onSave, onDelete, eventoInicial, dataPreSelecionada }: ModalEventoProps) {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState<TipoEvento>("aula");
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("09:00");
  const [horaFim, setHoraFim] = useState("10:00");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (eventoInicial) {
      setTitulo(eventoInicial.titulo);
      setTipo(eventoInicial.tipo);
      setData(eventoInicial.data);
      setHoraInicio(eventoInicial.horaInicio);
      setHoraFim(eventoInicial.horaFim);
      setDescricao(eventoInicial.descricao || "");
    } else {
      setTitulo("");
      setTipo("aula");
      setData(dataPreSelecionada || new Date().toISOString().split('T')[0]);
      setHoraInicio("09:00");
      setHoraFim("10:00");
      setDescricao("");
    }
  }, [eventoInicial, dataPreSelecionada, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ titulo, tipo, data, horaInicio, horaFim, descricao });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl shadow-slate-900/10 animate-in zoom-in-95 duration-300 overflow-hidden border border-white/50">
        
        {/* header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-lg font-bold text-slate-800">
            {eventoInicial ? "Editar Evento" : "Novo Evento"}
          </h2>
          <div className="flex gap-2">
            {eventoInicial && onDelete && (
              <button onClick={() => onDelete(eventoInicial.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            )}
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Título</label>
            <input 
              type="text" 
              value={titulo} 
              onChange={e => setTitulo(e.target.value)}
              className="w-full text-lg font-semibold text-slate-800 border-b-2 border-slate-100 focus:border-blue-600 py-1 outline-none transition-colors placeholder:text-slate-300"
              placeholder="Ex: Aula de Matemática"
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categoria</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(CORES_EVENTOS).map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTipo(key as TipoEvento)}
                  className={cn(
                    "text-[10px] font-bold py-2 px-2 rounded-lg border transition-all truncate flex items-center justify-center gap-1.5",
                    tipo === key 
                      ? cn(val.bg, val.text, val.border, "ring-2 ring-offset-1 ring-slate-200 shadow-sm") 
                      : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", val.indicator)} />
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                <CalIcon size={14} /> Data
              </label>
              <input 
                type="date" 
                value={data} 
                onChange={e => setData(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                <Clock size={14} /> Horário
              </label>
              <div className="flex gap-2 items-center">
                <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 font-medium" required />
                <span className="text-slate-300">-</span>
                <input type="time" value={horaFim} onChange={e => setHoraFim(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 font-medium" required />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
              <AlignLeft size={14} /> Detalhes
            </label>
            <textarea 
              value={descricao} 
              onChange={e => setDescricao(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 resize-none h-24 transition-all"
              placeholder="Adicione links, anotações ou detalhes importantes..."
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-slate-50 mt-4">
            <button 
                type="button" 
                onClick={onClose} 
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 transition-colors"
            >
                Cancelar
            </button>
            <button 
                type="submit" 
                className="bg-[#0A2A6B] text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#061A3F] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <Check size={16} /> Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}