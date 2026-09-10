"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { usePreferences } from "@/contexts/PreferencesContext";

const keywordClass =
  "rounded-full border border-brand-border bg-brand-surface px-3 py-1 text-xs font-medium text-brand-muted";

function EducationCard({
  school,
  location,
  degree,
  description,
  image,
  imageAlt,
  keywords,
  keywordsLabel,
  logo = false,
  editorial = false,
}: {
  school: string;
  location: string;
  degree: string;
  description: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  keywordsLabel: string;
  logo?: boolean;
  editorial?: boolean;
}) {
  return (
    <article className="overflow-hidden border border-brand-border bg-brand-surface shadow-[0_18px_55px_rgba(17,24,43,0.07)]">
      <div className={`group/image relative h-56 overflow-hidden sm:h-72 ${logo ? "bg-brand-surface p-8 sm:p-12" : ""}`}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          quality={92}
          sizes="(min-width: 1024px) 55vw, (min-width: 768px) 65vw, 85vw"
          className={
            logo
              ? "object-contain"
              : editorial
                ? "object-cover saturate-[0.72] contrast-[1.04] transition-[filter,transform] duration-700 group-hover/image:scale-[1.02] group-hover/image:saturate-100"
                : "object-cover"
          }
        />
        {editorial ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 border border-white/55 shadow-[0_0_0_1px_rgba(38,37,34,0.2)] sm:inset-4"
          />
        ) : null}
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">
              {school}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-brand-navy">
              {degree}
            </h3>
          </div>
          <p className="flex shrink-0 items-center gap-2 text-sm text-brand-muted">
            <MapPin size={15} aria-hidden="true" />
            {location}
          </p>
        </div>

        <p className="mt-5 leading-relaxed text-brand-muted">{description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={keywordsLabel}>
          {keywords.map((keyword) => (
            <li key={keyword} className={keywordClass}>
              {keyword}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Cursus() {
  const { language } = usePreferences();
  const isFrench = language === "fr";
  const keywordsLabel = isFrench ? "Domaines étudiés" : "Fields of study";
  const timelineData = [
    {
      title: isFrench ? "2024 - 2026" : "2024 - 2026",
      content: (
        <EducationCard
          school="IMT Atlantique"
          location="Rennes, France"
          degree={
            isFrench
              ? "Diplôme d’ingénieur généraliste — Double diplôme"
              : "General engineering degree — Dual degree"
          }
          description={
            isFrench
              ? "Formation d’ingénieur avec une spécialisation en cybersécurité et développement logiciel, complétée par une expérience professionnelle en DevOps et NetOps."
              : "Engineering curriculum specializing in cybersecurity and software development, complemented by professional experience in DevOps and NetOps."
          }
          image="/assets/cursus/imt-atlantique.avif"
          imageAlt={
            isFrench
              ? "Vue aérienne du campus IMT Atlantique de Rennes"
              : "Aerial view of the IMT Atlantique campus in Rennes"
          }
          keywords={
            isFrench
              ? ["Cybersécurité", "Développement logiciel", "DevOps", "Réseaux"]
              : ["Cybersecurity", "Software development", "DevOps", "Networking"]
          }
          keywordsLabel={keywordsLabel}
          editorial
        />
      ),
    },
    {
      title: isFrench ? "Depuis 2023" : "Since 2023",
      content: (
        <EducationCard
          school="ESATIC"
          location={isFrench ? "Abidjan, Côte d’Ivoire" : "Abidjan, Ivory Coast"}
          degree={
            isFrench
              ? "Master 1 — Sécurité informatique et technologies du Web"
              : "Master's Year 1 — Information security and web technologies"
          }
          description={
            isFrench
              ? "Approfondissement des enjeux de sécurité des systèmes d’information, des technologies web et des architectures logicielles modernes."
              : "Advanced study of information system security, web technologies and modern software architectures."
          }
          image="/assets/cursus/esatic-presentation.jpg"
          imageAlt={
            isFrench
              ? "Logo officiel de l’École Supérieure Africaine des TIC"
              : "Official logo of the African Higher School of ICT"
          }
          keywords={
            isFrench
              ? ["Sécurité informatique", "Technologies web", "Architecture logicielle"]
              : ["Information security", "Web technologies", "Software architecture"]
          }
          keywordsLabel={keywordsLabel}
          logo
        />
      ),
    },
    {
      title: "2020 — 2023",
      content: (
        <EducationCard
          school="ESATIC"
          location={isFrench ? "Abidjan, Côte d’Ivoire" : "Abidjan, Ivory Coast"}
          degree={
            isFrench
              ? "Licence — Systèmes, Réseaux informatiques et Télécommunications"
              : "Bachelor's degree — Systems, computer networks and telecommunications"
          }
          description={
            isFrench
              ? "Acquisition des fondamentaux en administration système, réseaux informatiques, télécommunications et développement logiciel."
              : "Core training in system administration, computer networks, telecommunications and software development."
          }
          image="/assets/cursus/esatic-logo.jpg"
          imageAlt={
            isFrench
              ? "Identité visuelle officielle de l’ESATIC"
              : "Official ESATIC visual identity"
          }
          keywords={
            isFrench
              ? ["Systèmes", "Réseaux", "Télécommunications", "Développement"]
              : ["Systems", "Networking", "Telecommunications", "Development"]
          }
          keywordsLabel={keywordsLabel}
          logo
        />
      ),
    },
  ];

  return (
    <section id="cursus" className="scroll-mt-6 bg-brand-surface">
      <Timeline
        headerArtwork={
          <div
            aria-hidden="true"
            className="oldart-floral-layer pointer-events-none absolute inset-x-0 -top-[200px] z-0 h-[750px]"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
            }}
          >
            <Image
              src="/assets/oldart/12459308_pdfeminine1-element-set-nap-03.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        }
        data={timelineData}
        eyebrow={isFrench ? "03 — Cursus" : "03 — Education"}
        heading={
          isFrench
            ? "Un parcours construit entre ingénierie, logiciel et cybersécurité."
            : "An academic path spanning engineering, software and cybersecurity."
        }
        description={
          isFrench
            ? "De l’ESATIC à IMT Atlantique, chaque étape a consolidé une expertise à la croisée du développement, des systèmes et des réseaux."
            : "From ESATIC to IMT Atlantique, each stage has strengthened my expertise across development, systems and networking."
        }
      />
    </section>
  );
}

export default Cursus;
