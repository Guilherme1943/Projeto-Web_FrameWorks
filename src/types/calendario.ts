export type TipoEvento = 
  | "aula" | "prova" | "entrega" | "mentoria" | "live" | "estudo";

export interface CalendarioEvento {
  id: string;
  titulo: string;
  descricao?: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  tipo: TipoEvento;
}

export const CORES_EVENTOS: Record<TipoEvento, { bg: string; text: string; border: string; indicator: string; label: string }> = {
  aula: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100", indicator: "bg-blue-600", label: "Aula" },
  prova: { bg: "bg-red-50", text: "text-red-700", border: "border-red-100", indicator: "bg-red-600", label: "Prova" },
  entrega: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100", indicator: "bg-amber-600", label: "Entrega" },
  mentoria: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100", indicator: "bg-purple-600", label: "Mentoria" },
  live: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-100", indicator: "bg-cyan-600", label: "Live" },
  estudo: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200", indicator: "bg-slate-500", label: "Estudo" },
};