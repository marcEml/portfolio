"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  eyebrow?: string;
  heading: string;
  description?: string;
}

export const Timeline = ({ data, eyebrow, heading, description }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-brand-surface font-sans md:px-6"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto px-6 pb-10 pt-24 sm:px-10 lg:px-12 lg:pb-16 lg:pt-32">
        {eyebrow ? (
          <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          {heading}
        </h2>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            {description}
          </p>
        ) : null}
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto px-6 pb-24 sm:px-10 lg:px-12 lg:pb-32">
        {data.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex justify-start pt-12 md:pt-24 md:gap-10"
          >
            <div className="sticky top-32 z-40 flex max-w-xs self-start md:w-full md:max-w-[270px] md:flex-row md:items-center lg:max-w-xs">
              <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-ivory md:left-0">
                <div className="h-4 w-4 rounded-full border-2 border-brand-blue bg-brand-surface" />
              </div>
              <h3 className="hidden font-display text-xl font-bold text-brand-muted/70 md:block md:pl-16 md:text-3xl lg:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-16 md:pl-4">
              <h3 className="mb-5 block text-left font-display text-2xl font-bold text-brand-muted/70 md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: `${height}px`,
          }}
          className="absolute left-[25px] top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-brand-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)] sm:left-[41px] lg:left-[49px]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-brand-blue via-brand-blue/55 to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
};
