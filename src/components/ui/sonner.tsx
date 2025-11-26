"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          // 1. ESTILO GERAL (A caixa da notificação)
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl font-sans",
          
          // 2. TÍTULO E DESCRIÇÃO (A escrita)
          title: "group-[.toast]:font-bold group-[.toast]:text-base", // Título em Negrito e um pouco maior
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-sm", // Descrição cinza suave
          
          // 3. BOTÕES (Se houver botão na notificação)
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          
          // 4. CORES PERSONALIZADAS POR TIPO
          // Quando for ERRO (toast.error)
          error: "group-[.toaster]:bg-red-50 group-[.toaster]:border-red-200 group-[.toaster]:text-red-800 dark:group-[.toaster]:bg-red-900 dark:group-[.toaster]:text-red-100",
          
          // Quando for SUCESSO (toast.success)
          success: "group-[.toaster]:bg-sky-50 group-[.toaster]:border-sky-200 group-[.toaster]:text-sky-800 dark:group-[.toaster]:bg-sky-900 dark:group-[.toaster]:text-sky-100",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }