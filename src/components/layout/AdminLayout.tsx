"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PreferenceControls } from "@/components/layout/PreferenceControls";
import { Sidebar } from "@/components/layout/Sidebar";

export function AdminLayout({
  children,
  fullBleed = false,
}: {
  children: React.ReactNode;
  fullBleed?: boolean;
}) {
  const [activeSection, setActiveSection] = useState("home");

  const handleSelect = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="fixed right-4 top-4 z-50 lg:hidden">
        <PreferenceControls compact />
      </div>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] lg:block">
        <Sidebar className="w-full" activeId={activeSection} onSelect={handleSelect} />
      </aside>

      <div className="min-h-screen min-w-0 lg:pl-[260px]">
        <main
          className={
            fullBleed
              ? "fade-in w-full"
              : "fade-in mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8"
          }
        >
          {fullBleed ? null : <Breadcrumb />}
          {children}
        </main>
      </div>
    </div>
  );
}
