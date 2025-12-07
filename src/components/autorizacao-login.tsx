"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AutorizacaoLogin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const verificaAuth = () => {
      // verificação do local storage
      const userConfig = localStorage.getItem("conectaedu-config");
      
      // rotas publicas (pode acessar normal sem logar)
      const publicRoutes = ["/", "/facebook-login", "/google-login", "/cadastro"];
      const isPublicRoute = publicRoutes.includes(pathname);

      if (!userConfig && !isPublicRoute) {

        router.push("/");
      } else if (userConfig && isPublicRoute) {

        router.push("/inicio");
      } else {

        setIsChecked(true);
      }
    };

    verificaAuth();
  }, [pathname, router]);

  if (!isChecked) {
    return null; 
  }

  return <>{children}</>;
}