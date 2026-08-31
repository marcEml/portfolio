"use client";

import { usePreferences } from "@/contexts/PreferencesContext";

export function About() {
  const { language } = usePreferences();
  const isFrench = language === "fr";

  return (
    <section
      id="about"
      className="scroll-mt-6 border-t border-brand-border bg-brand-surface px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto flex flex-col gap-12">
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          {isFrench ? "À propos de moi" : "About me"}
        </h2>

        <div className="space-y-6 text-lg leading-relaxed text-brand-muted">
          <p className="text-justify">
            {isFrench
              ? "Étudiant ingénieur à l’IMT Atlantique, actuellement ingénieur DevOps chez Orange Innovation. Expertise en automatisation des pipelines CI/CD, conteneurisation (Docker, Kubernetes), Infrastructure as Code (Terraform, Ansible), observabilité (Prometheus, Grafana, ELK) et scripting (Python, Bash). Expérience dans la gestion de plateformes Kubernetes, l’industrialisation des déploiements et la supervision d’infrastructures cloud-native. Motivé par l’amélioration de la fiabilité et de la vélocité des déploiements logiciels."
              : "Engineering student at IMT Atlantique and currently a DevOps engineer at Orange Innovation. Skilled in CI/CD pipeline automation, containerization (Docker, Kubernetes), Infrastructure as Code (Terraform, Ansible), observability (Prometheus, Grafana, ELK) and scripting (Python, Bash). Experienced in managing Kubernetes platforms, industrializing deployments and monitoring cloud-native infrastructure, with a strong focus on software delivery reliability and velocity."}
          </p>
          <p>
            {isFrench
              ? "Je suis à la recherche d’une opportunité en CDI dans les domaines du DevOps, de la cybersécurité et du NetOps. N’hésitez pas à me contacter si mon profil vous intéresse."
              : "I am looking for a permanent position in DevOps, cybersecurity or NetOps. Feel free to contact me if my profile matches your needs."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
