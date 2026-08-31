"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Certifications } from "@/components/portfolio/Certifications";
import { Cursus } from "@/components/portfolio/Cursus";
import { Experience } from "@/components/portfolio/Experience";
import { Freetime } from "@/components/portfolio/Freetime";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";

export function DashboardPage() {
  return (
    <AdminLayout fullBleed>
      <Hero />
      <About />
      <Skills />
      <Cursus />
      <Certifications />
      {/* <Projects /> */}
      <Experience />
      <Freetime />
      <Contact />
      <Footer />
    </AdminLayout>
  );
}

export default DashboardPage;
