"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, Lock, UserCog, FileText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function WidgetFaq() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (idx: number) => setActiveQuestion(activeQuestion === idx ? null : idx);

  const perguntas = [
    { icon: Lock, q: "Como recuperar meu acesso?", a: "Vá até a tela de login e clique em 'Esqueci minha senha'." },
    { icon: UserCog, q: "Como atualizar meus dados cadastrais?", a: "Acesse 'Configurações' > 'Perfil' para alterar seus dados." },
  { icon: FileText, q: "Como acessar minhas aulas?", a: "Para acessar as aulas, clique na opção correspondente na barra lateral do site." },
    { icon: MessageSquare, q: "Como acessar o calendário de estudos?", a: "Para acessar o calendário de estudos, selecione a opção “Calendário” na barra lateral do site." }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 ease-in-out hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors outline-none"
      >
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg transition-colors", isOpen ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-slate-500")}>
            <HelpCircle size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-900 text-lg">Central de Ajuda & Dúvidas</h3>
            <p className="text-sm text-slate-500">
               {isOpen ? "Clique para recolher" : "Dúvidas sobre acesso, cadastro ou aulas?"}
            </p>
          </div>
        </div>
        <div className={cn("p-2 rounded-full transition-transform duration-300", isOpen ? "rotate-180 bg-gray-100" : "")}>
          <ChevronDown size={20} className="text-slate-400" />
        </div>
      </button>

      <div className={cn("overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out", isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0")}>
        <div className="p-6 pt-0 border-t border-gray-100 bg-gray-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {perguntas.map((item, idx) => (
              <div 
                key={idx}
                className={cn(
                  "bg-white border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-md",
                  activeQuestion === idx ? "border-blue-200 shadow-sm" : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => toggleQuestion(idx)}
              >
                <div className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg transition-colors", activeQuestion === idx ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-slate-500")}>
                      <item.icon size={18} />
                    </div>
                    <span className={cn("font-bold text-sm transition-colors", activeQuestion === idx ? "text-blue-800" : "text-slate-700")}>
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown size={16} className={cn("text-slate-400 transition-transform duration-300", activeQuestion === idx ? "rotate-180 text-blue-500" : "")} />
                </div>
                <div className={cn("transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden bg-slate-50", activeQuestion === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="p-4 pt-0 text-sm text-slate-600 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}