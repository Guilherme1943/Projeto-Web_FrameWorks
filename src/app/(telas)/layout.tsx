// Arquivo: src/app/(telas)/layout.tsx
import React from "react";
import SidebarLayout from "@/components/barralateral/sidebar";

export default function LayoutTelas({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout>
      {children}
    </SidebarLayout>
  );
}