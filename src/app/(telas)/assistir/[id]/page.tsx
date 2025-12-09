"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// import de logica e db
import { BANCO_DE_AULAS, VideoAula, getAulasPorDisciplina } from "@/data/conteudo-aulas";
import { isAulaConcluida, toggleAulaVista } from "@/lib/progresso";

// import de playlist 
import { PlaylistAulas } from "@/components/widgets-player/playlist-aulas";

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const aulaId = params.id as string;
  
  const [aula, setAula] = useState<VideoAula | null>(null);
  const [listaAulas, setListaAulas] = useState<VideoAula[]>([]); // Estado para a playlist
  const [concluida, setConcluida] = useState(false);

  useEffect(() => {
    const dadosAula = BANCO_DE_AULAS[aulaId];
    if (dadosAula) {
      setAula(dadosAula);
      setConcluida(isAulaConcluida(aulaId));
      
      // inicia a playlist da materia atual
      const playlist = getAulasPorDisciplina(dadosAula.disciplinaId);
      setListaAulas(playlist);
    } else {
      router.push("/aulas");
    }
  }, [aulaId, router]);

  const handleToggleConcluida = () => {
    const novoStatus = toggleAulaVista(aulaId);
    setConcluida(novoStatus);
    if (novoStatus) {
      toast.success("Aula concluída!", { description: "Progresso salvo." });
    }
  };

  if (!aula) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white flex flex-col xl:flex-row">
      
      {/* area de video */}
      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 evita overflow flex */}
        
        {/* header*/}
        <div className="h-16 border-b border-slate-100 flex items-center px-6 justify-between shrink-0 bg-white sticky top-0 z-20">
          <Link href="/aulas" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ChevronLeft size={20} /> Voltar
          </Link>
          <h1 className="text-sm font-bold text-slate-900 truncate max-w-md hidden md:block">
            {aula.titulo}
          </h1>
        </div>

        {/* player*/}
        <div className="w-full bg-black aspect-video relative group shadow-lg">
          <iframe 
            src={aula.videoUrl} 
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* informações da aula*/}
        <div className="p-6 md:p-8 max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex-1">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-wider">
                Módulo 01
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{aula.titulo}</h2>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">{aula.descricao}</p>
            </div>
            
            <div className="flex gap-3 shrink-0 w-full md:w-auto">
              <button 
                onClick={handleToggleConcluida}
                className={cn(
                  "flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 border",
                  concluida 
                    ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                )}
              >
                <CheckCircle2 size={18} className={concluida ? "fill-green-600 text-white" : ""} />
                {concluida ? "Concluída" : "Marcar vista"}
              </button>
              
              {aula.proximaAulaId && (
                <Link 
                  href={`/assistir/${aula.proximaAulaId}`}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#0A2A6B] text-white rounded-xl font-bold text-sm hover:bg-[#061A3F] transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                >
                  Próxima <ChevronRight size={18} />
                </Link>
              )}
            </div>
          </div>

          <div className="h-[1px] bg-slate-100 w-full mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* infomações extras */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MessageSquare size={20} className="text-orange-500" />
                    Dúvidas Comuns
                  </h3>
                  <div className="space-y-4">
                    <div className="text-sm">
                      <p className="font-bold text-slate-700 mb-1">Preciso assistir na ordem?</p>
                      <p className="text-slate-500">Recomendamos seguir a sequência para melhor entendimento, mas você é livre para pular tópicos.</p>
                    </div>
                    <button className="text-blue-600 text-sm font-bold hover:underline mt-2">
                      
                    </button>
                  </div>
               </div>
            </div>

            <div className="hidden xl:block">

            </div>

          </div>
        </div>
      </div>

      {/*sidebar da playlist*/}
      <div className="w-full xl:w-96 border-l border-slate-100 bg-gray-50/50 xl:h-screen sticky top-0 overflow-hidden flex flex-col shrink-0">
        <div className="p-4 xl:p-6 h-full overflow-hidden">
           <PlaylistAulas aulaAtual={aula} todasAulas={listaAulas} />
        </div>
      </div>

    </div>
  );
}