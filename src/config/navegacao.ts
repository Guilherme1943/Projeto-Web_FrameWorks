import { 
  Home, 
  BookOpen, 
  Calendar, 
  NotebookPen, 
  Settings, 
  LogOut 
} from "lucide-react";

export type ItemNavegacao = {
  titulo: string;
  href: string;
  icone: any;
};

export type ConfiguracaoNavegacao = {
  menuPrincipal: ItemNavegacao[];
  menuRodape: ItemNavegacao[];
};

// nomes e rotas da sidebar
export const configNavegacao: ConfiguracaoNavegacao = {
  menuPrincipal: [
    {
      titulo: "Início",
      href: "/inicio",
      icone: Home,
    },
    {
      titulo: "Aulas",
      href: "/aulas",
      icone: BookOpen,
    },
    {
      titulo: "Calendário",
      href: "/calendario",
      icone: Calendar,
    },
    {
      titulo: "Anotações",
      href: "/anotacoes",
      icone: NotebookPen,
    },
  ],
  menuRodape: [
    {
      titulo: "Configurações",
      href: "/configuracoes",
      icone: Settings,
    },
    {
      titulo: "Sair",
      href: "/",
      icone: LogOut,
    },
  ],
};