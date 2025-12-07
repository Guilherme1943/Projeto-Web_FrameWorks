import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AutorizacaoLogin } from "@/components/autorizacao-login";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AutorizacaoLogin>
          {children}
        </AutorizacaoLogin>
        <Toaster />
      </body>
    </html>
  );
}