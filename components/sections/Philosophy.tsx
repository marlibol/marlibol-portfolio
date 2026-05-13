'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { site } from '@/lib/content';

/**
 * Philosophy — pure typography moment.
 *
 * No images. No grid. Just the statement, set as a long oversized paragraph,
 * with each word starting blurred + low-opacity and sharpening as it scrolls
 * into view. This is the "text blur/focus transition" beat from the brief.
 *
 * Implementation:
 *   - The whole statement is split into words.
 *   - We compute a per-word progress range based on the parent scroll progress.
 *   - Each word's opacity + blur is driven by its slice of progress, so they
 *     come into focus sequentially as you scroll, like reading frame by frame.
 *
 * Performance note:
 *   - We mount only one useScroll on the parent. The per-word interpolation is
 *     pure useTransform — no per-word effect, no per-word ref. That keeps
 *     this cheap even with ~40 words.
 */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.5'], // start as it enters, finish before fully leaving
  });

  const words = site.philosophy.body.split(' ');

  return (
    <section
      ref={ref}
      id="philosophy"
      className="relative bg-cream text-ink py-32 md:py-56 grain-overlay"
    >
      <div className="container-edge">
        {/* Section label */}
        <div className="mb-16 md:mb-24 flex items-end justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
            05 / Statement
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50 hidden md:block">
            — on the work
          </span>
        </div>

        {/* The line */}
        <p className="max-w-5xl font-display text-huge font-light leading-[1.05] tracking-tighter text-ink">
          {words.map((word, i) => {
            // Each word gets a slice of the parent progress.
            // Words near the start sharpen at progress = 0, words near the
            // end sharpen at progress = 1.
            const start = i / words.length;
            const end = Math.min(1, start + 1 / words.length + 0.1);

            return (
              <ScrollWord
                key={i}
                progress={scrollYProgress}
                start={start}
                end={end}
              >
                {word}
              </ScrollWord>
            );
          })}
        </p>

        {/* Signature line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-28 flex items-center gap-4"
        >
          <span className="block h-px w-12 bg-ink/40" />
          <span className="font-display italic text-xl md:text-2xl text-ink/70">
            Mai Linh Ho
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
            / Hanoi, 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// ScrollWord
// -------------------------------------------------------------
// Inline component so we don't have to spread the useTransform logic
// across every word. Kept inside this file because it's only meaningful
// in the context of Philosophy.

type ScrollWordProps = {
  children: string;
  /** The parent section's scroll progress (0 → 1). */
  progress: MotionValue<number>;
  start: number;
  end: number;
};

function ScrollWord({ children, progress, start, end }: ScrollWordProps) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  // Blur goes from 6px → 0px. CSS filter values must be strings.
  const filter = useTransform(
    progress,
    [start, end],
    ['blur(6px)', 'blur(0px)']
  );

  return (
    <>
      <motion.span style={{ opacity, filter }} className="inline-block">
        {children}
      </motion.span>
      <span> </span>
    </>
  );
}
