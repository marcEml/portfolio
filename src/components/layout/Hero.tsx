"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { usePreferences } from "@/contexts/PreferencesContext";

export function Hero() {
  const { language } = usePreferences();
  const isFrench = language === "fr";

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-brand-surface lg:grid lg:h-[clamp(680px,78dvh,780px)] lg:grid-cols-[54%_46%]"
    >
      <h1 id="hero-title" className="sr-only">
        {isFrench ? "Portfolio de Yao Marc-Emmanuel Brou" : "Yao Marc-Emmanuel Brou's portfolio"}
      </h1>

      <div className="relative min-h-[56dvh] overflow-hidden rounded-tr-[72px] sm:min-h-[62dvh] sm:rounded-tr-[96px] lg:h-full lg:min-h-0 lg:rounded-tr-[112px]">
        <Image
          src="/assets/noise.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover opacity-25 grayscale contrast-75"
        />
        <div className="absolute inset-0 bg-brand-ivory/55" />

        <div aria-hidden="true" className="oldart-flower-accent absolute -right-[10%] -bottom-[35%] z-[2] h-[66%] w-[48%] rotate-[7deg] sm:-right-[4%] lg:-right-[8%]">
          {/* <Image
            src="/assets/oldart/ranunculus-grayscale-with-risograph-effect-remixed-media.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 26vw, 48vw"
            className="object-contain object-top"
          /> */}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-3 z-[3] rounded-tr-[60px] border border-brand-blue/25 sm:inset-4 sm:rounded-tr-[80px] lg:rounded-tr-[94px]"
        />
        <div
          aria-hidden="true"
          className="absolute left-[5%] top-1/2 z-0 flex -translate-y-1/2 flex-col font-display text-[clamp(12rem,32vw,30rem)] font-bold leading-[0.58] tracking-[-0.12em] text-brand-navy/[0.08]"
        >
          <span>B</span>
          <span>R</span>
        </div>

        <div className="absolute bottom-0 left-1/2 z-10 h-[96%] w-[94%] -translate-x-1/2 sm:w-[82%] lg:h-[94%] lg:w-[90%] xl:w-[82%]">
          <Image
            src="/assets/hero_portfolio_picture.png"
            alt={isFrench ? "Portrait de Yao Marc-Emmanuel Brou" : "Portrait of Yao Marc-Emmanuel Brou"}
            fill
            priority
            sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 49vw, 82vw"
            className="object-contain object-bottom"
          />
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-7 left-[12%] z-20 h-12 w-9 bg-brand-blue/10 lg:bottom-8"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-12 right-0 z-20 h-1.5 w-16 bg-brand-blue lg:bottom-14"
        />
      </div>

      <div className="relative min-h-[480px] overflow-hidden bg-brand-surface px-7 py-14 sm:px-12 lg:flex lg:h-full lg:min-h-0 lg:items-center lg:px-[9%] lg:py-0">
        <div aria-hidden="true" className="oldart-statue-layer pointer-events-none absolute -right-[18%] inset-y-0 z-0 w-[88%] sm:-right-[8%] sm:w-[72%] lg:-right-[24%] lg:w-[96%]">
          <Image
            src="/assets/oldart/ranunculus-grayscale-with-risograph-effect-remixed-media.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 44vw, 72vw"
            className="object-cover object-[34%_center]"
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute left-0 top-[18%] z-0 h-px w-[22%] bg-[var(--art-gold)] opacity-[0.55]"
        />
        <div className="relative z-10 mx-auto max-w-xl lg:mx-0 lg:translate-y-[12%]">
          <div className="text-base font-medium leading-relaxed text-brand-navy sm:text-lg lg:text-[clamp(1rem,1.12vw,1.22rem)]">
            <p>
              {isFrench
                ? "Ingénieur en développement logiciel, réseaux et cybersécurité, passionné par les technologies numériques, je conçois des interfaces claires et des solutions robustes, pensées pour répondre à des besoins réels."
                : "Software development, networking and cybersecurity engineer with a passion for digital technologies, I design clear interfaces and robust solutions built to address real-world needs."}
            </p>
            <p className="mt-7">
              {isFrench
                ? "Ce portfolio rassemble mon parcours, mes compétences et une sélection de projets qui illustrent ma manière de transformer une idée en produit utile."
                : "This portfolio brings together my background, skills and a selection of projects that showcase how I turn an idea into a useful product."}
            </p>
          </div>

          <a
            href="#about"
            aria-label={isFrench ? "Découvrir mon profil" : "Discover my profile"}
            className="mt-10 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border-[3px] border-brand-navy text-brand-navy transition duration-200 hover:-translate-y-1 hover:bg-brand-navy hover:text-brand-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue lg:mt-12"
          >
            <ArrowDown size={25} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <p className="absolute right-3 top-1/2 hidden -translate-y-1/2 font-display text-xs font-semibold tracking-[0.08em] text-brand-navy [writing-mode:vertical-rl] rotate-180 sm:block lg:right-[5%] lg:text-sm">
          YAO MARC-EMMANUEL BROU
        </p>
      </div>
    </section>
  );
}

export default Hero;
