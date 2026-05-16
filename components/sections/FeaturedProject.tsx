'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';

/**
 * FeaturedProject — full-bleed split-screen hero for the top of Work.
 *
 * Anatomy:
 *   - Left half: cinematic cover image (16:9 sized to fill the half-screen)
 *     with a top-left "Featured · 01/05" stamp and a bottom-left caption.
 *     Subtle bottom-to-top gradient overlay so the stamp + caption stay
 *     readable on any image.
 *
 *   - Right half: dark ink panel with category kicker (azure), oversized
 *     project title (Fraunces ~56px), italic venue, body paragraph, and
 *     a row of role tag pills.
 *
 *   - On mobile: stacks vertically — image on top, info below.
 *
 * The whole block sits inside Work section, BEFORE the existing project list.
 * v1 cards stay underneath for now; R5 will replace them with Polaroid +
 * Strip view to remove the duplicate Taekwondo entry.
 *
 * Props let this component be reused later for any project, but for R4 we
 * hardcode it to the Taekwondo data via defaults pulled from `projects[0]`
 * in Work.tsx.
 */

type FeaturedProjectProps = {
  cover: string;
  kicker: string;
  title: string;
  venue: string;
  summary: string;
  roles: readonly string[];
  /** Bottom-right tagline overlay on the cover */
  tagline: string;
  /** Featured stamp position label (e.g. "01 / 05") */
  stampLabel: string;
};

export function FeaturedProject({
  cover,
  kicker,
  title,
  venue,
  summary,
  roles,
  tagline,
  stampLabel,
}: FeaturedProjectProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full grid grid-cols-1 md:grid-cols-2 min-h-[440px] md:min-h-[560px] mb-section-md"
      aria-label={`Featured project: ${title}`}
    >
      {/* LEFT — cover image with overlays */}
      <div className="relative w-full aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-ink">
        <Image
          src={cover}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />

        {/* Subtle gradient so stamps stay readable on any image */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,15,31,0.35) 0%, transparent 18%, transparent 70%, rgba(10,15,31,0.55) 100%)',
          }}
        />

        {/* Stamp — top-left, like a magazine archive marker */}
        <div className="absolute top-5 left-5 md:top-7 md:left-7 z-10 flex items-center gap-2">
          <span className="px-2.5 py-1 bg-cream text-ink font-mono text-[10px] uppercase tracking-[0.25em]">
            Featured · {stampLabel}
          </span>
        </div>

        {/* Bottom-left caption — film slate vibe */}
        <span className="absolute bottom-5 left-5 md:bottom-7 md:left-7 z-10 text-cream/85 font-mono text-[10px] uppercase tracking-[0.25em]">
          Cover · {kicker}
        </span>

        {/* Bottom-right tagline — the "13 nations · 4 days" line */}
        <span className="absolute bottom-5 right-5 md:bottom-7 md:right-7 z-10 text-cream/85 font-mono text-[10px] uppercase tracking-[0.25em] text-right">
          {tagline}
        </span>
      </div>

      {/* RIGHT — info panel on dark ink */}
      <div className="relative bg-ink text-cream p-8 md:p-12 lg:p-14 flex flex-col justify-between grain-overlay grain-overlay-dark">
        <div>
          {/* Kicker — azure mono */}
          <p className="font-mono text-meta text-azure mb-5">
            {kicker}
          </p>

          {/* Title — Fraunces, big and tight */}
          <SplitText
            as="h3"
            className="font-display text-editorial-lg font-light leading-[1.02] tracking-tightest text-cream"
            stagger={0.03}
          >
            {title}
          </SplitText>

          {/* Venue — italic Fraunces below title */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 font-display italic text-lg md:text-xl text-cream/65 leading-snug"
          >
            {venue}
          </motion.p>

          {/* Body paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-cream/75 text-body-lg max-w-md"
          >
            {summary}
          </motion.p>
        </div>

        {/* Role tag pills — bottom of panel */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {roles.map((role) => (
            <li
              key={role}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/75 border border-cream/20 px-3 py-1.5"
            >
              {role}
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
