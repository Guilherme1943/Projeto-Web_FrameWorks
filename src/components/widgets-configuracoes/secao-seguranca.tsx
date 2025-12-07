"use client";

import { Lock, ShieldCheck } from "lucide-react";

export function SecaoSeguranca() {
  return (
    <div className="max-w-2xl animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">Segurança da Conta</h2>
        <p className="text-sm text-slate-500 mt-1">Atualize sua senha e proteja seus dados.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3 mb-8">
        <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-800">Sua conta está protegida</h4>
          <p className="text-xs text-blue-600 mt-1">Nenhuma atividade suspeita detectada nos últimos 30 dias.</p>
        </div>
      </div>

      <form className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Senha Atual</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Nova Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Confirmar Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="button" className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
            Atualizar Senha
          </button>
        </div>
      </form>
    </div>
  );
}