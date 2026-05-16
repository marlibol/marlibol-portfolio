import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Work } from '@/components/sections/Work';
import { Skills } from '@/components/sections/Skills';
import { Hobbies } from '@/components/sections/Hobbies';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/ui/Footer';

/**
 * Section ordering — final:
 *
 *   Hero        — landing
 *   About       — note
 *   Experience  — "Lineage" (includes Education)
 *   Work        — selected projects
 *   Skills      — the kit
 *   Hobbies     — off-hours / personal
 *   Contact     — close
 *
 * Philosophy section was removed — felt unnecessary, slowed the read.
 * Hobbies now does the "human side" job before the CTA.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Hobbies />
      <Contact />
      <Footer />
    </main>
  );
}
