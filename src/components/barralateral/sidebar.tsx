"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils"; 
import { configNavegacao } from "@/config/navegacao";

interface SidebarProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarProps) {
  // estado para saber se o mouse esta em cima da sidebar
  const [isHovered, setIsHovered] = useState(false);
  // hook para saber em qual pagina o usuario esta
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900 overflow-hidden">
      {/* container principal da barra lateral */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          "bg-gradient-to-b from-[#0A2A6B] to-[#061A3F]",
          "rounded-r-3xl shadow-2xl border-r border-white/5",
          isHovered ? "w-[280px]" : "w-[80px]"
        )}
      >
        {/* area do topo com a logo */}
        <div className="h-32 flex items-center justify-center relative w-full border-b border-white/10 shrink-0">
          {isHovered ? (
            // mostra isso quando o mouse esta em cima (aberto)
            <div className="w-full h-full px-6 flex items-center justify-center animate-in fade-in duration-300">
              <div className="relative w-full h-70">
                <Image 
                  src="/logobranca.png"
                  alt="logo conectaedu"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>
          ) : (
            // mostra isso quando o mouse nao esta em cima (fechado)
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300">
              <div className="p-3 rounded-xl bg-white/10 text-white shadow-inner">
                {/* icone da sidebar fechada*/}
                <GraduationCap size={28} strokeWidth={1.5} />
              </div>
            </div>
          )}
        </div>

        {/* lista de links de navegacao principal consumindo do arquivo de config */}
        <nav className="flex-1 flex flex-col gap-2 py-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {configNavegacao.menuPrincipal.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              isOpen={isHovered}
            />
          ))}
        </nav>

        {/* linha divisoria fina */}
        <div className="px-4">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* itens do rodape consumindo do arquivo de config */}
        <div className="py-6 flex flex-col gap-2">
          {configNavegacao.menuRodape.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              isOpen={isHovered}
            />
          ))}
        </div>
      </aside>

      {/* container do conteudo principal*/}
      <main
        className={cn(
          // largura total e animacao para empurrar conteudo
          "w-full min-h-screen transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          // margem esquerda dinamica
          isHovered ? "ml-[280px]" : "ml-[80px]"
        )}
      >
        <div className="w-full p-8"> 
            {children}
        </div>
      </main>
    </div>
  );
}

// componente para cada link individual do menu
function NavItem({ 
  item, 
  isActive, 
  isOpen 
}: { 

  item: { titulo: string; icone: any; href: string }; 
  isActive: boolean; 
  isOpen: boolean;
}) {
  const Icon = item.icone;

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center h-12 px-6 mx-3 rounded-xl transition-all duration-200 outline-none",
        // cor de fundo ao passar o mouse
        "hover:bg-white/10",
        // estilo se o link for a pagina atual
        isActive ? "bg-white/20 text-white shadow-sm" : "text-slate-300 hover:text-white"
      )}
    >
        {/* barrinha azul vertical indicando a pagina atual so aparece quando fechado */}
        {isActive && !isOpen && (
             <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-400 rounded-r-full" />
        )}

      {/* container do icone para alinhamento */}
      <div className="min-w-[24px] flex items-center justify-center">
        <Icon 
            size={22} 
            strokeWidth={1.5} 
            className={cn(
                "transition-transform duration-300", 
                isActive ? "scale-105" : "group-hover:scale-110"
            )} 
        />
      </div>

      {/* o texto do link esconde e move para a esquerda quando a sidebar fecha */}
      <span
        className={cn(
          "ml-4 font-medium text-sm tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300",
          isOpen 
            ? "opacity-100 translate-x-0 w-auto" 
            : "opacity-0 -translate-x-4 w-0"
        )}
      >
        {item.titulo}
      </span>
      
      {/* caixinha flutuante com o nome do link so aparece quando a sidebar esta fechada e passa o mouse */}
      {!isOpen && (
         <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
            {item.titulo}
         </div>
      )}
    </Link>
  );
}