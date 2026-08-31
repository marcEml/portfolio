"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-xdark/45 p-4">
      <div className="w-full max-w-lg scale-100 rounded-[2px] border border-app-border bg-white p-6 shadow-modal">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">{title}</h2>
          <button className="rounded-[2px] p-2 text-text-muted hover:bg-app-bg" onClick={onClose} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
