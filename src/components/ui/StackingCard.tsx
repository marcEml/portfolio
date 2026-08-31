"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  type MotionStyle,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { Award } from "lucide-react";

import { IconCard } from "@/components/ui/IconCard";
import { usePreferences } from "@/contexts/PreferencesContext";
import { cn } from "@/utils/utils";

export interface StackingCardItem {
  certificateId: string;
  date: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  issuer: string;
  skills: string[];
  title: string;
}

interface CertificateCardProps {
  className?: string;
  index: number;
  item: StackingCardItem;
  style?: MotionStyle;
}

function CertificateCard({ item, index, className, style }: CertificateCardProps) {
  const { language } = usePreferences();
  const isFrench = language === "fr";

  return (
    <motion.article
      style={style}
      className={cn(
        "relative w-full origin-top overflow-hidden border-2 border-brand-navy shadow-[10px_10px_0_rgb(var(--brand-blue))] lg:h-[500px] lg:w-[min(900px,72vw)]",
        index % 2 === 0 ? "bg-brand-blue-soft" : "bg-brand-surface",
        className,
      )}
    >
      <div className="flex min-h-24 items-center justify-center border-b-2 border-brand-navy px-6 py-4 text-center lg:h-24">
        <h3 className="font-display text-2xl font-bold leading-tight text-brand-navy lg:text-[1.65rem]">
          {item.title}
        </h3>
      </div>

      <div className="grid lg:h-[calc(100%-6rem)] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col p-6 sm:p-8 lg:p-7">
          <div className="flex items-center gap-5">
            <IconCard size="sm" badge={String(index + 1).padStart(2, "0")}>
              <Award className="size-5" strokeWidth={1.7} aria-hidden="true" />
            </IconCard>
            <p className="font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-brand-blue">
              {item.issuer}
              <br />
              {item.date}
            </p>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-brand-muted">{item.description}</p>

          <ul
            className="mt-5 flex flex-wrap gap-1.5"
            aria-label={isFrench ? `Compétences validées par ${item.title}` : `Skills validated by ${item.title}`}
          >
            {item.skills.map((skill) => (
              <li
                key={skill}
                className="border border-brand-border bg-brand-surface/80 px-2.5 py-1 text-[10px] font-medium text-brand-muted"
              >
                {skill}
              </li>
            ))}
          </ul>

          <p className="mt-auto break-all pt-5 font-mono text-[9px] uppercase tracking-wide text-brand-muted">
            {isFrench ? "Identifiant" : "Certificate ID"} · {item.certificateId}
          </p>
        </div>

        <div className="relative min-h-72 overflow-hidden border-t-2 border-brand-navy bg-brand-ivory p-5 sm:min-h-96 sm:p-7 lg:min-h-0 lg:border-l-2 lg:border-t-0">
          <div className="relative h-full min-h-64 w-full sm:min-h-80 lg:min-h-0">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function DesktopStackedCard({
  item,
  index,
  progress,
  range,
  targetScale,
}: {
  item: StackingCardItem;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const cardContainer = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={cardContainer}
      className="sticky top-0 flex h-screen items-center justify-center px-8 py-10 xl:px-16"
    >
      <CertificateCard
        item={item}
        index={index}
        style={{
          scale,
          top: `calc(-5vh + ${index * 104}px)`,
          zIndex: index + 1,
        }}
      />
    </div>
  );
}

export function StackingCards({ items }: { items: StackingCardItem[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div className="bg-brand-ivory px-6 sm:px-10 lg:px-0">
      <div className="mx-auto max-w-6xl py-10 lg:hidden">
        <div className="space-y-12">
          {items.map((item, index) => (
            <CertificateCard key={item.certificateId} item={item} index={index} />
          ))}
        </div>
      </div>

      <div ref={container} className="relative hidden lg:block">
        {items.map((item, index) => {
          const targetScale = 1 - Math.max(0, items.length - index - 1) * 0.025;

          return (
            <DesktopStackedCard
              key={item.certificateId}
              item={item}
              index={index}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StackingCards;
