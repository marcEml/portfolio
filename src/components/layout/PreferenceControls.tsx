"use client";

import { Languages, Moon, Sun } from "lucide-react";

import { usePreferences } from "@/contexts/PreferencesContext";
import { cn } from "@/utils/utils";

export function PreferenceControls({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, theme, toggleTheme } = usePreferences();
  const isFrench = language === "fr";
  const nextThemeLabel =
    theme === "light"
      ? isFrench
        ? "Activer le thème sombre"
        : "Enable dark theme"
      : isFrench
        ? "Activer le thème clair"
        : "Enable light theme";

  return (
    <div
      className={cn(
        "flex items-center border border-brand-border bg-brand-surface p-1 shadow-[4px_4px_0_rgb(var(--brand-blue))]",
        compact ? "gap-1" : "w-full justify-between gap-2",
      )}
      aria-label={isFrench ? "Préférences du site" : "Site preferences"}
    >
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "inline-flex h-9 items-center justify-center gap-2 text-brand-muted transition-colors hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue",
          compact ? "w-9" : "min-w-0 flex-1 px-2 text-xs font-semibold",
        )}
        aria-label={nextThemeLabel}
        title={nextThemeLabel}
      >
        {theme === "light" ? (
          <Moon className="size-4 shrink-0" aria-hidden="true" />
        ) : (
          <Sun className="size-4 shrink-0" aria-hidden="true" />
        )}
        {compact ? null : <span>{theme === "light" ? (isFrench ? "Sombre" : "Dark") : isFrench ? "Clair" : "Light"}</span>}
      </button>

      <span className="h-5 w-px bg-brand-border" aria-hidden="true" />

      <div className="flex items-center gap-1" role="group" aria-label={isFrench ? "Choisir la langue" : "Choose language"}>
        {compact ? <Languages className="mx-1 size-4 text-brand-muted" aria-hidden="true" /> : null}
        {(["fr", "en"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            className={cn(
              "h-8 min-w-8 px-1.5 font-mono text-[11px] font-bold uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue",
              language === option
                ? "bg-brand-blue text-white"
                : "text-brand-muted hover:text-brand-blue",
            )}
            aria-pressed={language === option}
            aria-label={option === "fr" ? "Français" : "English"}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PreferenceControls;
