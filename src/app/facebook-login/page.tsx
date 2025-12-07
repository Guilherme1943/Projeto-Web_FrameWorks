"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function FacebookLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Preencha os campos", {
        description: "O e-mail ou a senha inseridos estão incorretos."
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const configExistente = localStorage.getItem("conectaedu-config");
      if (!configExistente) {
        const usuarioPadrao = {
          nome: "Marcos Silva",
          email: email,
          cargo: "Estudante",
          notificacoes: { emailAulas: true }
        };
        localStorage.setItem("conectaedu-config", JSON.stringify(usuarioPadrao));
      }

      toast.success("Login realizado com sucesso!");
      router.push("/inicio");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f2f5] px-4 font-sans">
      <Toaster position="top-center" richColors />


      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md">

        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl font-bold text-[#1877f2] tracking-tighter mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            facebook
          </h1>

          <h2 className="text-[24px] text-[#1c1e21] leading-7 font-normal max-w-sm hidden sm:block">
            O Facebook ajuda você a se conectar e compartilhar com as pessoas.
          </h2>
        </div>

        {/* card de login*/}
        <div className="bg-white p-4 rounded-lg shadow-xl shadow-gray-200/50 w-full border border-gray-100">
          <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
            
            <input
              type="text"
              placeholder="Endereço de e-mail ou número de telefone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 rounded-[6px] border border-gray-300 text-[17px] outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] transition-all placeholder:text-gray-500"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 rounded-[6px] border border-gray-300 text-[17px] outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] transition-all placeholder:text-gray-500"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#1877f2] hover:bg-[#166fe5] text-white text-[20px] font-bold rounded-[6px] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-1"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Entrar"}
            </button>

            <div className="text-center mt-2 mb-2">
              <a href="#" className="text-[#1877f2] hover:underline text-[14px] font-medium">
                Esqueceu a senha?
              </a>
            </div>

            <div className="border-t border-gray-300 my-1" />

            <div className="text-center pt-2 pb-2">
              <button
                type="button"
                className="px-4 py-3 bg-[#42b72a] hover:bg-[#36a420] text-white text-[17px] font-bold rounded-[6px] transition-colors shadow-sm"
              >
                Criar nova conta
              </button>
            </div>

          </form>
        </div>
        
        <p className="text-center text-[14px] text-[#1c1e21]">

        </p>

      </div>
    </div>
  );
}