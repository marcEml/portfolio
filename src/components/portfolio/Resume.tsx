"use client";

import { CheckCircle2, Download, FileText } from "lucide-react";
import Image from "next/image";

import { usePreferences } from "@/contexts/PreferencesContext";

const resumeHref = "/assets/cv/marc_emmanuel_brou_CV.pdf";

export function Resume() {
  const { language } = usePreferences();
  const isFrench = language === "fr";
  const highlights = isFrench
    ? ["Développement logiciel", "DevOps & NetOps", "Cybersécurité"]
    : ["Software development", "DevOps & NetOps", "Cybersecurity"];

  return (
    <section
      id="cv"
      aria-labelledby="resume-title"
      className="relative isolate scroll-mt-6 overflow-hidden bg-brand-ivory px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="oldart-certification-figure pointer-events-none absolute -right-24 top-6 z-0 h-[520px] w-[450px] rotate-[5deg]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 42%, transparent 100%)",
          maskImage:
            "linear-gradient(to left, black 0%, black 42%, transparent 100%)",
        }}
      >
        <Image
          src="/assets/oldart/126883.png"
          alt=""
          fill
          sizes="450px"
          className="object-contain object-right-top"
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
          08 — {isFrench ? "Curriculum vitae" : "Résumé"}
        </p>
        <h2
          id="resume-title"
          className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl"
        >
          {isFrench
            ? "Mon parcours, à portée de clic."
            : "My background, one click away."}
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-brand-muted">
          {isFrench
            ? "Un aperçu volontairement partiel de mon CV. Téléchargez le document pour retrouver l’ensemble de mon parcours, de mes expériences et de mes compétences."
            : "A deliberately partial preview of my résumé. Download the document to explore my complete background, experience and skills."}
        </p>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.72fr)] lg:gap-16">
          <figure className="group relative border-2 border-brand-navy bg-brand-surface p-3 shadow-[10px_10px_0_rgb(var(--brand-blue))] sm:p-4">
            <div className="relative h-[430px] overflow-hidden border border-brand-border bg-white sm:h-[520px] lg:h-[560px]">
              <Image
                src="/assets/cv/capture_cv.png"
                alt={
                  isFrench
                    ? "Aperçu de la première partie du CV de Marc-Emmanuel Brou"
                    : "Preview of the first part of Marc-Emmanuel Brou's résumé"
                }
                fill
                sizes="(min-width: 1024px) 620px, 92vw"
                className="object-cover object-top saturate-[0.72] transition-[filter,transform] duration-700 group-hover:scale-[1.012] group-hover:saturate-100"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/90 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 z-[1] flex items-end justify-between gap-5 p-6 text-brand-navy sm:p-8">
                <div>
                  <p className="mt-2 font-display text-xl font-bold">
                    {isFrench ? "Apperçu" : "Excerpt"}
                  </p>
                </div>
                <span className="shrink-0 border border-brand-border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-brand-muted">
                  PDF
                </span>
              </div>
            </div>
            <figcaption className="sr-only">
              {isFrench
                ? "Aperçu partiel du curriculum vitae de Marc-Emmanuel Brou"
                : "Partial preview of Marc-Emmanuel Brou's résumé"}
            </figcaption>
          </figure>

          <div className="relative border border-brand-border bg-brand-surface p-7 shadow-[7px_7px_0_rgb(var(--brand-blue-soft))] sm:p-9">
            <span
              aria-hidden="true"
              className="absolute right-5 top-3 font-display text-8xl font-bold leading-none text-brand-navy/[0.035] sm:text-9xl"
            >
              08
            </span>

            <div className="relative">
              <span className="flex size-12 items-center justify-center bg-brand-navy text-brand-surface">
                <FileText className="size-6" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <p className="mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                Marc-Emmanuel Brou · PDF
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-brand-navy sm:text-3xl">
                {isFrench ? "Le profil complet" : "The complete profile"}
              </h3>
              <p className="mt-4 leading-7 text-brand-muted">
                {isFrench
                  ? "Une synthèse concise de mes expériences, formations, certifications et environnements techniques."
                  : "A concise overview of my experience, education, certifications and technical environments."}
              </p>

              <ul className="mt-7 space-y-3" aria-label={isFrench ? "Domaines du CV" : "Résumé areas"}>
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3 text-sm font-medium text-brand-navy-soft">
                    <CheckCircle2 className="size-4 shrink-0 text-brand-blue" strokeWidth={1.8} aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <a
                href={resumeHref}
                download="CV-Marc-Emmanuel-Brou.pdf"
                className="mt-9 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-brand-navy px-6 text-sm font-bold text-brand-surface transition duration-200 hover:-translate-y-0.5 hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:w-auto"
              >
                <Download className="size-4" strokeWidth={2} aria-hidden="true" />
                {isFrench ? "Télécharger le CV" : "Download résumé"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
