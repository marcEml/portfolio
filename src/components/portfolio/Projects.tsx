"use client";

import { usePreferences } from "@/contexts/PreferencesContext";

export function Projects() {
  const { language } = usePreferences();
  const isFrench = language === "fr";
  const projects = isFrench
    ? [
        { number: "01", title: "Projet principal", category: "Application web • Conception & développement", description: "Présentez le contexte, le problème résolu, votre contribution et les résultats obtenus." },
        { number: "02", title: "Projet technique", category: "Produit numérique • Expérience utilisateur", description: "Expliquez les choix techniques, les contraintes rencontrées et les solutions apportées." },
        { number: "03", title: "Projet personnel", category: "Exploration • Recherche & développement", description: "Mettez en avant une initiative qui illustre votre curiosité et votre capacité à apprendre." },
      ]
    : [
        { number: "01", title: "Main project", category: "Web application • Design & development", description: "Present the context, the problem solved, your contribution and the results achieved." },
        { number: "02", title: "Technical project", category: "Digital product • User experience", description: "Explain the technical decisions, constraints encountered and solutions delivered." },
        { number: "03", title: "Personal project", category: "Exploration • Research & development", description: "Highlight an initiative that demonstrates your curiosity and ability to learn." },
      ];

  return (
    <section id="projects" className="scroll-mt-6 bg-brand-surface px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
          {isFrench ? "04 — Projets" : "04 — Projects"}
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          {isFrench ? "Une sélection de réalisations." : "A selection of projects."}
        </h2>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.number} className="group flex min-h-[360px] flex-col border border-brand-border p-7 transition hover:-translate-y-1 hover:border-brand-blue sm:p-9">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-brand-blue">{project.number}</span>
                <span aria-hidden="true" className="h-2.5 w-2.5 bg-brand-blue transition group-hover:rotate-45" />
              </div>
              <div className="mt-auto">
                <p className="text-xs uppercase tracking-[0.16em] text-brand-muted">{project.category}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-brand-navy">{project.title}</h3>
                <p className="mt-5 leading-relaxed text-brand-muted">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
