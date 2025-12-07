"use client";

import { useState } from "react";
import { Camera, User, Mail, Save } from "lucide-react";
import { UsuarioConfig } from "@/types/configuracoes";

interface SecaoPerfilProps {
  dados: UsuarioConfig;
  aoSalvar: (novosDados: Partial<UsuarioConfig>) => void;
}

export function SecaoPerfil({ dados, aoSalvar }: SecaoPerfilProps) {
  const [form, setForm] = useState({
    nome: dados.nome,
    email: dados.email,
    bio: dados.bio,
    cargo: dados.cargo
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    aoSalvar(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">Meu Perfil</h2>
        <p className="text-sm text-slate-500 mt-1">Gerencie suas informações pessoais e como elas aparecem.</p>
      </div>

      {/* avatar */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden">
            <User size={40} />
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={24} className="text-white" />
          </div>
        </div>
        <div>
          <button type="button" className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            Alterar foto
          </button>
          <p className="text-xs text-slate-400 mt-2">JPG ou PNG até 2MB.</p>
        </div>
      </div>

      {/* campo de preenchimento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={form.nome}
              onChange={(e) => setForm({...form, nome: e.target.value})}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">E-mail</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="email" 
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Biografia / Objetivo</label>
          <textarea 
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({...form, bio: e.target.value})}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none"
            placeholder="Conte um pouco sobre seus objetivos de estudo..."
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button 
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-[#0A2A6B] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/10 hover:bg-[#061A3F] transition-all hover:scale-105 active:scale-95"
        >
          <Save size={18} />
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}