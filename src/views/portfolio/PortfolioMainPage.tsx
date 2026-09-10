"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/portfolio/About";
import { ArtSectionTransition } from "@/components/portfolio/ArtSectionTransition";
import { Contact } from "@/components/portfolio/Contact";
import { Certifications } from "@/components/portfolio/Certifications";
import { Cursus } from "@/components/portfolio/Cursus";
import { Experience } from "@/components/portfolio/Experience";
import { Freetime } from "@/components/portfolio/Freetime";
import { Projects } from "@/components/portfolio/Projects";
import { Resume } from "@/components/portfolio/Resume";
import { PortfolioLoader } from "@/components/portfolio/PortfolioLoader";
import { Skills } from "@/components/portfolio/Skills";

export function DashboardPage() {
  return (
    <>
      <PortfolioLoader />
      <AdminLayout fullBleed>
        <Hero />
        <About />
        <Skills />
        <Cursus />
        <Certifications />
        <ArtSectionTransition
          src="/assets/oldart/147805.jpg"
          objectPosition="center 78%"
        />
        <Projects />
        <Experience />
        <ArtSectionTransition
          src="/assets/oldart/133231.jpg"
          objectPosition="center 46%"
        />
        <Freetime />
        <Resume />
        <Contact />
        <Footer />
      </AdminLayout>
    </>
  );
}

export default DashboardPage;
