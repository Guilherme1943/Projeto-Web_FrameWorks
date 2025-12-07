export interface PreferenciasNotificacao {
  emailAulas: boolean;
  emailMarketing: boolean;
  pushLembretes: boolean;
  pushMentoria: boolean;
}

export interface UsuarioConfig {
  nome: string;
  email: string;
  bio: string;
  cargo: string;
  notificacoes: PreferenciasNotificacao;
}