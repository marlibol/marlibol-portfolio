import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Work } from '@/components/sections/Work';
import { Skills } from '@/components/sections/Skills';
import { Philosophy } from '@/components/sections/Philosophy';
import { Hobbies } from '@/components/sections/Hobbies';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/ui/Footer';

/**
 * Section ordering — current:
 *
 *   Hero        — landing
 *   About       — note
 *   Experience  — "Lineage" (includes Education)
 *   Work        — selected projects
 *   Skills      — the kit
 *   Philosophy  — the statement
 *   Hobbies     — off-hours / personal
 *   Contact     — close
 *
 * Hobbies sits after Philosophy and before Contact so the page closes
 * with the personal side — softens the corporate edge before the CTA.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Philosophy />
      <Hobbies />
      <Contact />
      <Footer />
    </main>
  );
}
