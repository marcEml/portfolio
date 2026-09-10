"use client";

import {
  ArrowUpRight,
  Check,
  ExternalLink,
  FolderKanban,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/ui/MorphingDialog";
import StackSpread, { type StackSpreadCard } from "@/components/ui/StackSpred";
import { usePreferences } from "@/contexts/PreferencesContext";
import { cn } from "@/utils/utils";

type ProjectLink = {
  href: string;
  label: string;
};

type Project = {
  category: string;
  highlights: string[];
  links?: ProjectLink[];
  number: string;
  objective: string;
  overview: string;
  slug: string;
  summary: string;
  technologies: string[];
  title: string;
  video?: {
    label: string;
    poster: string;
    src: string;
  };
};

type ProjectCardLayout = Pick<
  StackSpreadCard,
  "stackOffset" | "stackRotate" | "target" | "targetSm" | "z"
>;

function getProjectGridMetrics(total: number) {
  const desktopColumns = total <= 1 ? 1 : 2;
  const desktopRows = Math.ceil(total / desktopColumns);
  const desktopGap = 4;
  const desktopHeight =
    total <= 2
      ? 56
      : Math.max(
          18,
          Math.min(44, (92 - desktopGap * (desktopRows - 1)) / desktopRows),
        );
  const desktopWidth = total <= 2 ? 29 : total <= 4 ? 24 : 22;

  const smallColumns = total <= 2 ? 1 : 2;
  const smallRows = Math.ceil(total / smallColumns);
  const smallGap = total <= 2 ? 18 : total <= 4 ? 20 : 6;
  const smallHeight =
    total <= 2
      ? 32
      : total <= 4
        ? 28
        : Math.max(
            20,
            Math.min(34, (88 - smallGap * (smallRows - 1)) / smallRows),
          );

  return {
    desktop: {
      columns: desktopColumns,
      gap: desktopGap,
      height: desktopHeight,
      rows: desktopRows,
      width: desktopWidth,
    },
    small: {
      colX: total <= 2 ? 0 : total <= 4 ? 24 : 29,
      columns: smallColumns,
      gap: smallGap,
      height: smallHeight,
      rows: smallRows,
      width: total <= 2 ? 82 : total <= 4 ? 44 : 38,
    },
  };
}

function getProjectCardLayout(
  index: number,
  total: number,
  metrics: ReturnType<typeof getProjectGridMetrics>,
): ProjectCardLayout {
  const desktopRow = Math.floor(index / metrics.desktop.columns);
  const desktopColumn = index % metrics.desktop.columns;
  const desktopStepY = metrics.desktop.height + metrics.desktop.gap;
  const desktopY =
    metrics.desktop.rows === 1
      ? 1
      : (desktopRow - (metrics.desktop.rows - 1) / 2) * desktopStepY;
  const desktopX =
    metrics.desktop.columns === 1
      ? 0
      : (desktopColumn === 0 ? -1 : 1) *
        Math.min(35, 48 - metrics.desktop.width / 2);

  const smallRow = Math.floor(index / metrics.small.columns);
  const smallColumn = index % metrics.small.columns;
  const smallStepY = metrics.small.height + metrics.small.gap;
  const smallY =
    metrics.small.rows === 1
      ? 0
      : (smallRow - (metrics.small.rows - 1) / 2) * smallStepY;
  const smallX =
    metrics.small.columns === 1 ? 0 : smallColumn === 0 ? -1 : 1;

  const stackCenter = (total - 1) / 2;

  return {
    stackOffset: {
      x: ((index % 3) - 1) * 2.5,
      y: ((index % 4) - 1.5) * 1.25,
    },
    stackRotate: Math.max(-10, Math.min(10, (index - stackCenter) * 3.5)),
    target: {
      x: desktopX,
      y: desktopY,
      rotate: desktopColumn === 0 ? -1 : 1,
      scale: 1,
      w: metrics.desktop.width,
      h: metrics.desktop.height,
    },
    targetSm: { x: smallX, y: smallY },
    z: index + 2,
  };
}

function ProjectCard({
  compact = false,
  isFrench,
  project,
}: {
  compact?: boolean;
  isFrench: boolean;
  project: Project;
}) {
  const visibleTechnologies = project.technologies.slice(0, compact ? 3 : 4);
  const reduceMotion = useReducedMotion();

  return (
    <MorphingDialog
      transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}
    >
        <MorphingDialogTrigger
          ariaLabel={
            isFrench
              ? `Ouvrir les détails du projet ${project.title}`
              : `Open details for ${project.title}`
          }
          testId={`project-card-${project.slug}`}
          className="art-project-card group flex h-full w-full flex-col overflow-hidden border-2 border-brand-navy bg-brand-surface shadow-[7px_7px_0_rgb(var(--brand-blue))] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_rgb(var(--brand-blue))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          <div className="border-b-2 border-brand-navy px-4 py-3 sm:px-5">
            <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-brand-blue sm:text-xs">
              {isFrench ? "PROJET" : "PROJECT"} / {project.number}
            </span>
          </div>

          <div className={cn("flex min-h-0 flex-1 flex-col p-4", !compact && "sm:p-6")}>
              <p className="text-[10px] uppercase tracking-[0.16em] text-brand-muted sm:text-xs">
                {project.category}
              </p>
              <h3
                className={cn(
                  "mt-3 font-display font-bold leading-[1.08] tracking-tight text-brand-navy",
                  compact
                    ? "text-[clamp(1.15rem,1.65vw,1.75rem)]"
                    : "text-[clamp(1.35rem,2.25vw,2.25rem)]",
                )}
              >
                {project.title}
              </h3>
              {!compact && (
                <p className="mt-3 overflow-hidden text-xs leading-5 text-brand-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:mt-4 sm:text-sm sm:leading-6 max-lg:hidden">
                  {project.summary}
                </p>
              )}

              <ul
                className={cn(
                  "mt-4 flex flex-wrap gap-1.5 max-lg:hidden",
                  !compact && "sm:mt-5",
                )}
                aria-label={isFrench ? "Aperçu des technologies" : "Technology preview"}
              >
                {visibleTechnologies.map((technology) => (
                  <li
                    key={technology}
                    className="border border-brand-border bg-brand-ivory px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.06em] text-brand-muted"
                  >
                    {technology}
                  </li>
                ))}
                {project.technologies.length > visibleTechnologies.length && (
                  <li className="px-1 py-1 font-mono text-[10px] font-bold text-brand-blue">
                    +{project.technologies.length - visibleTechnologies.length}
                  </li>
                )}
              </ul>

              <span className="mt-auto flex items-center gap-2 pt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue sm:text-xs">
                {isFrench ? "Découvrir le projet" : "Explore the project"}
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
          </div>
        </MorphingDialogTrigger>

        <MorphingDialogContainer>
          <MorphingDialogContent className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto border-2 border-brand-navy bg-brand-surface shadow-[14px_14px_0_rgb(var(--brand-blue))]">
            <header className="relative border-b-2 border-brand-navy bg-brand-blue-soft px-6 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-12">
              <MorphingDialogClose
                ariaLabel={isFrench ? "Fermer les détails du projet" : "Close project details"}
                className="right-4 top-4 z-10 flex size-10 items-center justify-center border-2 border-brand-navy bg-brand-surface text-brand-navy transition hover:bg-brand-navy hover:text-brand-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:right-6 sm:top-6"
              />

              <div className="flex flex-wrap items-center gap-3 pr-12">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">
                  {project.number} / {project.category}
                </span>
              </div>

              <MorphingDialogTitle className="mt-5">
                <h3 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-5xl">
                  {project.title}
                </h3>
              </MorphingDialogTitle>
              <MorphingDialogSubtitle className="mt-4">
                <p className="max-w-3xl text-base leading-7 text-brand-muted sm:text-lg">
                  {project.summary}
                </p>
              </MorphingDialogSubtitle>
            </header>

            {project.video && (
              <div className="border-b-2 border-brand-navy bg-brand-navy p-3 sm:p-5">
                <div className="relative h-[clamp(220px,38vh,360px)] overflow-hidden border border-brand-border bg-black">
                  <video
                    src={project.video.src}
                    poster={project.video.poster}
                    autoPlay={reduceMotion !== true}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-brand-blue/10"
                    aria-hidden="true"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
                    <div>
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                        {isFrench ? "Signal visuel" : "Visual signal"} / {project.number}
                      </p>
                      <p className="mt-1.5 font-display text-lg font-bold text-white sm:text-xl">
                        {project.video.label}
                      </p>
                    </div>
                    <span className="shrink-0 border border-white/30 bg-black/30 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
                      {reduceMotion === true
                        ? isFrench
                          ? "Image fixe"
                          : "Still image"
                        : "2.5s / Loop"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <MorphingDialogDescription
              disableLayoutAnimation
              className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(250px,0.75fr)] lg:gap-12"
              variants={{
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 8 },
              }}
            >
              <div>
                <section aria-labelledby={`overview-${project.slug}`}>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                    01 — {isFrench ? "Vue d’ensemble" : "Overview"}
                  </p>
                  <h4 id={`overview-${project.slug}`} className="mt-3 font-display text-2xl font-bold text-brand-navy">
                    {isFrench ? "Le projet" : "The project"}
                  </h4>
                  <p className="mt-4 leading-7 text-brand-muted">{project.overview}</p>
                </section>

                <section className="mt-9 border-l-2 border-brand-blue pl-5" aria-labelledby={`objective-${project.slug}`}>
                  <h4 id={`objective-${project.slug}`} className="font-display text-xl font-bold text-brand-navy">
                    {isFrench ? "Objectif" : "Objective"}
                  </h4>
                  <p className="mt-3 leading-7 text-brand-muted">{project.objective}</p>
                </section>

                <section className="mt-10" aria-labelledby={`highlights-${project.slug}`}>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                    02 — {isFrench ? "Points clés" : "Key highlights"}
                  </p>
                  <h4 id={`highlights-${project.slug}`} className="mt-3 font-display text-2xl font-bold text-brand-navy">
                    {isFrench ? "Ce que le projet couvre" : "What the project covers"}
                  </h4>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 border border-brand-border bg-brand-ivory p-4 text-sm leading-6 text-brand-navy-soft">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-blue" strokeWidth={2} aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className="h-fit border-2 border-brand-navy bg-brand-ivory p-5 shadow-[6px_6px_0_rgb(var(--brand-blue-soft))] sm:p-6" aria-label={isFrench ? "Fiche du projet" : "Project facts"}>
                <div className="flex items-center gap-3 border-b border-brand-border pb-5">
                  <span className="flex size-10 items-center justify-center bg-brand-navy text-brand-surface">
                    <FolderKanban className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display font-bold text-brand-navy">{isFrench ? "Fiche projet" : "Project facts"}</p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-brand-muted">{project.slug}</p>
                  </div>
                </div>

                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-muted">{isFrench ? "Catégorie" : "Category"}</dt>
                    <dd className="mt-1.5 text-sm font-bold text-brand-navy">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-muted">Slug</dt>
                    <dd className="mt-1.5 break-all font-mono text-xs text-brand-navy">{project.slug}</dd>
                  </div>
                </dl>

                <div className="mt-7 border-t border-brand-border pt-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-muted">Technologies</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <li key={technology} className="border border-brand-border bg-brand-surface px-2.5 py-1.5 font-mono text-[10px] font-bold text-brand-navy-soft">
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.links && (
                  <div className="mt-7 space-y-2 border-t border-brand-border pt-6">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-3 border-2 border-brand-navy bg-brand-surface px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-brand-navy transition hover:bg-brand-navy hover:text-brand-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                      >
                        {link.label}
                        <ExternalLink className="size-4" strokeWidth={1.8} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}
              </aside>
            </MorphingDialogDescription>
          </MorphingDialogContent>
        </MorphingDialogContainer>
    </MorphingDialog>
  );
}

export function Projects() {
  const { language } = usePreferences();
  const isFrench = language === "fr";

  const localizedProjects: Record<"fr" | "en", Project[]> = {
    fr: [
        {
          number: "01",
          title: "Laboratoire de sécurité périmétrique",
          slug: "securite-perimetrique-lab",
          category: "Cybersécurité / Réseaux",
          summary:
            "Un environnement virtualisé pour concevoir, observer et éprouver une architecture réseau segmentée WAN / LAN / DMZ.",
          overview:
            "Ce laboratoire reproduit une architecture de sécurité périmétrique complète autour d’un pare-feu OPNsense. Proxmox VE héberge les différents segments, Kali Linux génère les scénarios de test et Ubuntu Server expose les services placés en DMZ.",
          objective:
            "Construire un environnement reproductible pour valider les règles de filtrage, suivre le chemin des paquets et analyser précisément les flux entre les zones réseau et Internet.",
          technologies: [
            "Proxmox VE",
            "OPNsense",
            "Kali Linux",
            "Ubuntu Server",
            "Linux Bridge",
            "DHCP",
            "DNS",
            "NAT",
            "Firewall",
            "tcpdump",
          ],
          video: {
            src: "/assets/video/electric-gaze-21st.mp4",
            poster: "/assets/video/electric-gaze-poster.webp",
            label: "Observer, filtrer, comprendre les flux",
          },
          highlights: [
            "Architecture virtualisée WAN / LAN / DMZ",
            "Pare-feu OPNsense avec filtrage stateful",
            "Segmentation réseau",
            "DHCP et DNS multi-segments",
            "NAT vers Internet",
            "Kali Linux pour les tests de sécurité",
            "Ubuntu Server en DMZ",
            "Analyse et journalisation des flux",
          ],
        },
        {
          number: "02",
          title: "Monbarra",
          slug: "monbarra",
          category: "Produit RH / Recrutement",
          summary:
            "Une plateforme web full-stack qui connecte candidats et recruteurs autour d’offres d’emploi, de missions rapides et d’un parcours de recrutement structuré.",
          overview:
            "Monbarra réunit un frontend Next.js et une API NestJS pour couvrir le parcours de recrutement de bout en bout. Les candidats recherchent, comparent et sauvegardent des offres, suivent leurs candidatures et leurs entretiens. Les recruteurs publient leurs offres, pilotent leur pipeline ATS et échangent avec les talents depuis un espace dédié.",
          objective:
            "Centraliser la découverte des opportunités, la candidature et le suivi opérationnel du recrutement dans un produit cohérent, tout en proposant des modules complémentaires pour les missions rapides, les événements, la marque employeur et les contenus carrière.",
          technologies: [
            "Next.js 16",
            "React 18",
            "TypeScript",
            "NestJS 10",
            "PostgreSQL",
            "Prisma",
            "Redis",
            "Pusher",
            "Redux Toolkit",
            "SWR",
            "Tailwind CSS",
            "Docker",
            "Pino",
            "Cloudinary",
            "MinIO",
            "Semgrep",
            "Playwright",
            "Vitest",
            "Jest",
          ],
          highlights: [
            "Espaces distincts pour candidats, recruteurs et administrateurs",
            "Recherche, comparaison, favoris et recommandations d’offres",
            "Candidatures, entretiens, rappels et suivi du parcours",
            "ATS recruteur avec pipeline, scorecards, notes et équipe de recrutement",
            "Messagerie et notifications en temps réel avec Pusher",
            "Chap-Chap pour connecter professionnels et missions rapides",
            "Événements de recrutement, marque employeur et hub éditorial",
            "Authentification JWT / OTP, observabilité structurée et tests automatisés",
          ],
          links: [
            {
              href: "https://gitlab.com/marcEml/monbarra",
              label: "Frontend GitLab",
            },
            {
              href: "https://gitlab.com/marcEml/monbarra-backend",
              label: "Backend GitLab",
            },
          ],
        },
      ],
    en: [
        {
          number: "01",
          title: "Perimeter security lab",
          slug: "securite-perimetrique-lab",
          category: "Cybersecurity / Networks",
          summary:
            "A virtualized environment built to design, observe and test a segmented WAN / LAN / DMZ network architecture.",
          overview:
            "This lab recreates a complete perimeter security architecture around an OPNsense firewall. Proxmox VE hosts the different network segments, Kali Linux drives security test scenarios, and Ubuntu Server exposes the services located in the DMZ.",
          objective:
            "Build a reproducible environment to validate filtering rules, trace packet paths and precisely analyze traffic between network zones and the Internet.",
          technologies: [
            "Proxmox VE",
            "OPNsense",
            "Kali Linux",
            "Ubuntu Server",
            "Linux Bridge",
            "DHCP",
            "DNS",
            "NAT",
            "Firewall",
            "tcpdump",
          ],
          video: {
            src: "/assets/video/electric-gaze-21st.mp4",
            poster: "/assets/video/electric-gaze-poster.webp",
            label: "Observe, filter and understand traffic",
          },
          highlights: [
            "Virtualized WAN / LAN / DMZ architecture",
            "OPNsense firewall with stateful filtering",
            "Network segmentation",
            "Multi-segment DHCP and DNS",
            "NAT access to the Internet",
            "Kali Linux for security testing",
            "Ubuntu Server hosted in the DMZ",
            "Traffic analysis and logging",
          ],
        },
        {
          number: "02",
          title: "Monbarra",
          slug: "monbarra",
          category: "HR product / Recruitment",
          summary:
            "A full-stack web platform connecting candidates and recruiters through job opportunities, short-term assignments and a structured hiring journey.",
          overview:
            "Monbarra combines a Next.js frontend with a NestJS API to cover the recruitment journey end to end. Candidates can search, compare and save job listings, then track applications and interviews. Recruiters publish roles, manage their ATS pipeline and communicate with talent from a dedicated workspace.",
          objective:
            "Centralize opportunity discovery, applications and operational hiring follow-up in one consistent product, complemented by modules for short-term assignments, events, employer branding and career content.",
          technologies: [
            "Next.js 16",
            "React 18",
            "TypeScript",
            "NestJS 10",
            "PostgreSQL",
            "Prisma",
            "Redis",
            "Pusher",
            "Redux Toolkit",
            "SWR",
            "Tailwind CSS",
            "Docker",
            "Pino",
            "Cloudinary",
            "MinIO",
            "Semgrep",
            "Playwright",
            "Vitest",
            "Jest",
          ],
          highlights: [
            "Dedicated workspaces for candidates, recruiters and administrators",
            "Job search, comparison, saved listings and recommendations",
            "Applications, interviews, reminders and journey tracking",
            "Recruiter ATS with pipelines, scorecards, notes and hiring teams",
            "Real-time messaging and notifications powered by Pusher",
            "Chap-Chap connects professionals with short-term assignments",
            "Recruitment events, employer branding and an editorial hub",
            "JWT / OTP authentication, structured observability and automated tests",
          ],
          links: [
            {
              href: "https://gitlab.com/marcEml/monbarra",
              label: "Frontend GitLab",
            },
            {
              href: "https://gitlab.com/marcEml/monbarra-backend",
              label: "Backend GitLab",
            },
          ],
        },
      ],
  };

  const activeLanguage = isFrench ? "fr" : "en";
  const fallbackLanguage = isFrench ? "en" : "fr";
  const projectSlugs = Array.from(
    new Set(
      [...localizedProjects.fr, ...localizedProjects.en].map(
        (project) => project.slug,
      ),
    ),
  );
  const projects = projectSlugs
    .map(
      (slug) =>
        localizedProjects[activeLanguage].find(
          (project) => project.slug === slug,
        ) ??
        localizedProjects[fallbackLanguage].find(
          (project) => project.slug === slug,
        ),
    )
    .filter((project): project is Project => project !== undefined)
    .map((project, index) => ({
      ...project,
      number: String(index + 1).padStart(2, "0"),
    }));

  const gridMetrics = getProjectGridMetrics(projects.length);
  const spreadCards: StackSpreadCard[] = projects.map((project, index) => ({
    item: {
      id: project.slug,
      content: (
        <ProjectCard
          project={project}
          isFrench={isFrench}
          compact={projects.length > 2}
        />
      ),
    },
    ...getProjectCardLayout(index, projects.length, gridMetrics),
  }));

  return (
    <section
      id="projects"
      className="relative isolate scroll-mt-6 bg-brand-surface pt-24 sm:pt-28 lg:pt-32"
    >
      <div
        aria-hidden="true"
        className="oldart-floral-layer pointer-events-none absolute inset-x-0 top-0 z-0 h-[880px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
        }}
      >
        <Image
          src="/assets/oldart/147805.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
          {isFrench ? "05 — Mes projets" : "05 — My projects"}
        </p>
        <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          {isFrench
            ? "Des projets pensés comme des terrains d’expérimentation concrets."
            : "Projects designed as hands-on grounds for experimentation."}
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-brand-muted">
          {isFrench
            ? "Infrastructure, cybersécurité et produit numérique : chaque réalisation traduit un besoin en architecture, en fonctionnalités et en résultats observables."
            : "Infrastructure, cybersecurity and digital products: each project turns a need into architecture, features and observable outcomes."}
        </p>
      </div>

      <div className="relative z-[1]">
        <StackSpread
          cards={spreadCards}
          scrollLength={Math.min(380, 220 + projects.length * 15)}
          bgColor="transparent"
          textColor="rgb(var(--brand-navy))"
          horizontalUnit="percent"
          stackScale={0.86}
          cardRadius={0}
          textFadeStart={0.34}
          headline={
            isFrench ? (
              <>
                {projects.length} {projects.length === 1 ? "projet" : "projets"}.
                <br />
                <span className="text-brand-blue">
                  {projects.length} {projects.length === 1 ? "terrain" : "terrains"}.
                </span>
              </>
            ) : (
              <>
                {projects.length} {projects.length === 1 ? "project" : "projects"}.
                <br />
                <span className="text-brand-blue">
                  {projects.length} {projects.length === 1 ? "playground" : "playgrounds"}.
                </span>
              </>
            )
          }
          headlineClassName="mx-auto max-w-[9ch] text-[2.6vw] font-bold max-md:text-[8vw]"
          subtitle={
            isFrench
              ? "Explorez une carte pour découvrir l’architecture, les technologies et les points clés."
              : "Open a card to discover its architecture, technologies and key highlights."
          }
          subtitleClassName="mx-auto max-w-[24ch] text-[0.9vw] max-md:text-[3vw]"
          scrollHintLabel={isFrench ? "Faire défiler" : "Scroll to spread"}
          smallCard={{ w: gridMetrics.small.width, h: gridMetrics.small.height }}
          smallColX={gridMetrics.small.colX}
          smallScale={projects.length <= 2 ? 0.92 : projects.length <= 4 ? 0.9 : 0.86}
        />
      </div>
    </section>
  );
}

export default Projects;
