import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Lato, PT_Serif } from "next/font/google";
import { Providers } from "@/app/providers";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Yao Marc-Emmanuel Brou", url: siteConfig.url }],
  creator: "Yao Marc-Emmanuel Brou",
  publisher: "Yao Marc-Emmanuel Brou",
  category: "technology",
  keywords: [
    "Yao Marc-Emmanuel Brou",
    "ingénieur DevOps",
    "développement logiciel",
    "cybersécurité",
    "réseaux",
    "automatisation",
    "portfolio",
  ],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    type: "website",
    url: "/portfolio",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
    locale: siteConfig.locale,
    alternateLocale: ["en_US"],
    images: [
      {
        url: siteConfig.shareImage,
        width: 1672,
        height: 941,
        alt: "Portrait artistique de la Jeune Fille à la perle dans l’univers visuel du portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.shareImage],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0eee9" },
    { media: "(prefers-color-scheme: dark)", color: "#141413" },
  ],
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var l=localStorage.getItem('portfolio-language');if(l!=='fr'&&l!=='en'){l='fr'}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;document.documentElement.lang=l}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${lato.variable} ${ptSerif.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
