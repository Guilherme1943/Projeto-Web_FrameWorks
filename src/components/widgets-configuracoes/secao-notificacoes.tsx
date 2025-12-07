"use client";

import { useState } from "react";
import { UsuarioConfig } from "@/types/configuracoes";
import { cn } from "@/lib/utils";

interface SecaoNotificacoesProps {
  dados: UsuarioConfig;
  aoSalvar: (novasPrefs: Partial<UsuarioConfig['notificacoes']>) => void;
}

export function SecaoNotificacoes({ dados, aoSalvar }: SecaoNotificacoesProps) {
  const [prefs, setPrefs] = useState(dados.notificacoes);

  const toggle = (key: keyof typeof prefs) => {
    const novoEstado = { ...prefs, [key]: !prefs[key] };
    setPrefs(novoEstado);
    aoSalvar(novoEstado);
  };

  return (
    <div className="max-w-2xl animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">Preferências de Notificação</h2>
        <p className="text-sm text-slate-500 mt-1">Escolha como e quando você quer ser avisado.</p>
      </div>

      <div className="space-y-6">
        
        {/* Grupo Email */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Por E-mail</h3>
          <div className="space-y-6">
            <ItemSwitch 
              label="Novas aulas e materiais"
              desc="Receba um resumo quando novos conteúdos forem adicionados."
              checked={prefs.emailAulas}
              onChange={() => toggle('emailAulas')}
            />
            <div className="h-[1px] bg-slate-100 w-full" />
            <ItemSwitch 
              label="Dicas e Marketing"
              desc="Novidades sobre a plataforma e dicas de estudo."
              checked={prefs.emailMarketing}
              onChange={() => toggle('emailMarketing')}
            />
          </div>
        </div>

        {/* area de notificacoes */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Notificações Push</h3>
          <div className="space-y-6">
            <ItemSwitch 
              label="Lembretes de Estudo"
              desc="Avisos sobre horários agendados e prazos próximos."
              checked={prefs.pushLembretes}
              onChange={() => toggle('pushLembretes')}
            />
            <div className="h-[1px] bg-slate-100 w-full" />
            <ItemSwitch 
              label="Respostas de Mentoria"
              desc="Saiba imediatamente quando um professor responder sua dúvida."
              checked={prefs.pushMentoria}
              onChange={() => toggle('pushMentoria')}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function ItemSwitch({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-bold text-slate-800 text-sm">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
      </div>
      <button 
        onClick={onChange}
        className={cn(
          "w-12 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0",
          checked ? "bg-[#0A2A6B]" : "bg-slate-200"
        )}
      >
        <div className={cn(
          "w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )} />
      </button>
    </div>
  );
}