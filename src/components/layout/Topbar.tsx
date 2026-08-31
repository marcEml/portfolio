"use client";

import { LogOut, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Topbar({ onMenuClick, onLogout }: { onMenuClick?: () => void; onLogout?: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-app-border bg-white/95 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-[2px] p-2 text-primary lg:hidden"
          aria-label="Ouvrir le menu"
          onClick={onMenuClick}
        >
          <Menu />
        </button>
        <div className="hidden w-80 items-center gap-2 rounded-[2px] border border-app-border px-3 py-2 md:flex">
          <Search size={16} className="text-text-muted" />
          <input className="w-full outline-none" placeholder="Rechercher dans le back office" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold">Administrateur</p>
          <p className="text-xs text-text-muted">UNETEL</p>
        </div>
        <Button variant="secondary" icon={<LogOut size={16} />} onClick={onLogout}>
          Se déconnecter
        </Button>
      </div>
    </header>
  );
}
