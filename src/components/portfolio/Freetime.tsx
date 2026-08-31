"use client";

import { Cpu, Dumbbell, Music2 } from "lucide-react";

import EightBitTimeline, { type TimelineStep } from "@/components/ui/8bitTimeline";
import { usePreferences } from "@/contexts/PreferencesContext";

export function Freetime() {
  const { language } = usePreferences();
  const isFrench = language === "fr";
  const interests: TimelineStep[] = [
    {
      icon: <Cpu className="size-7" strokeWidth={1.8} aria-hidden="true" />,
      title: isFrench ? "Technologie" : "Technology",
      description: isFrench
        ? "Explorer de nouveaux outils, suivre les évolutions du numérique et expérimenter au travers de projets personnels."
        : "Exploring new tools, keeping up with digital trends and experimenting through personal projects.",
    },
    {
      icon: <Music2 className="size-7" strokeWidth={1.8} aria-hidden="true" />,
      title: isFrench ? "Musique" : "Music",
      description: isFrench
        ? "Une source d’inspiration et de concentration qui accompagne aussi bien les temps créatifs que les moments de pause."
        : "A source of inspiration and focus that accompanies both creative sessions and moments of rest.",
    },
    {
      icon: <Dumbbell className="size-7" strokeWidth={1.8} aria-hidden="true" />,
      title: isFrench ? "Sport" : "Sports",
      description: isFrench
        ? "Cultiver la discipline, l’endurance et l’équilibre au-delà des projets techniques et professionnels."
        : "Building discipline, endurance and balance beyond technical and professional projects.",
    },
  ];

  return (
    <EightBitTimeline
      id="freetime"
      eyebrow={isFrench ? "06 — Loisirs et centres d’intérêt" : "06 — Interests"}
      title={isFrench ? "Ce qui nourrit ma curiosité." : "What fuels my curiosity."}
      description={isFrench ? "Trois univers qui entretiennent ma créativité, mon énergie et mon envie d’apprendre." : "Three worlds that nurture my creativity, energy and desire to learn."}
      steps={interests}
    />
  );
}

export default Freetime;
