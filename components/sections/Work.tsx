'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { FeaturedProject } from './FeaturedProject';
import { Marquee } from '@/components/ui/Marquee';
import { SplitText } from '@/components/animations/SplitText';
import { projects } from '@/lib/content';

/**
 * Work — Selected projects section.
 *
 * R4 update — Featured project now sits at the top as a full-bleed
 * split-screen hero (image left + dark info panel right). The rest of the
 * v1 card list stays underneath temporarily; R5 will replace it with the
 * Polaroid grid + Strip view design.
 *
 * Note: Taekwondo (projects[0]) is the chosen Featured project. It will
 * render twice during R4 — once as Featured, once still in the v1 card
 * list below. This is expected. R5 removes the duplicate.
 */
export function Work() {
  const featured = projects[0];

  return (
    <section
      id="work"
      className="relative bg-cream text-ink py-section-lg md:py-section-xl grain-overlay overflow-hidden"
    >
      <div className="container-edge">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-end justify-between mb-10">
            <span className="font-mono text-meta text-ink/55">
              04 / Work
            </span>
            <span className="font-mono text-meta text-ink/55">
              {String(projects.length).padStart(2, '0')} entries
            </span>
          </div>

          <SplitText
            as="h2"
            className="font-display text-giant font-light tracking-tightest leading-[0.92] text-ink"
            stagger={0.04}
          >
            Selected
          </SplitText>
          <SplitText
            as="h2"
            className="font-display text-giant font-light italic tracking-tightest leading-[0.92] text-ink/65 -mt-2"
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
            className="mt-10 max-w-xl text-ink/75 text-body-lg leading-relaxed"
          >
            A short-list from the last two years &mdash; live productions
            for institutions, brands, and artists, plus editorial work from
            the press bench.
          </motion.p>
        </div>
      </div>

      {/* Featured project — breaks out of container-edge for full-bleed */}
      <FeaturedProject
        cover="/images/featured-taekwondo-cover.jpg"
        kicker={featured.kicker}
        title={featured.title}
        venue={featured.venue}
        summary={featured.summary}
        roles={featured.roles}
        tagline="13 nations · 4 days · 1 stage"
        stampLabel={`${featured.index} / ${String(projects.length).padStart(2, '0')}`}
      />

      {/* Legacy v1 list — still showing all projects including Taekwondo (duplicate).
          R5 replaces this with Polaroid grid + Strip view and removes the dup. */}
      <div className="container-edge">
        <div className="mb-10">
          <span className="font-mono text-meta text-ink/55">
            / Archive
          </span>
        </div>
        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((p, i) => (
            <div key={p.slug}>
              <ProjectCard project={p} i={i} />

              {/* Marquee divider — only between projects */}
              {i < projects.length - 1 && (
                <div className="mt-24 md:mt-40">
                  <Marquee
                    speed={50}
                    direction={i % 2 === 0 ? 'left' : 'right'}
                    className="py-6"
                  >
                    <span className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light italic leading-none text-ink/35 whitespace-nowrap">
                      {p.title}&nbsp;
                      <span className="not-italic text-azure/50 mx-6">★</span>
                      &nbsp;{p.venue}&nbsp;
                      <span className="not-italic text-azure/50 mx-6">★</span>
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
