"use client";

import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname() ?? "";
  const label = pathname
    .split("/")
    .filter(Boolean)
    .slice(1)
    .map((part) => part.replaceAll("-", " "))
    .join(" / ");

  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">{label || "Portfolio"}</p>;
}
