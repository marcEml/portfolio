"use client";

import { ArrowUp, Github, Gitlab, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

import { socialLinks } from "@/config/portfolioLinks";
import { usePreferences } from "@/contexts/PreferencesContext";

const navigation = [
  { id: "home", fr: "Accueil", en: "Home" },
  { id: "about", fr: "À propos", en: "About" },
  { id: "skills", fr: "Compétences", en: "Skills" },
  { id: "cursus", fr: "Cursus", en: "Education" },
  { id: "certifications", fr: "Certifications", en: "Certifications" },
  { id: "projects", fr: "Projets", en: "Projects" },
  { id: "experience", fr: "Expériences", en: "Experience" },
  { id: "freetime", fr: "Loisirs", en: "Interests" },
  { id: "cv", fr: "CV", en: "Résumé" },
  { id: "contact", fr: "Contact", en: "Contact" },
] as const;

const networks = [
  { name: "LinkedIn", href: socialLinks.linkedin, icon: Linkedin },
  { name: "GitHub", href: socialLinks.github, icon: Github },
  { name: "GitLab", href: socialLinks.gitlab, icon: Gitlab },
] as const;

export function Footer() {
  const { language } = usePreferences();
  const isFrench = language === "fr";

  return (
    <footer
      id="footer"
      className="relative scroll-mt-0 overflow-hidden border-t border-brand-border bg-brand-surface px-6 pb-20 pt-12 text-brand-navy sm:px-10 sm:pb-14 lg:px-16 lg:py-14"
    >
      <div
        aria-hidden="true"
        className="oldart-footer-garden pointer-events-none absolute inset-x-0 bottom-0 h-[115%]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 38%, black 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 38%, black 100%)",
        }}
      >
        <Image
          src="/assets/oldart/background-with-flowers-butterflies.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-9 sm:flex-row sm:items-center sm:justify-between">
          <a href="#home" className="group inline-flex w-fit items-center gap-4" aria-label={isFrench ? "Retour à l’accueil" : "Back to home"}>
            <span className="relative font-display text-4xl font-bold leading-none tracking-[-0.12em] text-brand-navy">
              B<span className="text-brand-blue">R</span>
            </span>
            <span className="leading-tight">
              <strong className="block text-sm text-brand-navy">Marc-Emmanuel</strong>
              <span className="block text-sm text-brand-muted">Brou</span>
            </span>
          </a>

          <div className="flex flex-col gap-5 sm:items-end">
            <a
              href="mailto:by.marc.eml@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition-colors hover:text-brand-blue"
            >
              <Mail className="size-4" strokeWidth={1.8} aria-hidden="true" />
              by.marc.eml@gmail.com
            </a>

            <nav className="flex items-center gap-2" aria-label={isFrench ? "Réseaux sociaux" : "Social media"}>
              {networks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-brand-border text-brand-navy transition duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:bg-brand-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="my-9 h-px bg-brand-border" aria-hidden="true" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <nav aria-label={isFrench ? "Navigation du pied de page" : "Footer navigation"}>
            <ul className="flex max-w-3xl flex-wrap gap-x-6 gap-y-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group relative inline-block pb-1 text-sm font-bold text-brand-navy transition-colors hover:text-brand-blue"
                  >
                    {isFrench ? item.fr : item.en}
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-brand-blue transition-[width] duration-300 group-hover:w-full"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="max-w-lg text-sm leading-relaxed text-brand-muted lg:pr-14 lg:text-right">
            © {new Date().getFullYear()} Yao Marc-Emmanuel BROU. {isFrench ? "Tous droits réservés." : "All rights reserved."}
            <span className="mx-1.5 text-brand-border" aria-hidden="true">|</span>
            {isFrench ? "Conçu et développé par Marc-Emmanuel Brou." : "Designed and developed by Marc-Emmanuel Brou."}
          </p>
        </div>
      </div>

      <a
        href="#home"
        aria-label={isFrench ? "Revenir en haut de la page" : "Back to top"}
        className="absolute bottom-5 right-5 inline-flex size-12 items-center justify-center rounded-full bg-brand-navy text-brand-surface transition duration-200 hover:-translate-y-1 hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:bottom-7 sm:right-7"
      >
        <ArrowUp className="size-5" strokeWidth={2} aria-hidden="true" />
      </a>
    </footer>
  );
}

export default Footer;
