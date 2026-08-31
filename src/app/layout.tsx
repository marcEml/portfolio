import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import { Lato, PT_Serif } from "next/font/google";
import { Providers } from "@/app/providers";

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
