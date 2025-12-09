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

  //redirecionamentos
  const handleGoogleSignup = () => {
    router.push("/google-login")
  }

  const handleFacebookSignup = () => {
   router.push("/facebook-login")
  }

  // acabam aqui

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
                  placeholder=""
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
              
              {/* botões de redes sociais */}
              <Field className="grid grid-cols-2 gap-4">
                
                {/* Google */}
                <Button variant="outline" type="button" onClick={handleGoogleSignup}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>

                {/* facebook*/}
                <Button variant="outline" type="button" onClick={handleFacebookSignup}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                    <path
                      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                      fill="currentColor"
                    />
                  </svg>
                  Facebook
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