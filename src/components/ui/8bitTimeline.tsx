import type { ReactNode } from "react";

import { IconCard } from "@/components/ui/IconCard";
import { cn } from "@/utils/utils";

export interface TimelineStep {
  description: string;
  icon: ReactNode;
  title: string;
}

interface EightBitTimelineProps {
  className?: string;
  description?: string;
  eyebrow?: string;
  id?: string;
  steps?: TimelineStep[];
  title?: string;
}

const defaultSteps: TimelineStep[] = [
  {
    icon: "I",
    title: "Design",
    description: "Plan your layout and pick your blocks.",
  },
  {
    icon: "II",
    title: "Develop",
    description: "Install components and wire them up.",
  },
  {
    icon: "III",
    title: "Test",
    description: "Check responsiveness and dark mode.",
  },
  {
    icon: "IV",
    title: "Deploy",
    description: "Push to production. Game over (in a good way).",
  },
];

export default function EightBitTimeline({
  title = "The Quest Line",
  description = "Your path from idea to launch",
  eyebrow,
  id,
  steps = defaultSteps,
  className,
}: EightBitTimelineProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full scroll-mt-6 bg-brand-ivory px-6 py-24 text-brand-navy sm:px-10 lg:px-16 lg:py-32",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        {(title || description) && (
          <div className="mb-16 text-center">
            {eyebrow && (
              <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mx-auto mt-5 max-w-2xl font-mono text-sm leading-relaxed text-brand-muted sm:text-base">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative flex flex-col gap-10 md:flex-row md:gap-0">
          <div
            className="absolute left-0 right-0 top-8 hidden h-0 border-t-2 border-dashed border-brand-blue/60 md:block"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <div
              className="relative flex flex-1 items-start gap-5 text-left md:flex-col md:items-center md:px-5 md:text-center"
              key={step.title}
            >
              <IconCard badge={String(index + 1).padStart(2, "0")}>
                {step.icon}
              </IconCard>

              <div className="pt-1 md:pt-3">
                <h3 className="font-mono text-base font-bold uppercase tracking-[0.08em] text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
