import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/utils";

const sizes = {
  sm: "size-12 shadow-[4px_4px_0_rgb(var(--brand-blue))]",
  md: "size-16 shadow-[6px_6px_0_rgb(var(--brand-blue))]",
  lg: "size-24 shadow-[8px_8px_0_rgb(var(--brand-blue))]",
};

type IconCardProps = HTMLAttributes<HTMLDivElement> & {
  badge?: ReactNode;
  children: ReactNode;
  size?: keyof typeof sizes;
};

export function IconCard({ badge, children, className, size = "md", ...props }: IconCardProps) {
  return (
    <div
      className={cn(
        "relative z-10 flex shrink-0 items-center justify-center border-2 border-brand-navy bg-brand-surface text-brand-blue",
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {badge ? (
        <span className="absolute -right-3 -top-3 flex size-6 items-center justify-center bg-brand-navy font-mono text-[10px] font-bold text-brand-surface">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

export default IconCard;
