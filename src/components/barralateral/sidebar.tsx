"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  NotebookPen, 
  Settings, 
  LogOut, 
  GraduationCap 
} from "lucide-react";
import { cn } from "@/lib/utils"; 

const mainNavItems = [
  { label: "Início", icon: Home, href: "/inicio" },
  { label: "Aulas", icon: BookOpen, href: "/aulas" },
  { label: "Calendário", icon: Calendar, href: "/calendario" },
  { label: "Anotações", icon: NotebookPen, href: "/anotacoes" },
];

const footerNavItems = [
  { label: "Configurações", icon: Settings, href: "/configuracoes" },
  { label: "Sair", icon: LogOut, href: "/sair" },
];

interface SidebarProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarProps) {
  // estado para saber se o mouse está em cima da sidebar
  const [isHovered, setIsHovered] = useState(false);
  // hook para saber em qual página o usuário está
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900 overflow-hidden">
      {/* container principal da sidebar*/}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          // posição fixa abrir e fechar
          "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          // degrade conectaedu
          "bg-gradient-to-b from-[#0A2A6B] to-[#061A3F]",
          // arrendonda as bordas
          "rounded-r-3xl shadow-2xl border-r border-white/5",
          // muda a largura dependendo se o mouse está em cima
          isHovered ? "w-[280px]" : "w-[80px]"
        )}
      >
        {/* logo conectaedu do topo*/}
        <div className="h-35 flex items-center justify-center relative w-full border-b border-white/10 shrink-0">
          {isHovered ? (
   
            <div className="w-full h-full px-6 flex items-center justify-center animate-in fade-in duration-300">
              <div className="relative w-full h-70">
                 {/* logo conectaedu*/}
                <Image 
                  src="/logobranca.png"
                  alt="Logo"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>
          ) : (
            // mostra isso quando o mouse não está em cima (fechado)
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300">
              <div className="p-3 rounded-xl bg-white/10 text-white shadow-inner">
                 {/* Ícone de chapeu quando fechado */}
                <GraduationCap size={28} strokeWidth={1.5} />
              </div>
            </div>
          )}
        </div>

        {/* lista de links*/}
        <nav className="flex-1 flex flex-col gap-2 py-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              isOpen={isHovered}
            />
          ))}
        </nav>

        {/* linha divisória*/}
        <div className="px-4">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* itens do rodape */}
        <div className="py-6 flex flex-col gap-2">
          {footerNavItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              isOpen={isHovered}
            />
          ))}
        </div>
      </aside>

      {/* container do conteúdo principal da página. Empurra o conteúdo para a direita quando a sidebar abre */}
      <main
        className={cn(
          "flex-1 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          // Ajusta a margem esquerda baseado na largura da sidebar.
          isHovered ? "ml-[280px]" : "ml-[80px]"
        )}
      >
        <div className="p-8 w-full max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}

// componente menor para cada link individual do menu.
function NavItem({ 
  item, 
  isActive, 
  isOpen 
}: { 
  item: { label: string; icon: any; href: string }; 
  isActive: boolean; 
  isOpen: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center h-12 px-6 mx-3 rounded-xl transition-all duration-200 outline-none",
        // cor de fundo ao passar o mouse
        "hover:bg-white/10",
        // estilo se o link for a página atual
        isActive ? "bg-white/20 text-white shadow-sm" : "text-slate-300 hover:text-white"
      )}
    >
        {/* barra azul vertical indicando a página atual (aparece fechado) */}
        {isActive && !isOpen && (
             <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-400 rounded-r-full" />
        )}

      {/* container ícone para manter alinhamento */}
      <div className="min-w-[24px] flex items-center justify-center">
        <Icon 
            size={22} 
            strokeWidth={1.5} 
            className={cn(
                "transition-transform duration-300", 
                // aumenta o ícone ao passar o mouse.
                isActive ? "scale-105" : "group-hover:scale-110"
            )} 
        />
      </div>

      {/* texto do link expandido */}
      <span
        className={cn(
          "ml-4 font-medium text-sm tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300",
          isOpen 
            ? "opacity-100 translate-x-0 w-auto" 
            : "opacity-0 -translate-x-4 w-0"
        )}
      >
        {item.label}
      </span>
      
      {/* caixa flutuante*/}
      {!isOpen && (
         <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
            {item.label}
         </div>
      )}
    </Link>
  );
}