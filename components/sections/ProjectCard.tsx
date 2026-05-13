'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DistortImage } from '@/components/animations/DistortImage';
import { SplitText } from '@/components/animations/SplitText';
import type { Project } from '@/lib/content';

type ProjectCardProps = {
  project: Project;
  /** index in the list — drives alternating layout + the side counter */
  i: number;
};

/**
 * ProjectCard — one entry in the Selected Works list.
 *
 * The "film frame" feel comes from three details:
 *   1. Each card is set inside an oversized white margin — the image looks
 *      like a developed photograph laid on the page.
 *   2. Scroll-tied scale: the image grows from 0.92 to 1.0 as it enters the
 *      viewport. Subtle — you feel it more than you see it.
 *   3. The kicker, title, and meta reveal in a staggered cascade so the eye
 *      lands on the title last.
 *
 * Layout alternates left/right based on index so the page has rhythm instead
 * of a single column of identical blocks.
 */
export function ProjectCard({ project, i }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isOdd = i % 2 === 1;

  // Scroll-tied scale + lift for the image. Very subtle — the brief said
  // "tasteful, not cheesy".
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.0, 1.02]);
  const y     = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <article
      ref={ref}
      className="relative"
      aria-labelledby={`project-${project.slug}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Image side */}
        <motion.div
          style={{ scale, y }}
          className={`relative md:col-span-7 ${isOdd ? 'md:col-start-6' : ''}`}
        >
          <DistortImage
            src={project.cover}
            alt={project.title}
            width={1600}
            height={1000}
            className="aspect-[16/10] w-full shadow-editorial"
          />

          {/* Index badge — sits over the corner of the image like a film stamp */}
          <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-cream px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink">
            {project.index} / {project.year}
          </div>
        </motion.div>

        {/* Text side */}
        <div className={`md:col-span-5 ${isOdd ? 'md:col-start-1 md:row-start-1 md:text-right' : ''}`}>
          {/* Kicker — the small label above the title */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block font-mono text-[11px] uppercase tracking-[0.3em] text-azure mb-4"
          >
            {project.kicker}
          </motion.span>

          {/* Title — uses SplitText so words reveal individually */}
          <SplitText
            as="h3"
            className="font-display text-huge font-light tracking-tighter text-ink leading-[0.95]"
            stagger={0.05}
          >
            {project.title}
          </SplitText>

          {/* Venue */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 font-display italic text-lg md:text-xl text-ink/70"
          >
            {project.venue}
          </motion.p>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-ink/75 leading-relaxed max-w-md"
          >
            {project.summary}
          </motion.p>

          {/* Roles — small list */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className={`mt-8 flex flex-wrap gap-2 ${isOdd ? 'md:justify-end' : ''}`}
          >
            {project.roles.map((role) => (
              <li
                key={role}
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70 border border-ink/15 px-3 py-1.5"
              >
                {role}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </article>
  );
}
