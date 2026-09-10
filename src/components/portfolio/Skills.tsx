"use client";

import type { ElementType } from "react";
import { Activity, Network, ScanSearch, ShieldCheck } from "lucide-react";
import { usePreferences } from "@/contexts/PreferencesContext";
import {
  SiAnsible,
  SiCisco,
  SiDocker,
  SiElastic,
  SiGitlab,
  SiGnubash,
  SiGrafana,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiJunipernetworks,
  SiNestjs,
  SiNokia,
  SiOwasp,
  SiPostgresql,
  SiMysql,
  SiPrometheus,
  SiProxmox,
  SiPython,
  SiReact,
  SiKalilinux,
  SiOpnsense,
  SiSnyk,
  SiSonarqubeserver,
  SiTerraform,
  SiJaeger,
  SiUbuntu,
} from "react-icons/si";

import Image from "next/image";

type Skill = {
  name: string;
  detail?: string;
  level: number;
  icon: ElementType;
  color: string;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const getSkillCategories = (isFrench: boolean): SkillCategory[] => [
  {
    title: isFrench ? "Développement" : "Development",
    skills: [
      {
        name: "Python",
        detail: isFrench ? "Scripting & automatisation" : "Scripting & automation",
        level: 5,
        icon: SiPython,
        color: "#3776AB",
      },
      {
        name: "Bash / Shell",
        detail: isFrench ? "Scripting système" : "System scripting",
        level: 4,
        icon: SiGnubash,
        color: "#293137",
      },
      {
        name: "JavaScript",
        detail: "Web & API REST",
        level: 4,
        icon: SiJavascript,
        color: "#E8B900",
      },
      {
        name: "React / Next.js",
        detail: isFrench ? "Interfaces web" : "Web interfaces",
        level: 4,
        icon: SiReact,
        color: "#087EA4",
      },
      { name: "NestJS", detail: "Backend Node.js", level: 3, icon: SiNestjs, color: "#E0234E" },
      {
        name: "PostgreSQL",
        detail: isFrench ? "Bases de données" : "Databases",
        level: 3,
        icon: SiPostgresql,
        color: "#4169E1",
      },
      {
        name: "MySQL",
        detail: isFrench ? "Bases de données" : "Databases",
        level: 3,
        icon: SiMysql,
        color: "#4169E1",
      },
    ],
  },
  {
    title: isFrench ? "CI/CD & automatisation" : "CI/CD & automation",
    skills: [
      {
        name: "Ansible",
        detail: isFrench ? "Configuration & déploiement" : "Configuration & deployment",
        level: 5,
        icon: SiAnsible,
        color: "#EE0000",
      },
      {
        name: "GitLab CI/CD",
        detail: "Pipelines build, test, deploy",
        level: 4,
        icon: SiGitlab,
        color: "#FC6D26",
      },
      {
        name: "Jenkins",
        detail: isFrench ? "Intégration continue" : "Continuous integration",
        level: 2,
        icon: SiJenkins,
        color: "#D24939",
      },
    ],
  },
  {
    title: isFrench ? "Conteneurisation & infrastructure" : "Containerization & infrastructure",
    skills: [
      {
        name: "Docker",
        detail: "ContainerLab & packaging",
        level: 5,
        icon: SiDocker,
        color: "#2496ED",
      },
      {
        name: "Kubernetes",
        detail: "Orchestration cloud-native",
        level: 4,
        icon: SiKubernetes,
        color: "#326CE5",
      },
      {
        name: "Terraform",
        detail: "Infrastructure as Code",
        level: 3,
        icon: SiTerraform,
        color: "#844FBA",
      },
      {
        name: "Proxmox VE",
        detail: isFrench ? "Virtualisation & Linux Bridge" : "Virtualization & Linux Bridge",
        level: 4,
        icon: SiProxmox,
        color: "#E57000",
      },
      {
        name: "Ubuntu Server",
        detail: isFrench ? "Services Linux & DMZ" : "Linux services & DMZ",
        level: 4,
        icon: SiUbuntu,
        color: "#E95420",
      },
    ],
  },
  {
    title: isFrench ? "Réseaux & orchestration SDN" : "Networking & SDN orchestration",
    skills: [
      {
        name: "Cisco",
        detail: isFrench ? "Configuration de routeurs" : "Router configuration",
        level: 4,
        icon: SiCisco,
        color: "#1BA0D7",
      },
      {
        name: "Juniper",
        detail: isFrench ? "Configuration de routeurs" : "Router configuration",
        level: 4,
        icon: SiJunipernetworks,
        color: "#84B135",
      },
      {
        name: "Nokia",
        detail: isFrench ? "Configuration de routeurs" : "Router configuration",
        level: 3,
        icon: SiNokia,
        color: "#124191",
      },
      {
        name: "Cisco NSO",
        detail: isFrench ? "Orchestration de services réseau" : "Network service orchestration",
        level: 5,
        icon: SiCisco,
        color: "#1BA0D7",
      },
    ],
  },
  {
    title: isFrench ? "Sécurité réseau & services" : "Network security & services",
    skills: [
      {
        name: "OPNsense",
        detail: isFrench ? "Pare-feu stateful & filtrage" : "Stateful firewall & filtering",
        level: 4,
        icon: SiOpnsense,
        color: "#D94F00",
      },
      {
        name: "Kali Linux",
        detail: isFrench ? "Tests et validation réseau" : "Network testing & validation",
        level: 4,
        icon: SiKalilinux,
        color: "#557C94",
      },
      {
        name: isFrench ? "Segmentation réseau" : "Network segmentation",
        detail: "WAN / LAN / DMZ",
        level: 4,
        icon: ShieldCheck,
        color: "#315875",
      },
      {
        name: "DHCP / DNS / NAT",
        detail: isFrench ? "Services multi-segments" : "Multi-segment services",
        level: 4,
        icon: Network,
        color: "#97653E",
      },
      {
        name: "tcpdump",
        detail: isFrench ? "Capture & analyse des flux" : "Traffic capture & analysis",
        level: 4,
        icon: Activity,
        color: "#484540",
      },
    ],
  },
  {
    title: isFrench ? "Sécurité applicative" : "Application security",
    skills: [
      {
        name: "Semgrep",
        detail: isFrench ? "Analyse statique — SAST" : "Static analysis — SAST",
        level: 4,
        icon: ScanSearch,
        color: "#6C47FF",
      },
      {
        name: "Snyk",
        detail: isFrench ? "SAST & analyse des dépendances" : "SAST & dependency analysis",
        level: 3,
        icon: SiSnyk,
        color: "#4C4A73",
      },
      {
        name: "OWASP ZAP",
        detail: isFrench ? "Tests dynamiques — DAST" : "Dynamic testing — DAST",
        level: 4,
        icon: SiOwasp,
        color: "#1D7A8C",
      },
      {
        name: "SonarQube",
        detail: isFrench ? "Qualité & sécurité du code" : "Code quality & security",
        level: 3,
        icon: SiSonarqubeserver,
        color: "#126ED3",
      },
    ],
  },
  {
    title: isFrench ? "Observabilité & monitoring" : "Observability & monitoring",
    skills: [
      {
        name: "Prometheus",
        detail: isFrench ? "Métriques & alerting" : "Metrics & alerting",
        level: 4,
        icon: SiPrometheus,
        color: "#E6522C",
      },
      {
        name: "Grafana",
        detail: isFrench ? "Dashboards & supervision" : "Dashboards & monitoring",
        level: 4,
        icon: SiGrafana,
        color: "#F46800",
      },
      {
        name: "Elastic Stack",
        detail: "Logs, ELK & Kibana",
        level: 4,
        icon: SiElastic,
        color: "#00BFB3",
      },
      {
        name: "Jaeger",
        detail: "Monitoring, Visualization",
        level: 4,
        icon: SiJaeger,
        color: "#00BFB3",
      },
    ],
  },
];

function SkillLevel({ level, name, isFrench }: { level: number; name: string; isFrench: boolean }) {
  return (
    <div
      className="mt-3 flex justify-center gap-1"
      aria-label={
        isFrench ? `Niveau ${level} sur 5 pour ${name}` : `Level ${level} out of 5 for ${name}`
      }
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={index < level ? "text-brand-blue" : "text-brand-blue/15"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function SkillItem({ skill, isFrench }: { skill: Skill; isFrench: boolean }) {
  const Icon = skill.icon;

  return (
    <article className="group flex min-h-[210px] flex-col items-center px-2 text-center sm:min-h-[230px]">
      <div className="flex h-24 items-center justify-center sm:h-28">
        <Icon
          aria-hidden="true"
          className="h-[72px] w-[72px] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 sm:h-20 sm:w-20"
          style={{ color: skill.color }}
        />
      </div>
      <h4 className="mt-4 text-base font-medium text-brand-navy sm:text-lg">{skill.name}</h4>
      {skill.detail ? (
        <p className="mt-1 min-h-10 text-sm leading-snug text-brand-muted">{skill.detail}</p>
      ) : null}
      <SkillLevel level={skill.level} name={skill.name} isFrench={isFrench} />
    </article>
  );
}

export function Skills() {
  const { language } = usePreferences();
  const isFrench = language === "fr";
  const skillCategories = getSkillCategories(isFrench);

  return (
    <section
      id="skills"
      className="relative scroll-mt-6 bg-brand-ivory px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="oldart-floral-layer pointer-events-none absolute inset-x-0 -top-0 z-0 h-[750px]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
        }}
      >
        <Image
          src="/assets/oldart/grayscale-shot-marble-statue-female-lights.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
          {isFrench ? "02 — Compétences" : "02 — Skills"}
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          {isFrench ? "Compétences techniques" : "Technical skills"}
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-brand-muted">
          {isFrench
            ? "Technologies et outils mobilisés dans mes expériences en développement logiciel, DevOps, NetOps, SRE et cybersécurité."
            : "Technologies and tools used throughout my software development, DevOps, NetOps, SRE and cybersecurity experience."}
        </p>

        <div className="mt-16 space-y-20 lg:space-y-24">
          {skillCategories.map((category) => {
            const categoryId = `skills-${category.title.toLowerCase().replaceAll(" ", "-")}`;

            return (
              <section key={category.title} aria-labelledby={categoryId}>
                <p
                  id={categoryId}
                  className="font-display text-3xl font-bold tracking-tight text-brand-navy"
                >
                  {category.title}
                </p>
                <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {category.skills.map((skill) => (
                    <SkillItem key={skill.name} skill={skill} isFrench={isFrench} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
