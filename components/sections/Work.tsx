'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Marquee } from '@/components/ui/Marquee';
import { SplitText } from '@/components/animations/SplitText';
import { projects } from '@/lib/content';

/**
 * Work — the centerpiece. Selected projects, each as its own film frame.
 *
 * Between every two projects we drop a kinetic marquee. It serves two
 * purposes:
 *   - Visual break so the page doesn't read as a stack of identical cards
 *   - Acts as a "scene change" — projects feel like chapters rather than items
 *
 * The section opens with an editorial header that establishes the curation
 * (it's "Selected Works", not "All Works"). Curation is part of the credibility.
 */
export function Work() {
  return (
    <section
      id="work"
      className="relative bg-cream text-ink py-24 md:py-40 grain-overlay"
    >
      <div className="container-edge">
        {/* Section header */}
        <div className="mb-20 md:mb-32">
          <div className="flex items-end justify-between mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
              02 / Work
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
              {String(projects.length).padStart(2, '0')} entries
            </span>
          </div>

          <SplitText
            as="h2"
            className="font-display text-mega font-light tracking-tightest leading-[0.88] text-ink"
            stagger={0.04}
          >
            Selected
          </SplitText>
          <SplitText
            as="h2"
            className="font-display text-mega font-light italic tracking-tightest leading-[0.88] text-ink/70 -mt-2 md:-mt-4"
            stagger={0.04}
            delay={0.15}
          >
            works.
          </SplitText>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 max-w-xl text-ink/70 leading-relaxed"
          >
            A short-list from the last two years &mdash; live productions
            for institutions, brands, and artists, plus editorial work from
            the press bench. Hover to enter, scroll to keep reading.
          </motion.p>
        </div>

        {/* Project entries with marquees between them */}
        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((p, i) => (
            <div key={p.slug}>
              <ProjectCard project={p} i={i} />

              {/* Marquee divider — only between projects, not after the last */}
              {i < projects.length - 1 && (
                <div className="mt-24 md:mt-40">
                  <Marquee
                    speed={50}
                    direction={i % 2 === 0 ? 'left' : 'right'}
                    className="py-6"
                  >
                    <span className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light italic leading-none text-ink/15 whitespace-nowrap">
                      {p.title}&nbsp;
                      <span className="not-italic text-azure/40 mx-6">★</span>
                      &nbsp;{p.venue}&nbsp;
                      <span className="not-italic text-azure/40 mx-6">★</span>
                      &nbsp;
                    </span>
                  </Marquee>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
