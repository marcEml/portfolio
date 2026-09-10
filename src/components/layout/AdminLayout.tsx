"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PreferenceControls } from "@/components/layout/PreferenceControls";
import { Sidebar } from "@/components/layout/Sidebar";
import { usePreferences } from "@/contexts/PreferencesContext";

const PORTFOLIO_SECTION_IDS = [
  "home",
  "about",
  "skills",
  "cursus",
  "certifications",
  "projects",
  "experience",
  "freetime",
  "cv",
  "contact",
] as const;

export function AdminLayout({
  children,
  fullBleed = false,
}: {
  children: React.ReactNode;
  fullBleed?: boolean;
}) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = usePreferences();
  const isFrench = language === "fr";
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLElement>(null);

  const handleSelect = useCallback((id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const closeMobileMenu = useCallback((restoreFocus = false) => {
    setIsMobileMenuOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    }
  }, []);

  const handleMobileSelect = useCallback(
    (id: string) => {
      handleSelect(id);
      closeMobileMenu();
    },
    [closeMobileMenu, handleSelect],
  );

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const marker = Math.min(window.innerHeight * 0.34, 300);
        let nextSection: string = PORTFOLIO_SECTION_IDS[0];

        for (const id of PORTFOLIO_SECTION_IDS) {
          const section = document.getElementById(id);
          if (!section) continue;

          const bounds = section.getBoundingClientRect();
          if (bounds.top <= marker) nextSection = id;
          if (bounds.top <= marker && bounds.bottom > marker) break;
        }

        setActiveSection((current) => (current === nextSection ? current : nextSection));
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = mobileDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMobileMenu, isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-app-bg">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 bg-brand-navy px-4 py-3 text-sm font-bold text-brand-surface transition-transform focus:translate-y-0"
      >
        {isFrench ? "Aller au contenu" : "Skip to content"}
      </a>

      <div className="pointer-events-none fixed inset-x-4 top-4 z-50 flex items-start justify-between lg:hidden">
        <button
          ref={menuButtonRef}
          type="button"
          aria-controls="mobile-portfolio-navigation"
          aria-expanded={isMobileMenuOpen}
          aria-label={isFrench ? "Ouvrir la navigation" : "Open navigation"}
          onClick={() => setIsMobileMenuOpen(true)}
          className="pointer-events-auto inline-flex size-11 items-center justify-center border border-brand-border bg-brand-surface text-brand-navy shadow-[4px_4px_0_rgb(var(--brand-blue))] transition hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
        <div className="pointer-events-auto">
          <PreferenceControls compact />
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-brand-navy/55 backdrop-blur-[2px]"
            aria-label={isFrench ? "Fermer la navigation" : "Close navigation"}
            onClick={() => closeMobileMenu(true)}
          />
          <aside
            ref={mobileDialogRef}
            id="mobile-portfolio-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="relative h-full w-[min(88vw,360px)] border-r border-brand-border bg-brand-surface shadow-2xl"
          >
            <div className="absolute right-3 top-3 z-10">
              <button
                type="button"
                autoFocus
                onClick={() => closeMobileMenu(true)}
                aria-label={isFrench ? "Fermer la navigation" : "Close navigation"}
                className="inline-flex size-10 items-center justify-center border border-brand-border bg-brand-surface text-brand-navy transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <h2 id="mobile-navigation-title" className="sr-only">
              {isFrench ? "Navigation du portfolio" : "Portfolio navigation"}
            </h2>
            <Sidebar
              className="border-r-0 pt-14"
              activeId={activeSection}
              onSelect={handleMobileSelect}
              onNavigate={() => closeMobileMenu(true)}
              showPreferences={false}
            />
          </aside>
        </div>
      ) : null}

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] lg:block">
        <Sidebar className="w-full" activeId={activeSection} onSelect={handleSelect} />
      </aside>

      <div className="min-h-screen min-w-0 lg:pl-[260px]">
        <main
          id="main-content"
          tabIndex={-1}
          className={
            fullBleed
              ? "fade-in w-full"
              : "fade-in mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8"
          }
        >
          {fullBleed ? null : <Breadcrumb />}
          {children}
        </main>
      </div>
    </div>
  );
}
