import type { ReactNode } from "react";

const tones = {
  green: "bg-green-50 text-success",
  red: "bg-red-50 text-danger",
  blue: "bg-blue-50 text-info",
  gray: "bg-app-bg text-text-muted",
  orange: "bg-orange-50 text-warning",
};

export function Badge({ tone = "gray", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={`inline-flex rounded-[2px] px-2 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
