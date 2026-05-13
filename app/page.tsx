import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Work } from '@/components/sections/Work';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Philosophy } from '@/components/sections/Philosophy';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/ui/Footer';

/**
 * Section ordering follows the cinematic arc:
 *   Hero       — dark, atmospheric. Establish the protagonist.
 *   About      — cream, intimate. Step closer.
 *   Work       — cream, expansive. The body of evidence.
 *   Experience — dark, retrospective. Where she's been.
 *   Skills     — cream, technical. The kit.
 *   Philosophy — cream, contemplative. The why.
 *   Contact    — dark, decisive. The CTA.
 *   Footer     — colophon, no fuss.
 *
 * Light/dark alternation is intentional: every transition is a scene break.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Philosophy />
      <Contact />
      <Footer />
    </main>
  );
}
