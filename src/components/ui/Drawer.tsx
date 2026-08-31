"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

export function Drawer({
  open,
  title,
  subtitle,
  children,
  footer,
  onClose,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-primary-xdark/35 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-app-border bg-white shadow-modal transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="border-b border-app-border px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Détail</p>
              <h2 className="mt-2 font-display text-2xl font-bold leading-tight">{title}</h2>
              {subtitle ? <p className="inline mt-1 text-sm text-white mt-2 p-2 bg-primary">{subtitle}</p> : null}
            </div>
            <button className="rounded-[2px] p-2 text-text-muted hover:bg-app-bg" onClick={onClose} aria-label="Fermer">
              <X size={20} />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer ? <footer className="border-t border-app-border px-6 py-4">{footer}</footer> : null}
      </aside>
    </div>
  );
}

export function DetailRow({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <div className="border-b border-app-border py-3 last:border-b-0">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">{label}</p>
      <div className="mt-1 text-sm leading-6 text-text-primary">{value || "-"}</div>
    </div>
  );
}
