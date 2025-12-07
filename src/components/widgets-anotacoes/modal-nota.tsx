"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, ListTodo, AlignLeft, GripVertical } from "lucide-react";
import { Nota } from "@/types/anotacoes";

interface ModalNotaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (nota: Omit<Nota, "id" | "dataCriacao">) => void;
  notaInicial?: Nota | null;
}

export function ModalNota({ isOpen, onClose, onSave, notaInicial }: ModalNotaProps) {
  const [titulo, setTitulo] = useState("");
  const [postItItens, setPostItItens] = useState<string[]>([]);
  const [textoCorpo, setTextoCorpo] = useState("");
  const [novoItem, setNovoItem] = useState("");
  const [textoTitulo, setTextoTitulo] = useState("");

  useEffect(() => {
    if (notaInicial) {
      setTitulo(notaInicial.titulo);
      setPostItItens(notaInicial.postIt.itens);
      setTextoTitulo(notaInicial.textoTitulo);
      setTextoCorpo(notaInicial.textoCorpo);
    } else {
      setTitulo("");
      setPostItItens([]);
      setTextoTitulo("");
      setTextoCorpo("");
    }
    setNovoItem("");
  }, [notaInicial, isOpen]);

  if (!isOpen) return null;

  const handleAddItem = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    if (novoItem.trim()) {
      setPostItItens([...postItItens, novoItem.trim()]);
      setNovoItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    setPostItItens(postItItens.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      titulo: titulo || "Sem Título",
      postIt: {
        titulo: "Checklist",
        itens: postItItens
      },
      textoTitulo: textoTitulo || "Detalhes",
      textoCorpo: textoCorpo || ""
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">

      <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[85vh] border border-gray-100/50">
        
        {/* cabeçalho*/}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {notaInicial ? "Editar" : "Nova Anotação"}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* formulário*/}
        <div className="overflow-y-auto p-5 custom-scrollbar bg-gray-50/30">
          <form id="nota-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* título principal */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Título</label>
              <input 
                type="text" 
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Fórmula de Bhaskara"
                className="w-full text-base font-semibold placeholder:text-slate-400 border border-gray-200 rounded-xl px-3 py-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white shadow-sm"
                autoFocus
              />
            </div>

            {/* checklist */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-blue-50 text-blue-600 rounded-md">
                  <ListTodo size={14} />
                </div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Checklist</span>
              </div>
              
              <ul className="space-y-1.5 mb-3">
                {postItItens.map((item, idx) => (
                  <li key={idx} className="group flex items-center gap-2 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100 transition-all hover:border-blue-200 hover:bg-blue-50/30">
                    <GripVertical size={14} className="text-slate-300 cursor-grab" />
                    <span className="truncate text-xs text-slate-700 font-medium flex-1">{item}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveItem(idx)}
                      className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={novoItem}
                  onChange={(e) => setNovoItem(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddItem(e)}
                  placeholder="Novo item..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
                <button 
                  type="button" 
                  onClick={handleAddItem}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm active:scale-95"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* subtítulo */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  Detalhes
                </label>
                <input 
                  type="text" 
                  value={textoTitulo}
                  onChange={(e) => setTextoTitulo(e.target.value)}
                  placeholder="Subtítulo (Opcional)"
                  className="w-full text-xs font-medium text-slate-700 placeholder:text-slate-400 border border-gray-200 rounded-xl px-3 py-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white shadow-sm"
                />
              </div>
              
              <div>
                <textarea 
                  value={textoCorpo}
                  onChange={(e) => setTextoCorpo(e.target.value)}
                  placeholder="Escreva os detalhes aqui..."
                  rows={3}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none shadow-sm"
                />
              </div>
            </div>

          </form>
        </div>

        {/* rodapé*/}
        <div className="px-5 py-3 border-t border-gray-100 bg-white flex justify-end gap-2 shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            form="nota-form"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
}