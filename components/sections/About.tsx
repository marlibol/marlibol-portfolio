'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { Parallax } from '@/components/animations/Parallax';
import { DistortImage } from '@/components/animations/DistortImage';

/**
 * About — first light section after the dark hero.
 *
 * The transition from dark to cream is part of the cinematic feel:
 * the eye adjusts as if a curtain rose. We don't add a fade-in panel —
 * the contrast itself does the work.
 *
 * Layout:
 *   - 12-col grid; portrait on the left (parallax-drifted), text on the right
 *   - The "ABOUT" word is set as a giant editorial title that overlaps the
 *     image slightly. Negative margin handles the overlap.
 *   - Three small "stat blocks" at the bottom give the page a magazine masthead feel.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative bg-cream text-ink py-24 md:py-40 overflow-hidden grain-overlay"
    >
      <div className="container-edge">
        {/* Section index + label */}
        <div className="mb-16 md:mb-24 flex items-end justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
            01 / Note
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50 hidden md:block">
            On the work, in plain words
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Portrait — left column, with parallax drift */}
          <div className="md:col-span-5 md:row-span-2">
            <Parallax amount={80} reverse>
              <DistortImage
                src="/images/portrait-source.jpg"
                alt="Mai Linh Ho — portrait, Hanoi"
                width={900}
                height={1200}
                className="aspect-[3/4] w-full max-w-[480px] shadow-editorial"
                priority
              />
            </Parallax>

            {/* Caption — beneath the portrait, editorial-style */}
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
              Fig. 01 — Hanoi, March 2026
            </p>
          </div>

          {/* Right column — heading + body */}
          <div className="md:col-span-7 flex flex-col">
            <SplitText
              as="h2"
              className="font-display text-giant font-light leading-[0.92] tracking-tightest text-ink"
              stagger={0.04}
            >
              About,
            </SplitText>
            <SplitText
              as="h2"
              className="font-display text-giant font-light italic leading-[0.92] tracking-tightest text-ink/80 -mt-2"
              stagger={0.04}
              delay={0.15}
            >
              briefly.
            </SplitText>

            <div className="mt-12 md:mt-16 max-w-xl space-y-6 text-base md:text-lg leading-relaxed text-ink/80">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                I&rsquo;m a Communications &amp; Event Producer based in
                Hanoi. My work sits at the intersection of journalism,
                stagecraft and content — which is a long way of saying I
                build moments that hold a room.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Recent rooms include international taekwondo championships,
                bank-headlined countdowns at the Opera House, an artist&rsquo;s
                first stadium tour, and a press desk at the Ministry of
                Foreign Affairs. Different rooms, same job: keep the story
                clean and the energy alive.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                I write and produce in Vietnamese and English (C1), with
                experience translating, transcribing, and editing across both.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Stat row — the editorial masthead at the bottom of the section */}
        <div className="mt-24 md:mt-32 hairline" />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { k: 'Based',    v: 'Hanoi, VN' },
            { k: 'Languages', v: 'EN / VI' },
            { k: 'Field',    v: 'Live + Editorial' },
            { k: 'Since',    v: '2023' },
          ].map((it, i) => (
            <motion.div
              key={it.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-1">
                /  {it.k}
              </p>
              <p className="font-display text-2xl md:text-3xl font-light text-ink">
                {it.v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
