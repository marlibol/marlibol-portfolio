'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SplitText } from '@/components/animations/SplitText';
import { Spotlight } from '@/components/animations/Spotlight';
import { experience, education } from '@/lib/content';

/**
 * Experience — vertical timeline, dark cinematic.
 *
 * Key interactions:
 *   - The vertical hairline on the left fills as the section scrolls past.
 *     This is the "ambient motion reacting to scrolling" cue from the brief.
 *   - Each row reveals its title with SplitText so words rise into place.
 *   - Hover on a row brightens that row and dims the rest — a magazine
 *     spread where the eye lands on what you're pointing at.
 *
 * Why dark here: after two cream sections in a row (About → Work), going
 * back to ink creates the second "scene break" of the page. Cinematic
 * pacing is mostly contrast.
 */
export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // The line height — 0 when scrolling in, full when in view, holds full.
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.5], ['0%', '100%']);

  return (
    <Spotlight color="rgba(62, 124, 203, 0.25)" size={500}>
      <section
        ref={ref}
        id="experience"
        className="relative bg-ink text-cream py-24 md:py-40 grain-overlay grain-overlay-dark"
      >
        <div className="container-edge">
          {/* Header */}
          <div className="mb-20 md:mb-32">
            <div className="flex items-end justify-between mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50">
                03 / Lineage
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50 hidden md:block">
                Reverse chronological
              </span>
            </div>

            <SplitText
              as="h2"
              className="font-display text-mega font-light tracking-tightest leading-[0.88] text-cream"
              stagger={0.04}
            >
              Where I&rsquo;ve
            </SplitText>
            <SplitText
              as="h2"
              className="font-display text-mega font-light italic tracking-tightest leading-[0.88] text-cream/70 -mt-2 md:-mt-4"
              stagger={0.04}
              delay={0.15}
            >
              been.
            </SplitText>
          </div>

          {/* Timeline — relative so the animated line can position absolutely */}
          <div className="relative pl-6 md:pl-10">
            {/* The vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-cream/10" />
            <motion.div
              className="absolute left-0 top-0 w-px bg-azure origin-top"
              style={{ height: lineHeight }}
              aria-hidden
            />

            {/* Rows.
                Hover behavior: when any row is hovered, others dim.
                We implement this with a `group` on the <ul> + a CSS-only
                trick using `group-hover/list` on each child paired with
                `hover:opacity-100` on the hovered child itself. Tailwind
                JIT compiles `group-hover/list:opacity-40` from the arbitrary
                modifier. */}
            <ul className="group/list flex flex-col">
              {experience.map((row, i) => (
                <motion.li
                  key={row.role + row.period}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative py-8 md:py-10 border-b border-cream/10 last:border-b-0 transition-opacity duration-500 group-hover/list:opacity-40 hover:!opacity-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
                    {/* Date — left column on md+ */}
                    <span className="md:col-span-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50 pt-1">
                      {row.period}
                    </span>

                    {/* Role + org */}
                    <div className="md:col-span-6">
                      <h3 className="font-display text-2xl md:text-3xl font-light text-cream leading-tight">
                        {row.role}
                      </h3>
                      <p className="mt-2 font-display italic text-cream/60">
                        {row.org}
                      </p>
                    </div>

                    {/* Note */}
                    <p className="md:col-span-3 text-cream/60 text-sm md:text-base leading-relaxed md:text-right">
                      {row.note}
                    </p>
                  </div>

                  {/* Subtle hover bar — slides in from the left on hover */}
                  <span className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 h-px w-0 bg-azure transition-all duration-500 ease-expo-out group-hover:w-4" />
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Education — a slim block underneath */}
          <div className="mt-24 md:mt-32 hairline hairline-light" />
          <div className="mt-12 md:mt-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50">
              /  Education
            </span>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {education.map((ed) => (
                <li key={ed.school} className="border-l border-cream/15 pl-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-2">
                    {ed.period}
                  </p>
                  <h4 className="font-display text-xl md:text-2xl font-light text-cream">
                    {ed.school}
                  </h4>
                  <p className="mt-1 italic text-cream/70">{ed.degree}</p>
                  <p className="mt-2 text-cream/55 text-sm">{ed.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Spotlight>
  );
}
