"use client"; // Necessário para usar hooks como useState

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Beaker, 
  Code2, 
  LayoutDashboard, 
  Settings, 
  Terminal 
} from "lucide-react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Beaker className="h-6 w-6" />
            <span>DevLab</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#" className="hover:text-blue-600 transition">Documentação</Link>
            <Link href="#" className="hover:text-blue-600 transition">Componentes</Link>
            <Link href="#" className="hover:text-blue-600 transition">API</Link>
          </nav>
          <div className="flex gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Login
            </button>
            <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition">
              Começar
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-32">
          <div className="mx-auto max-w-3xl space-y-6">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
              Ambiente de Desenvolvimento v1.0
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-900">
              Ambiente de Testes para <br/>
              <span className="text-blue-600">Next.js & Tailwind</span>
            </h1>
            <p className="text-lg text-slate-600">
              Esta é uma página base para validar componentes, testar rotas e experimentar novos layouts. 
              Edite <code>src/app/page.tsx</code> para começar.
            </p>
            
            {/* Área Interativa (Teste de Client Component) */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row">
              <p className="font-medium text-slate-700">Teste de Estado (Client-Side):</p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCount(count - 1)}
                  className="h-8 w-8 rounded border hover:bg-slate-100 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-xl">{count}</span>
                <button 
                  onClick={() => setCount(count + 1)}
                  className="h-8 w-8 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-white py-20 border-t">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-12 text-2xl font-bold text-slate-900">Ferramentas de Teste</h2>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="group rounded-lg border p-6 hover:border-blue-500 hover:shadow-md transition cursor-pointer">
                <LayoutDashboard className="mb-4 h-8 w-8 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">Layouts</h3>
                <p className="text-slate-600 text-sm">Teste a responsividade e grids do Tailwind CSS.</p>
              </div>

              {/* Card 2 */}
              <div className="group rounded-lg border p-6 hover:border-blue-500 hover:shadow-md transition cursor-pointer">
                <Code2 className="mb-4 h-8 w-8 text-purple-600" />
                <h3 className="mb-2 text-lg font-semibold">Componentes</h3>
                <p className="text-slate-600 text-sm">Área para renderizar e validar componentes isolados.</p>
              </div>

              {/* Card 3 */}
              <div className="group rounded-lg border p-6 hover:border-blue-500 hover:shadow-md transition cursor-pointer">
                <Terminal className="mb-4 h-8 w-8 text-green-600" />
                <h3 className="mb-2 text-lg font-semibold">API Routes</h3>
                <p className="text-slate-600 text-sm">Teste endpoints e chamadas de banco de dados.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t bg-slate-50 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <p className="text-sm text-slate-500">© 2024 DevLab. Ambiente de Testes.</p>
          <div className="flex gap-4">
            <Settings className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}