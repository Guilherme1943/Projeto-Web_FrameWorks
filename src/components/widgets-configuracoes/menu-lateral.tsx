"use client";

import { User, Bell, Lock, Monitor, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type AbaSettings = "perfil" | "notificacoes" | "seguranca" | "aparencia";

interface MenuLateralProps {
  abaAtiva: AbaSettings;
  aoMudarAba: (aba: AbaSettings) => void;
}

export function MenuLateral({ abaAtiva, aoMudarAba }: MenuLateralProps) {
  const router = useRouter(); 

  const handleLogout = () => {

    router.push("/"); // Redireciona para a tela de login
  };

  const itens = [
    { id: "perfil", label: "Meu Perfil", icon: User },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "seguranca", label: "Segurança", icon: Lock },
    { id: "aparencia", label: "Aparência", icon: Monitor },
  ];

  return (
    <nav className="flex flex-col gap-1 w-full md:w-64 shrink-0">
      {itens.map((item) => {
        const Icon = item.icon;
        const ativo = abaAtiva === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => aoMudarAba(item.id as AbaSettings)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200",
              ativo 
                ? "bg-slate-100 text-[#0A2A6B]" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            )}
          >
            <Icon size={18} strokeWidth={ativo ? 2.5 : 2} />
            {item.label}
          </button>
        );
      })}

      <div className="my-4 h-[1px] bg-slate-100 w-full" />

      <button 
        onClick={handleLogout} 
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors text-left w-full"
      >
        <LogOut size={18} />
        Sair da conta
      </button>
    </nav>
  );
}