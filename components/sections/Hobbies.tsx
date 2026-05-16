'use client';

import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';

/**
 * Hobbies — personal, off-hours section.
 *
 * Minimal cards with photo placeholder slots. Photos to be dropped in
 * later — just replace the gray box with an <Image> when ready.
 *
 * Tone: personal and human, not corporate. The kicker explains "what",
 * the title is the activity, the note explains "why" in Mai Linh's voice.
 */

const hobbies = [
  {
    title: 'Marketing Foundation',
    by:    'with Hưng Lưu',
    note:  'Currently learning marketing fundamentals — frameworks, mindset, and craft — from Hưng Lưu (11+ years across MoMo, PMAX, Topica).',
  },
  {
    title: 'Learning AI',
    by:    'curiosity-driven',
    note:  "Reading, trying tools, and figuring out where AI fits into a producer's workflow. Mostly hands-on, mostly playful.",
  },
  {
    title: 'Vibe coding',
    by:    'building with AI',
    note:  'Yes — this website is one of the experiments. Building small things with AI as a creative partner, not just a tool.',
  },
  {
    title: 'Photowalks',
    by:    'Hanoi streets',
    note:  'Walking, looking, photographing. Short snaps from the street — nothing more, nothing less.',
  },
] as const;

export function Hobbies() {
  return (
    <section
      id="hobbies"
      className="relative bg-cream text-ink py-24 md:py-40 grain-overlay overflow-hidden"
    >
      <div className="container-edge">
        {/* Section header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-end justify-between mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
              06 / Off-hours
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50 hidden md:block">
              The other things
            </span>
          </div>

          <SplitText
            as="h2"
            className="font-display text-mega font-light tracking-tightest leading-[0.88] text-ink"
            stagger={0.04}
          >
            Outside
          </SplitText>
          <SplitText
            as="h2"
            className="font-display text-mega font-light italic tracking-tightest leading-[0.88] text-ink/70 -mt-2 md:-mt-4"
            stagger={0.04}
            delay={0.15}
          >
            the work.
          </SplitText>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-xl text-ink/70 leading-relaxed"
          >
            A few things I do when no one is paying me. They keep the day
            human.
          </motion.p>
        </div>

        {/* Cards grid — 2 columns on desktop, stacked on mobile.
            Each card has an empty photo slot at top + meta + title + note. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {hobbies.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              {/* Photo placeholder — empty for now.
                  When Mai Linh adds photos, replace this <div> with:
                    <Image src="/images/hobby-N.jpg" alt="..." fill ... />
                  Aspect ratio stays 4:3 to keep grid balanced. */}
              <div
                className="relative aspect-[4/3] w-full mb-6 overflow-hidden bg-ink/5 border border-ink/10 flex items-center justify-center transition-colors group-hover:bg-ink/[0.07]"
                data-photo-slot={`hobby-${i + 1}`}
                aria-hidden
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30">
                  Photo {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Meta line */}
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-azure mb-2">
                {String(i + 1).padStart(2, '0')} &mdash; {h.by}
              </p>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl font-light text-ink mb-3 leading-tight">
                {h.title}
              </h3>

              {/* Note — short personal description */}
              <p className="text-ink/70 leading-relaxed max-w-md">
                {h.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
