"use client";

import Image from "next/image";
import { CheckCircle2, MapPin } from "lucide-react";
import { SiOrange } from "react-icons/si";
import { Timeline } from "@/components/ui/timeline";
import { usePreferences } from "@/contexts/PreferencesContext";

function ExperienceCard({
  role,
  company,
  location,
  context,
  missions,
  technologies,
  logo,
  photo,
}: {
  role: string;
  company: string;
  location: string;
  context: string;
  missions: string[];
  technologies: string[];
  logo?: {
    src: string;
    alt: string;
  };
  photo?: {
    src: string;
    alt: string;
  };
}) {
  const { language } = usePreferences();
  const isFrench = language === "fr";

  return (
    <article className="overflow-hidden border border-brand-border bg-brand-surface shadow-[0_18px_55px_rgba(17,24,43,0.07)]">
      <div className="border-b border-brand-border p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            {logo ? (
              <span className="relative flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden border border-brand-border bg-white p-1.5">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="96px"
                  className="object-contain p-1.5"
                />
              </span>
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#FF7900] text-white">
                <SiOrange className="h-7 w-7" aria-hidden="true" />
              </span>
            )}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">
                {company}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-brand-navy">
                {role}
              </h3>
            </div>
          </div>
          <p className="flex shrink-0 items-center gap-2 text-sm text-brand-muted">
            <MapPin size={15} aria-hidden="true" />
            {location}
          </p>
        </div>
        <p className="mt-5 leading-relaxed text-brand-muted">{context}</p>
      </div>

      <div className="p-6 sm:p-8">
        <ul
          className="space-y-4"
          aria-label={isFrench ? "Missions principales" : "Key responsibilities"}
        >
          {missions.map((mission) => (
            <li key={mission} className="flex gap-3 leading-relaxed text-brand-navy-soft">
              <CheckCircle2
                size={18}
                className="mt-1 shrink-0 text-brand-blue"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span>{mission}</span>
            </li>
          ))}
        </ul>

        <ul
          className="mt-7 flex flex-wrap gap-2"
          aria-label={isFrench ? "Technologies utilisées" : "Technologies used"}
        >
          {technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-brand-border bg-brand-ivory px-3 py-1 text-xs font-medium text-brand-muted"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>

      {photo && (
        <span className="relative flex w-full shrink-0 items-center justify-center overflow-hidden border border-brand-border bg-white h-[400px]">
          <Image src={photo.src} alt={photo.alt} fill sizes="400px" className="object-cover" />
        </span>
      )}
    </article>
  );
}

export function Experience() {
  const { language } = usePreferences();
  const isFrench = language === "fr";
  const timelineData = [
    {
      title: isFrench ? "Depuis sept. 2025" : "Since Sep. 2025",
      content: (
        <ExperienceCard
          role={
            isFrench
              ? "Ingénieur DevOps — Automatisation des plateformes de test"
              : "DevOps Engineer — Test platform automation"
          }
          company="Orange Innovation"
          location="Cesson-Sévigné, France"
          context={
            isFrench
              ? "Contrat de professionnalisation sur un projet R&D consacré aux performances et à la scalabilité de contrôleurs WAN-SDN."
              : "Work-study position on an R&D project focused on WAN-SDN controller performance and scalability."
          }
          missions={
            isFrench
              ? [
                  "Automatisation des tests de benchmarking des contrôleurs WAN-SDN référencés par le groupe.",
                  "Automatisation avec Ansible et Python du cycle de vie de laboratoires Docker et ContainerLab représentant 100 routeurs virtualisés.",
                  "Industrialisation de la définition des campagnes de tests.",
                  "Génération et configuration de plus de 10 000 services VPN via Cisco NSO, NETCONF et RESTCONF sur une architecture multi-constructeurs.",
                  "Conception et exécution de benchmarks de contrôleurs WAN-SDN, avec mesure de la latence, du débit et de la scalabilité.",
                  "Supervision avec Otelcol, Prometheus, Grafana et AlertManager puis centralisation des logs et traces avec ELK, Kibana et Jaeger.",
                ]
              : [
                  "Automated benchmark testing for the WAN-SDN controllers approved by the group.",
                  "Automated the lifecycle of Docker and ContainerLab labs representing 100 virtualized routers using Ansible and Python.",
                  "Industrialized the definition of test campaigns.",
                  "Generated and configured more than 10,000 VPN services through Cisco NSO, NETCONF and RESTCONF across a multi-vendor architecture.",
                  "Designed and ran WAN-SDN controller benchmarks measuring latency, throughput and scalability.",
                  "Monitored systems with Otelcol, Prometheus, Grafana and AlertManager, and centralized logs and traces with ELK, Kibana and Jaeger.",
                ]
          }
          technologies={[
            "Bash",
            "Ansible",
            "Python",
            "Docker",
            "ContainerLab",
            "Cisco NSO",
            "NETCONF",
            "Prometheus",
            "Grafana",
            "Jaeger",
            "Otelcol",
            "ELK",
          ]}
        />
      ),
    },
    {
      title: isFrench ? "Mars — août 2025" : "Mar. — Aug. 2025",
      content: (
        <ExperienceCard
          role={
            isFrench
              ? "Stage Ingénieur DevOps — Automatisation des réseaux IP"
              : "DevOps Engineering Internship — IP network automation"
          }
          company="Orange Innovation"
          location="Cesson-Sévigné, France"
          context={
            isFrench
              ? "Projet R&D portant sur l’administration et l’automatisation d’une plateforme WAN-SDN cloud-native."
              : "R&D project involving the administration and automation of a cloud-native WAN-SDN platform."
          }
          missions={
            isFrench
              ? [
                  "Installation et administration du contrôleur Juniper Paragon Automation, plateforme cloud-native déployée sur un cluster Kubernetes.",
                  "Gestion d’un réseau de laboratoire multi-constructeurs à l’aide du contrôleur.",
                  "Automatisation de la création de services L3VPN à l’aide de scripts et des API NETCONF et RESTCONF.",
                  "Collaboration avec les constructeurs pour la montée en compétence et l’évaluation de la solution.",
                ]
              : [
                  "Installed and administered Juniper Paragon Automation, a cloud-native platform deployed on a Kubernetes cluster.",
                  "Managed a multi-vendor lab network through the controller.",
                  "Automated L3VPN service creation using scripts and NETCONF and RESTCONF APIs.",
                  "Worked with vendors to build expertise and evaluate the solution.",
                ]
          }
          technologies={["Kubernetes", "Juniper Paragon", "L3VPN", "NETCONF", "RESTCONF", "Python"]}
        />
      ),
    },
    {
      title: isFrench ? "Janv. — août 2023" : "Jan. — Aug. 2023",
      content: (
        <ExperienceCard
          role={isFrench ? "Stage Développeur logiciel" : "Software Developer Internship"}
          company="Orange Digital Center"
          location={isFrench ? "Abidjan, Côte d’Ivoire" : "Abidjan, Ivory Coast"}
          photo={{
            src: "/assets/photos/137.png",
            alt: isFrench
              ? "Photo de la cérémonie de présentation des projets"
              : "Logo of the Ivory Coast Ministry of Planning and Development",
          }}
          context={
            isFrench
              ? "Conception d’un système connecté d’aide à la mobilité des personnes malvoyantes."
              : "Designed a connected mobility assistance system for visually impaired people."
          }
          missions={
            isFrench
              ? [
                  "Recueillir et analyser les besoins auprès des parties prenantes (utilisateurs malvoyants, encadrants) afin de définir les fonctionnalités clés du système.",
                  "Concevoir l'architecture globale de la canne connectée, intégrant capteurs de détection d'obstacles, caméra de reconnaissance d'objets, système audio et module de communication.",
                  "Participer à la conception et au design du système électronique embarqué, en collaboration avec les équipes hardware.",
                  "Développer une application mobile connectée au dispositif, permettant la collecte et la remontée de métriques d'utilisation.",
                  "Intégrer et tester les différents modules matériels et logiciels afin de garantir la fiabilité du prototype (détection d'obstacles, retour audio, communication).",
                  "Réaliser des tests fonctionnels et des itérations sur le prototype à partir des retours utilisateurs et des parties prenantes.",
                  "Documenter les choix techniques, les contraintes de conception et les résultats obtenus tout au long du projet.",
                ]
              : [
                  "Gathered and analyzed stakeholder needs, including those of visually impaired users and supervisors, to define the system’s key features.",
                  "Designed the connected cane’s overall architecture, integrating obstacle detection sensors, an object recognition camera, an audio system and a communication module.",
                  "Contributed to the embedded electronics design in collaboration with the hardware teams.",
                  "Developed a mobile application connected to the device to collect and report usage metrics.",
                  "Integrated and tested hardware and software modules to ensure prototype reliability across obstacle detection, audio feedback and communication.",
                  "Ran functional tests and iterated on the prototype using feedback from users and stakeholders.",
                  "Documented technical decisions, design constraints and results throughout the project.",
                ]
          }
          technologies={
            isFrench
              ? [
                  "Flutter",
                  "Express JS",
                  "Web Socket",
                  "IoT",
                  "Capteurs",
                  "Vision par ordinateur",
                  "Prototypage",
                  "Raspberry Pi 4",
                  "Python",
                  "Modélisation 3D AutoCAD",
                ]
              : [
                  "Flutter",
                  "Express JS",
                  "WebSocket",
                  "IoT",
                  "Sensors",
                  "Computer vision",
                  "Prototyping",
                  "Raspberry Pi 4",
                  "Python",
                  "AutoCAD 3D modeling",
                ]
          }
        />
      ),
    },
    {
      title: isFrench ? "Juin — août 2022" : "Jun. — Aug. 2022",
      content: (
        <ExperienceCard
          role={isFrench ? "Stage Développeur logiciel" : "Software Developer Internship"}
          company={
            isFrench
              ? "Direction des affaires financières du Ministère du Plan et du développement"
              : "Financial Affairs Directorate, Ministry of Planning and Development"
          }
          location={isFrench ? "Abidjan, Côte d’Ivoire" : "Abidjan, Ivory Coast"}
          context={
            isFrench
              ? "Conception d’un système de gestion des primes trimestrielles."
              : "Designed a quarterly bonus management system."
          }
          logo={{
            src: "/assets/experience/ministere-plan-developpement.png",
            alt: isFrench
              ? "Logo du Ministère du Plan et du Développement de Côte d’Ivoire"
              : "Logo of the Ivory Coast Ministry of Planning and Development",
          }}
          missions={
            isFrench
              ? [
                  "Développement des opérations CRUD pour la gestion des informations des employés.",
                  "Automatisation de la génération des fiches de paie.",
                ]
              : [
                  "Developed CRUD operations to manage employee information.",
                  "Automated payslip generation.",
                ]
          }
          technologies={["PHP", "HTML", "CSS", "Javascript"]}
        />
      ),
    },
  ];

  return (
    <section id="experience" className="scroll-mt-6 bg-brand-ivory">
      <Timeline
        data={timelineData}
        eyebrow={isFrench ? "05 — Expériences" : "05 — Experience"}
        heading={
          isFrench
            ? "Des expériences à la croisée du logiciel, du DevOps et des réseaux."
            : "Experience at the intersection of software, DevOps and networking."
        }
        description={
          isFrench
            ? "Un parcours professionnel construit autour de l’automatisation, de la fiabilité des plateformes et de la résolution de problèmes concrets."
            : "A professional journey centered on automation, platform reliability and solving real-world problems."
        }
      />
    </section>
  );
}

export default Experience;
