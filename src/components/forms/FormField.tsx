import type { ReactNode } from "react";

export function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-text-secondary">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-sm text-danger">{error}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-[2px] border border-app-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/15";
