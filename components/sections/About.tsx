'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { Parallax } from '@/components/animations/Parallax';
import { DistortImage } from '@/components/animations/DistortImage';
import { about, site } from '@/lib/content';

/**
 * About — refined R2 (with backstage polaroid live).
 *
 * Direction:
 *   - Removed the 4-stat row at the bottom (corporate, broke the tone).
 *   - Added a floating LANDSCAPE polaroid pinned to the lower-right of the
 *     portrait. Aspect ratio 3:2 to honor the source photo (16:9 cropped).
 *   - First paragraph opens with a drop-cap "I" in rust.
 *   - Closing signature "— Mai Linh" italic Fraunces, rotated -2°.
 *
 * Polaroid asset:
 *   /images/about-polaroid-backstage.jpg — backstage from Phan Mạnh Quỳnh's
 *   first concert (Chuyến tàu mùa Đông). Subject is briefing the artist.
 */

// Backstage polaroid is now LIVE — image uploaded to /public/images/.
const polaroidReady = true;

export function About() {
  return (
    <section
      id="about"
      className="relative bg-cream text-ink py-section-lg md:py-section-xl overflow-hidden grain-overlay"
    >
      <div className="container-edge">
        {/* Section header */}
        <div className="mb-16 md:mb-20 flex items-end justify-between">
          <span className="font-mono text-meta text-ink/55">
            02 / Note
          </span>
          <span className="font-mono text-meta text-ink/55 hidden md:block">
            A short introduction
          </span>
        </div>

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <SplitText
            as="h2"
            className="font-display text-giant font-light leading-[0.92] tracking-tightest text-ink"
            stagger={0.04}
          >
            A short
          </SplitText>
          <SplitText
            as="h2"
            className="font-display text-giant font-light italic leading-[0.92] tracking-tightest text-ink/65 -mt-2"
            stagger={0.04}
            delay={0.15}
          >
            introduction.
          </SplitText>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Portrait column with floating LANDSCAPE polaroid */}
          <div className="md:col-span-5">
            <div className="relative">
              <Parallax amount={60} reverse>
                <DistortImage
                  src="/images/portrait-source.jpg"
                  alt="Mai Linh Ho — portrait, Hanoi"
                  width={900}
                  height={1200}
                  className="aspect-[3/4] w-full max-w-[480px] shadow-editorial"
                  priority
                />
              </Parallax>

              {/* Polaroid — LANDSCAPE 3:2, pinned bottom-right overflowing.
                  Caption now reads as a backstage memento with show details. */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 8 }}
                whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-16 -right-4 md:-right-12 z-20 w-[200px] md:w-[260px] bg-white p-3 pb-6 shadow-polaroid hover:shadow-polaroid-hover transition-shadow cursor-default"
                data-cursor="hover"
              >
                {/* Photo area — landscape 3:2 to match the source image */}
                <div className="aspect-[3/2] w-full bg-gradient-to-br from-ink-800 via-azure-700 to-ink-900 mb-3 overflow-hidden relative">
                  {polaroidReady ? (
                    <Image
                      src="/images/about-polaroid-backstage.jpg"
                      alt="Backstage — Phan Mạnh Quỳnh, Chuyến tàu mùa Đông"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 200px, 260px"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] uppercase tracking-[0.25em] text-cream/40">
                      Backstage photo
                    </span>
                  )}
                </div>

                {/* Caption — 3 lines:
                    Line 1 italic: "Behind the Scenes —"
                    Line 2 italic: artist + show name
                    Line 3 mono small: meta (first concert + year) */}
                <p className="font-display italic text-[11px] md:text-[12px] text-ink/85 text-center leading-tight">
                  Behind the Scenes —
                </p>
                <p className="font-display italic text-[10px] md:text-[11px] text-ink/65 text-center leading-tight mt-0.5">
                  Phan Mạnh Quỳnh &middot; Chuyến tàu mùa Đông
                </p>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink/40 text-center mt-1.5">
                  First concert · 2024
                </p>
              </motion.div>
            </div>

            {/* Caption under portrait */}
            <p className="mt-6 font-mono text-meta-xs text-ink/55">
              Fig. 01 — Hanoi, March 2026
            </p>
          </div>

          {/* Prose column */}
          <div className="md:col-span-7 md:col-start-6 relative">
            <p className="font-display italic text-[12px] text-ink/40 absolute top-0 right-0 hidden md:block">
              / Self-portrait in prose
            </p>

            <div className="space-y-6 text-ink/85 max-w-xl mt-2 md:mt-6">
              {about.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    i === 0
                      ? 'text-body-lg leading-[1.7] first-letter:font-display first-letter:text-[68px] first-letter:leading-[0.85] first-letter:float-left first-letter:pr-3 first-letter:pt-1 first-letter:font-light first-letter:text-rust'
                      : 'text-body-lg leading-[1.7]'
                  }
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 md:mt-14 pt-6 border-t border-ink/15 flex items-end justify-between max-w-xl"
            >
              <span className="font-display italic text-2xl md:text-3xl text-ink -rotate-2 inline-block">
                — Mai Linh
              </span>
              <span className="font-mono text-meta-xs text-ink/50 text-right leading-relaxed">
                <span className="block">{site.city.split(',')[0]}</span>
                <span className="block">2026</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
