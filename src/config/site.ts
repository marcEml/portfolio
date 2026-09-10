const fallbackSiteUrl = "https://portfolio.brouyao.org";

export const siteConfig = {
  name: "Portfolio de Yao Marc-Emmanuel Brou",
  shortName: "Marc-Emmanuel Brou",
  description:
    "Portfolio de Yao Marc-Emmanuel Brou, ingénieur en développement logiciel, DevOps, réseaux et cybersécurité.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/$/, ""),
  locale: "fr_FR",
  shareImage: "/assets/video/lajeunefillealaperle.png",
} as const;
