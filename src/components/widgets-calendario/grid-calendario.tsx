"use client";

import { cn } from "@/lib/utils";
import { CalendarioEvento, CORES_EVENTOS } from "@/types/calendario";
import { Plus } from "lucide-react";

interface GridCalendarioProps {
  dataBase: Date;
  eventos: CalendarioEvento[];
  onDataClick: (dataIso: string) => void;
  onEventoClick: (evento: CalendarioEvento) => void;
}

export function GridCalendario({ dataBase, eventos, onDataClick, onEventoClick }: GridCalendarioProps) {
  const ano = dataBase.getFullYear();
  const mes = dataBase.getMonth();
  
  const gerarDias = () => {
    const dias = [];
    const primeiroDiaMes = new Date(ano, mes, 1);
    const ultimoDiaMes = new Date(ano, mes + 1, 0);
    const diaSemanaInicio = primeiroDiaMes.getDay(); 
    const totalDiasMes = ultimoDiaMes.getDate();

    const ultimoDiaMesAnt = new Date(ano, mes, 0).getDate();
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
      dias.push({ dia: ultimoDiaMesAnt - i, tipo: "prev", data: new Date(ano, mes - 1, ultimoDiaMesAnt - i) });
    }

    for (let i = 1; i <= totalDiasMes; i++) {
      dias.push({ dia: i, tipo: "curr", data: new Date(ano, mes, i) });
    }

    const slotsRestantes = 42 - dias.length;
    for (let i = 1; i <= slotsRestantes; i++) {
      dias.push({ dia: i, tipo: "next", data: new Date(ano, mes + 1, i) });
    }
    return dias;
  };

  const diasRenderizados = gerarDias();
  const hojeStr = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* cabeçalho Semanal */}
      <div className="grid grid-cols-7 border-b border-slate-100 bg-white shrink-0">
        {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"].map((d, i) => (
          <div key={i} className="py-3 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {d}
          </div>
        ))}
      </div>

      {/* grid principal */}
      <div className="grid grid-cols-7 grid-rows-6 flex-1">
        {diasRenderizados.map((d, idx) => {
          const dataIso = d.data.toISOString().split('T')[0];
          const isHoje = dataIso === hojeStr;
          const eventosDia = eventos.filter(e => e.data === dataIso);
          const isOut = d.tipo !== "curr";

          return (
            <div 
              key={idx}
              onClick={() => onDataClick(dataIso)}
              className={cn(
                "border-b border-r border-slate-100 p-2 relative group transition-all duration-200 cursor-pointer flex flex-col gap-1.5",
                isOut ? "bg-slate-50/30 text-slate-300" : "bg-white hover:bg-slate-50/50",
                idx % 7 === 6 && "border-r-0", 
                idx >= 35 && "border-b-0" 
              )}
            >
              {/* header do dia */}
              <div className="flex justify-between items-center px-1">
                <span className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium transition-all",
                  isHoje 
                    ? "bg-[#0A2A6B] text-white shadow-md shadow-blue-900/20 font-bold"
                    : isOut ? "text-inherit" : "text-slate-600"
                )}>
                  {d.dia}
                </span>
                
                {/* botão add*/}
                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded-md text-slate-400 transition-all duration-200">
                  <Plus size={14} />
                </button>
              </div>

              {/* lista de eventos */}
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                {eventosDia.map(evt => {
                  const estilo = CORES_EVENTOS[evt.tipo];
                  return (
                    <div 
                      key={evt.id}
                      onClick={(e) => { e.stopPropagation(); onEventoClick(evt); }}
                      className={cn(
                        "group/card px-2 py-1 rounded-md border text-[10px] font-semibold truncate flex items-center gap-1.5 transition-all duration-200 hover:brightness-95 hover:shadow-sm",
                        estilo.bg, estilo.text, estilo.border
                      )}
                      title={evt.titulo}
                    >
                      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", estilo.indicator)} />
                      <span className="truncate leading-tight">{evt.titulo}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}