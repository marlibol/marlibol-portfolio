import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Work } from '@/components/sections/Work';
import { Skills } from '@/components/sections/Skills';
import { Philosophy } from '@/components/sections/Philosophy';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/ui/Footer';

/**
 * Section ordering — updated per feedback:
 *
 *   Hero        — landing, atmospheric
 *   About       — note, intimate
 *   Experience  — "Lineage / Where I've been" (includes Education block)
 *   Work        — selected projects
 *   Skills      — the kit
 *   Philosophy  — the statement
 *   Contact     — close
 *
 * Note: Experience was moved BEFORE Work so the timeline of jobs reads
 * before the projects list. Education stays nested inside the Experience
 * section for now — it can be promoted to a standalone section later if
 * needed.
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
      <Contact />
      <Footer />
    </main>
  );
}
