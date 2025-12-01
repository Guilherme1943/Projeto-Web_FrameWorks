"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  const router = useRouter()

  // Estados
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // --- ÁREA DE REDIRECIONAMENTOS ---
  const handleGoogleSignup = () => {
    router.push("/google-login")
  }

  const handleFacebookSignup = () => {
    // router.push("/facebook-login")
    toast.info("Em breve", { description: "Registro com Facebook será implementado." })
  }

  const handleGithubSignup = () => {
    // router.push("/github-login")
    toast.info("Em breve", { description: "Registro com GitHub será implementado." })
  }
  // --- FIM ---

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (password.length < 8) {
      toast.warning("Senha muito curta", { description: "A senha precisa ter pelo menos 8 caracteres." })
      return
    }

    if (password !== confirmPassword) {
      toast.error("Senhas diferentes", { description: "A senha e a confirmação não batem. Tente novamente." })
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Conta criada!", { description: "Redirecionando..." })
      console.log("Conta criada para:", { email, password })
      router.push("/inicio") 

    } catch (error) {
      console.error("Erro ao criar conta:", error)
      toast.error("Erro ao criar conta", { description: "Algo deu errado no servidor." })
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold bg-linear-to-r from-blue-900 to-sky-500 bg-clip-text text-transparent">
                  ConectaEdu
                </h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Insira seu e-mail abaixo para criar sua conta.
                </p>
              </div>
              
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@exemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FieldDescription>
                  Não compartilharemos seu e-mail com mais ninguém.
                </FieldDescription>
              </Field>
              
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirme a senha
                    </FieldLabel>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Deve ter no mínimo 8 caracteres.
                </FieldDescription>
              </Field>
              
              <Field>
                <Button 
                  type="submit" 
                  className="w-full bg-linear-to-r from-blue-900 to-sky-500 hover:from-blue-800 hover:to-sky-400 text-white transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </Field>
              
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou continue com
              </FieldSeparator>
              
              {/* BOTÕES SOCIAIS */}
              <Field className="grid grid-cols-3 gap-4">
                
                {/* 1. Google */}
                <Button variant="outline" type="button" onClick={handleGoogleSignup}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Registrar com Google</span>
                </Button>

                {/* 2. Facebook (NOVA LOGO) */}
                <Button variant="outline" type="button" onClick={handleFacebookSignup}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
                    <path d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165.56h-32.5v-37.561h32.5v-28.209c0-32.056 19.048-49.525 48.079-49.525 13.914 0 28.399 2.485 28.399 2.485v31.185h-15.998c-15.892 0-20.85 9.864-20.85 19.98v24.084h35.122l-5.614 37.561h-29.508V254.445C209.192 244.843 256 191.888 256 128z" fill="#1877F2"/>
                  </svg>
                  <span className="sr-only">Registrar com Facebook</span>
                </Button>

                {/* 3. GitHub */}
                <Button variant="outline" type="button" onClick={handleGithubSignup}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="sr-only">Registrar com GitHub</span>
                </Button>

              </Field>
              <FieldDescription className="text-center">
                Já possui uma conta? <a href="/">Entrar</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/conectaeduazul.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviços</a>{" "}
        e <a href="#">Politicas de Privacidade</a>.
      </FieldDescription>
    </div>
  )
}