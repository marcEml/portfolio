"use client";

import { StackingCards, type StackingCardItem } from "@/components/ui/StackingCard";
import { usePreferences } from "@/contexts/PreferencesContext";

export function Certifications() {
  const { language } = usePreferences();
  const isFrench = language === "fr";
  const certificates: StackingCardItem[] = [
    {
      title: "CCNAv7: Enterprise Networking, Security, and Automation",
      issuer: "Cisco Networking Academy",
      date: isFrench ? "9 décembre 2024" : "December 9, 2024",
      description: isFrench
        ? "Certification consacrée aux architectures réseau d’entreprise, aux mécanismes de sécurité, au routage avancé et à l’automatisation des infrastructures."
        : "Certification covering enterprise network architectures, security mechanisms, advanced routing and infrastructure automation.",
      certificateId: "4e9156ab-3eb0-4642-9d0e-37d059e4712b",
      skills: isFrench
        ? ["Réseaux d’entreprise", "Sécurité", "OSPF", "WAN", "Automatisation"]
        : ["Enterprise networking", "Security", "OSPF", "WAN", "Automation"],
      imageSrc: "/assets/certificates/previews/ccna-enterprise.png",
      imageAlt: isFrench
        ? "Certificat Cisco CCNAv7 Enterprise Networking, Security, and Automation"
        : "Cisco CCNAv7 Enterprise Networking, Security, and Automation certificate",
    },
    {
      title: "CyberOps Associate",
      issuer: "Cisco Networking Academy",
      date: isFrench ? "7 mai 2024" : "May 7, 2024",
      description: isFrench
        ? "Certification validant les fondamentaux des opérations de cybersécurité, de la surveillance des événements à l’analyse et au traitement des incidents."
        : "Certification validating the fundamentals of cybersecurity operations, from event monitoring to incident analysis and response.",
      certificateId: "ab64d9ad-b64f-46f7-9fa9-ae899e427a13",
      skills: isFrench
        ? ["Opérations de sécurité", "Analyse d’incidents", "SOC", "Menaces", "Supervision"]
        : ["Security operations", "Incident analysis", "SOC", "Threats", "Monitoring"],
      imageSrc: "/assets/certificates/previews/cyberops-associate.png",
      imageAlt: isFrench ? "Certificat Cisco CyberOps Associate" : "Cisco CyberOps Associate certificate",
    },
  ];

  return (
    <section id="certifications" className="scroll-mt-6 bg-brand-ivory pt-24 sm:pt-28 lg:pt-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
          04 — Certifications
        </p>
        <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          {isFrench
            ? "Des compétences validées par Cisco Networking Academy."
            : "Skills validated by Cisco Networking Academy."}
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-brand-muted">
          {isFrench
            ? "Deux certifications qui consolident mon expertise en réseaux d’entreprise, automatisation et opérations de cybersécurité."
            : "Two certifications strengthening my expertise in enterprise networking, automation and cybersecurity operations."}
        </p>
      </div>

      <StackingCards items={certificates} />
    </section>
  );
}

export default Certifications;
