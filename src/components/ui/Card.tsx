import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border border-app-border bg-white p-6 ${className}`}>{children}</div>;
}
