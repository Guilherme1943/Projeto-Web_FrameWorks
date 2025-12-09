"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Toaster, toast } from "sonner";

import { HeaderAcoes } from "@/components/widgets-anotacoes/header-acoes";
import { CardNota } from "@/components/widgets-anotacoes/card-nota";
import { ModalNota } from "@/components/widgets-anotacoes/modal-nota";
import { Nota } from "@/types/anotacoes";

const EXEMPLO_INICIAL: Nota = {
  id: "exemplo-1",
  titulo: "Bem-vindo às Anotações",
  postIt: {
    titulo: "Dicas rápidas",
    itens: ["Clique no + para criar", "Passe o mouse para editar", "Design minimalista"]
  },
  textoTitulo: "Organização Simples",
  textoCorpo: "Este sistema utiliza o armazenamento local do seu navegador. Seus Anotaçãos permanecem salvos aqui, prontos para sua próxima sessão de estudos.",
  dataCriacao: Date.now()
};

export default function PageAnotacoes() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notaParaEditar, setNotaParaEditar] = useState<Nota | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // carregar dados
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("conectaedu-notas");
    if (dadosSalvos) {
      setNotas(JSON.parse(dadosSalvos));
    } else {
      setNotas([EXEMPLO_INICIAL]);
    }
    setIsLoaded(true);
  }, []);

  // salvar dados
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("conectaedu-notas", JSON.stringify(notas));
    }
  }, [notas, isLoaded]);

  // handlers

  const handleAddClick = () => {
    setNotaParaEditar(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (nota: Nota) => {
    setNotaParaEditar(nota);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    // sooner 
    const notasAnteriores = [...notas];
    
    // remove anotação 
    setNotas((prev) => prev.filter((n) => n.id !== id));

    toast.success("Anotação removido", {
      description: "O item foi movido para a lixeira.",
      action: {
        label: "Desfazer",
        onClick: () => setNotas(notasAnteriores),
      },
    });
  };

  const handleClearAll = () => {
  
    toast("Apagar tudo?", {
      description: "Isso removerá permanentemente todas as suas anotações.",
      action: {
        label: "Confirmar",
        onClick: () => {
          setNotas([]);
          toast.success("Todas as anotações foram limpas.");
        }
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {}
      }
    });
  };

  const handleSaveNota = (dadosNota: Omit<Nota, "id" | "dataCriacao">) => {
    if (notaParaEditar) {
      setNotas((prev) => prev.map((n) => 
        n.id === notaParaEditar.id 
          ? { ...n, ...dadosNota } 
          : n
      ));
      toast.success("Anotação atualizado!");
    } else {
      const novaNota: Nota = {
        id: crypto.randomUUID(),
        dataCriacao: Date.now(),
        ...dadosNota
      };
      setNotas((prev) => [novaNota, ...prev]);
      toast.success("Anotação criado com sucesso!");
    }
  };

  if (!isLoaded) return <div className="min-h-full w-full bg-white" />;

  return (
    <div className="min-h-full w-full bg-white p-6 md:p-10 animate-in fade-in duration-700">
      {/* sooner notificação posicionado*/}
      <Toaster position="bottom-right" richColors />

      <HeaderAcoes 
        onAdd={handleAddClick} 
        onClearAll={handleClearAll} 
        totalNotas={notas.length} 
      />

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notas.map((nota) => (
          <CardNota 
            key={nota.id} 
            nota={nota} 
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
        
        {/* card maior de adicionar anotação*/}
        <button 
          onClick={handleAddClick}
          className="group border border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50/50 transition-all min-h-[280px]"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all mb-4">
             <Plus size={24} className="group-hover:scale-110 transition-transform text-slate-400 group-hover:text-slate-900" />
          </div>
          <span className="font-semibold text-sm">Criar novo</span>
        </button>
      </div>

      <ModalNota 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveNota}
        notaInicial={notaParaEditar}
      />

    </div>
  );
}