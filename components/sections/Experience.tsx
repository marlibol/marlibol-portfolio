'use client';

import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { experience, education } from '@/lib/content';

/**
 * Experience — refined R3 (Lineage with footage texture hover).
 *
 * Direction change from v1:
 *   - Bigger role titles (text-editorial-md ~32px Fraunces) so each chapter
 *     reads as the focal point, not the date.
 *   - Tag pills below role (Events / Editorial / Brand etc.) — category
 *     fingerprint for each job.
 *   - "Current" pulse dot on the active job (Freelance Producer).
 *   - Hover reveals a soft footage-texture layer + vignette behind the row.
 *     Layer is gradient + cross-hatch lines to simulate documentary footage
 *     without needing real video files yet.
 *   - Slide-left bar accent on hover (1px → 24px azure).
 *   - Removed Spotlight wrapper (was bleaching text legibility).
 *   - Removed vertical timeline line (too thin to read, replaced by row bars).
 *
 * Why bg-ink: keeps the dark/cream pacing — Lineage is the 3rd section,
 * needs to feel cinematic between the lighter About above and Work below.
 *
 * Layout:
 *   md+: 3-col grid — Period (140px) | Role+org+tags+note | empty (for hover image space)
 *   mobile: stacked, single column
 */
export function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-ink text-cream py-section-lg md:py-section-xl grain-overlay grain-overlay-dark overflow-hidden"
    >
      <div className="container-edge">
        {/* Section header */}
        <div className="mb-16 md:mb-20 flex items-end justify-between">
          <span className="font-mono text-meta text-cream/55">
            03 / Lineage
          </span>
          <span className="font-mono text-meta text-cream/45 hidden md:block">
            Reverse chronological
          </span>
        </div>

        {/* Two-line headline */}
        <div className="mb-16 md:mb-24">
          <SplitText
            as="h2"
            className="font-display text-giant font-light leading-[0.92] tracking-tightest text-cream"
            stagger={0.04}
          >
            Where I&rsquo;ve
          </SplitText>
          <SplitText
            as="h2"
            className="font-display text-giant font-light italic leading-[0.92] tracking-tightest text-cream/65 -mt-2"
            stagger={0.04}
            delay={0.15}
          >
            been.
          </SplitText>
        </div>

        {/* Chapter rows */}
        <ul className="flex flex-col">
          {experience.map((row, i) => (
            <ExperienceRow key={row.role + row.period} row={row} index={i} />
          ))}
        </ul>

        {/* Education — refined R9b: bumped text sizes + tighter spacing */}
        <div className="mt-16 md:mt-20 hairline hairline-light" />
        <div className="mt-10 md:mt-14">
          <div className="flex items-end justify-between mb-8">
            <span className="font-mono text-meta text-cream/55">
              / Education
            </span>
            <span className="font-mono text-meta-xs text-cream/40 hidden md:block">
              {String(education.length).padStart(2, '0')} schools
            </span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {education.map((ed) => (
              <li key={ed.school} className="border-l border-cream/20 pl-6">
                <p className="font-mono text-meta text-cream/55 mb-3">
                  {ed.period}
                </p>
                <h4 className="font-display text-editorial-md font-light text-cream leading-[1.1] tracking-tightest">
                  {ed.school}
                </h4>
                <p className="mt-2 font-display italic text-lg md:text-xl text-cream/70">
                  {ed.degree}
                </p>
                <p className="mt-3 text-cream/65 text-body-lg leading-relaxed">
                  {ed.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ExperienceRow — single chapter entry with hover footage layer
// ============================================================

type RowData = {
  period: string;
  role: string;
  org: string;
  note: string;
  // R3 additions — these may be undefined in any legacy entries.
  tags?: readonly string[];
  current?: boolean;
};

type Props = {
  row: RowData;
  index: number;
};

// Each row gets a slightly different gradient palette so hover textures
// feel like distinct "rolls of footage" without being noisy.
const FOOTAGE_GRADIENTS = [
  'linear-gradient(110deg, rgba(184,84,43,0.42) 0%, rgba(16,22,50,0.6) 60%, transparent 100%)',
  'linear-gradient(110deg, rgba(62,124,203,0.38) 0%, rgba(10,15,31,0.6) 60%, transparent 100%)',
  'linear-gradient(110deg, rgba(29,74,58,0.42) 0%, rgba(16,22,50,0.6) 60%, transparent 100%)',
  'linear-gradient(110deg, rgba(90,53,48,0.42) 0%, rgba(26,33,80,0.6) 60%, transparent 100%)',
  'linear-gradient(110deg, rgba(63,80,96,0.42) 0%, rgba(16,22,50,0.6) 60%, transparent 100%)',
  'linear-gradient(110deg, rgba(45,55,80,0.42) 0%, rgba(10,15,31,0.6) 60%, transparent 100%)',
];

function ExperienceRow({ row, index }: Props) {
  const gradient = FOOTAGE_GRADIENTS[index % FOOTAGE_GRADIENTS.length];

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border-b border-cream/10 last:border-b-0 overflow-hidden"
    >
      {/* Footage layer — gradient + cross-hatch lines on hover.
          Cross-hatch is two stacked gradients: the color gradient + 1px
          diagonal lines to simulate VHS scan / film grain texture. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-expo-out"
        style={{
          backgroundImage: `${gradient}, repeating-linear-gradient(45deg, rgba(244,239,230,0.045) 0px, rgba(244,239,230,0.045) 1px, transparent 1px, transparent 6px)`,
        }}
      />

      {/* Right-side vignette — keeps the text on left readable when the
          footage texture is on */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-expo-out"
        style={{
          background: 'linear-gradient(to left, rgba(10,15,31,0.85) 0%, transparent 100%)',
        }}
      />

      {/* Slide-left bar — 1px → 24px azure on hover, anchors the row */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-azure transition-all duration-500 ease-expo-out w-0 group-hover:w-6"
      />

      {/* Row content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-9 md:py-11 px-2 md:px-6 transition-[padding] duration-500 group-hover:md:pl-10">
        {/* Period — left column */}
        <div className="md:col-span-3 flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cream/40">
            / Chapter {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-meta-lg text-cream leading-tight">
            {row.period}
          </span>
          {row.current && (
            <span className="mt-1 inline-flex items-center gap-1.5 self-start px-2 py-0.5 bg-azure/15 border border-azure/30">
              <span className="size-1.5 rounded-full bg-azure animate-live-dot" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-azure">
                Current
              </span>
            </span>
          )}
        </div>

        {/* Role + org + tags — middle column */}
        <div className="md:col-span-6">
          <h3 className="font-display text-editorial-md font-light text-cream leading-[1.05] tracking-tightest">
            {row.role}
          </h3>
          <p className="mt-2 font-display italic text-cream/65 text-base md:text-lg">
            {row.org}
          </p>
          {row.tags && row.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {row.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase tracking-[0.22em] text-cream/55 border border-cream/15 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Note — right column */}
        <p className="md:col-span-3 text-cream/55 text-sm md:text-[15px] leading-relaxed md:text-right pt-1">
          {row.note}
        </p>
      </div>
    </motion.li>
  );
}
