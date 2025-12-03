"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function GoogleLoginPage() {
  const router = useRouter()
  
  // Estado pra controlar aquele loadingzinho chato de quando clica na conta
  const [loadingAccount, setLoadingAccount] = useState<string | null>(null)

  // Função que finge que tá autenticando
  const handleAccountClick = async (accountName: string) => {
    setLoadingAccount(accountName)
    
    // Espera um pouco pra dar aquele drama de "conectando..."
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Deu bom, manda pro painel
    router.push("/inicio")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] p-4 text-[#202124] font-sans">
      
      {/* O Card Principal do Google - Borda fininha e cantos arredondados */}
      <div className="w-full max-w-[448px] bg-white rounded-lg border border-[#dadce0] p-0 overflow-hidden shadow-sm">
        
        {/* Cabeçalho do Card */}
        <div className="border-b border-[#dadce0] px-10 py-3 flex items-center gap-3">
            {/* Logozinho do G colorido (feito com SVG na mão pra ficar leve) */}
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.799 L -6.734 42.379 C -8.804 40.439 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
              </g>
            </svg>
            <span className="text-sm font-medium text-gray-600">Fazer login com google</span>
        </div>

        {/* Miolo do card */}
        <div className="px-10 py-10">
          
          <div className="flex flex-col items-center text-center">
             {/* Aquele emoji maroto da imagem */}
             <div className="mb-4">
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif" alt="Hand" width="40" height="40" />
             </div>

             <h1 className="text-2xl font-normal text-[#202124] mb-2">Escolha uma conta</h1>
             <p className="text-base text-[#5f6368] mb-10">
               para prosseguir para <span className="font-medium text-[#1a73e8]">ConectaEdu</span>
             </p>
          </div>

          {/* Lista de Contas - Hardcoded pra ficar igual a imagem */}
          <ul className="space-y-1 mb-8">
            
            {/* Conta 1: Lucas */}
            <li 
               onClick={() => handleAccountClick("lucas")}
               className="flex items-center gap-4 p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors rounded-t-md"
            >
               {loadingAccount === "lucas" ? (
                 <Loader2 className="animate-spin text-blue-600" size={28} />
               ) : (
                 <div className="h-8 w-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-sm font-medium shrink-0">L</div>
               )}
               <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-[#3c4043]">Lucas Emanuel</span>
                  <span className="text-xs text-[#5f6368]">lucasemanuel@gmail.com</span>
               </div>
            </li>

            {/* Conta 2: Adson */}
            <li 
               onClick={() => handleAccountClick("adson")}
               className="flex items-center gap-4 p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
               {loadingAccount === "adson" ? (
                 <Loader2 className="animate-spin text-blue-600" size={28} />
               ) : (
                 <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium shrink-0">A</div>
               )}
               <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-[#3c4043]">Adson Menezes</span>
                  <span className="text-xs text-[#5f6368]">adsonmenezes123@gmail.com</span>
               </div>
            </li>

            {/* Opção: Usar outra conta */}
            <li className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors rounded-b-md">
               <div className="h-8 w-8 rounded-full text-[#5f6368] flex items-center justify-center shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor">
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                 </svg>
               </div>
               <span className="text-sm font-medium text-[#3c4043]">Usar outra conta</span>
            </li>

          </ul>

          {/* Texto legal lá embaixo */}
          <div className="text-[11px] text-[#5f6368] leading-relaxed">
             To continue, Google will share your name, email address, language preference, and profile picture with Company. Before using this app, you can review Company's <a href="#" className="text-[#1a73e8] hover:underline font-medium">privacy policy</a> and <a href="#" className="text-[#1a73e8] hover:underline font-medium">terms of service</a>.
          </div>

        </div>
      </div>

      {/* Footer da Página (fora do card) */}
      <div className="mt-6 flex justify-between w-full max-w-[448px] text-xs text-[#5f6368]">
          <div className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded">Português (Brasil) ▼</div>
          <div className="flex gap-4">
             <span className="cursor-pointer hover:underline">Ajuda</span>
             <span className="cursor-pointer hover:underline">Privacidade</span>
             <span className="cursor-pointer hover:underline">Termos</span>
          </div>
      </div>

    </div>
  )
}