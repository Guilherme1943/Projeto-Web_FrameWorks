"use client";

import React, { useState, useEffect } from "react";
import { CardPrincipal } from "@/components/widgets-inicio/card-principal";
import { WidgetAgenda } from "@/components/widgets-inicio/agenda";
import { WidgetNotificacoes } from "@/components/widgets-inicio/notificacoes";
import { 
  GraficoProgresso, 
  GraficoAtividadeSemanal
} from "@/components/widgets-inicio/desempenho";
import { WidgetFaq } from "@/components/widgets-inicio/faq-retratil";
import { AulaAtual, EventoAgenda, NotificacaoItem, DadosDesempenho } from "@/types/inicio";
import { getProgressoGeral } from "@/lib/progresso";



// card de aula tela principal
const dadosAula: AulaAtual = {
  materia: "Matemática",
  titulo: "Introdução às Funções",
  modulo: "Módulo 1 • Aula 01",
  progresso: 0,
  tempoRestante: "15:30 restantes",
  aulaId: "matematica-01",
  imagem: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
};

// card de notificações
const dadosNotificacoes: NotificacaoItem[] = [
  { 
    id: 1, 
    titulo: "Nova Aula", 
    mensagem: "O módulo de Geometria Espacial foi liberado.", 
    tempo: "Há 1h", 
    tipo: "aula" 
  },
  { 
    id: 2, 
    titulo: "Aviso", 
    mensagem: "Manutenção programada na plataforma às 00h.", 
    tempo: "Há 5h", 
    tipo: "sistema" 
  }
];

export default function DashboardHome() {
  const [nomeUsuario, setNomeUsuario] = useState("Estudante");
  const [agendaDinamica, setAgendaDinamica] = useState<EventoAgenda[]>([]);
  const [performance, setPerformance] = useState<DadosDesempenho>({
    progressoGeral: 0,
    aulasConcluidas: 0,
    totalAulas: 0,
    mediaGeral: 0.0,
    atividadeSemanal: [0, 0, 0, 0, 0, 0, 0]
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // atualiza o nome de usuario ao trocar em /configuracoes
    const dadosConfig = localStorage.getItem("conectaedu-config");
    if (dadosConfig) {
      try {
        const config = JSON.parse(dadosConfig);
        const primeiroNome = config.nome ? config.nome.split(" ")[0] : "Estudante";
        setNomeUsuario(primeiroNome);
      } catch (e) { console.error("Erro config:", e); }
    }

    // carregar agenda do calendário 
    const dadosCalendario = localStorage.getItem("conectaedu-calendario");
    if (dadosCalendario) {
      try {
        const eventosRaw = JSON.parse(dadosCalendario);
        
        // filtra apenas eventos futuros ou de hoje
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const proximosEventos = eventosRaw
          .filter((evt: any) => {
            const dataEvento = new Date(evt.data + "T00:00:00");
            return dataEvento >= hoje;
          })
          .sort((a: any, b: any) => new Date(a.data).getTime() - new Date(b.data).getTime())
          .slice(0, 3)
          .map((evt: any) => {
            const dataObj = new Date(evt.data + "T00:00:00");
            const diaMes = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            
            return {
              id: evt.id,
              titulo: evt.titulo,
              horario: `${diaMes} • ${evt.horaInicio}`,
              tipo: evt.tipo
            };
          });

        setAgendaDinamica(proximosEventos);
      } catch (e) { console.error("Erro agenda:", e); }
    }

    // calcula o progresso real
    const stats = getProgressoGeral();
    setPerformance({
      progressoGeral: stats.porcentagem,
      aulasConcluidas: stats.concluidas,
      totalAulas: stats.total,
      mediaGeral: 0.0,
      atividadeSemanal: stats.concluidas > 0 ? [20, 40, 10, 50, 30, 0, 0] : [0, 0, 0, 0, 0, 0, 0]
    });

    setIsLoaded(true);
  }, []);

  // Evita renderização sem hidratação (flicker)
  if (!isLoaded) return <div className="min-h-full w-full bg-white" />;

  return (
    <div className="min-h-full w-full bg-white p-6 md:p-10 animate-in fade-in duration-700">
      
      {/* 1. Cabeçalho de Boas-vindas */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          Início
        </h1>
        <h2 className="text-xl text-slate-500 mt-2 font-medium">
          Vamos continuar sua jornada, {nomeUsuario}?
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        <div className="lg:col-span-8 flex flex-col">
          <CardPrincipal aula={dadosAula} />
        </div>

        {/*agenda e notificações - grid*/}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <WidgetAgenda eventos={agendaDinamica} />
          <WidgetNotificacoes notificacoes={dadosNotificacoes} />
        </div>
      </div>

      {/* card de meu desempenho*/}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Meu Desempenho</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <div className="h-full min-h-[250px]">
             <GraficoProgresso dados={performance} />
          </div>
          <div className="h-full min-h-[250px]">
             <GraficoAtividadeSemanal dados={performance.atividadeSemanal} />
          </div>
        </div>
      </div>

      {/* faq*/}
      <div className="w-full pb-8">
        <WidgetFaq />
      </div>

    </div>
  );
}