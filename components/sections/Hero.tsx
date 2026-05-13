'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Spotlight } from '@/components/animations/Spotlight';
import { site } from '@/lib/content';

/**
 * Hero — first scroll-stop after the loader.
 *
 * Anatomy:
 *   - Top: index counter + handle (editorial masthead feel)
 *   - Center-left: the big oversized name with stylistic mix (italic + roman)
 *   - Center-right: a small block of metadata that reads like a magazine credit
 *   - Bottom-left: the role + tagline
 *   - Bottom-right: scroll cue
 *
 * The hero lives on a dark canvas (the Spotlight wrapper is the dark section).
 * Mouse-follow gradient inside Spotlight gives ambient atmosphere without
 * crossing into "tech demo" territory.
 *
 * On scroll, the entire hero translates up slightly slower than the rest of
 * the page (parallax) and fades — this is what gives the "diving into the work"
 * feeling when projects come up underneath.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Hero parallax — the hero drifts up a bit slower than the next section,
  // and fades as we scroll past. Both controlled by the same scroll progress.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'], // 0 at top, 1 when hero leaves
  });

  const y       = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Spotlight color="rgba(62, 124, 203, 0.4)" size={620}>
      <section
        ref={ref}
        id="hero"
        className="relative min-h-[100svh] w-full bg-ink text-cream grain-overlay grain-overlay-dark"
      >
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 flex min-h-[100svh] flex-col justify-between container-edge pt-32 pb-10 md:pt-36 md:pb-14"
        >
          {/* Masthead */}
          <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-cream/60">
            <motion.span
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {site.handle} / Vol. 01
            </motion.span>
            <motion.span
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block"
            >
              Edition / 2026
            </motion.span>
          </div>

          {/* Centerpiece */}
          <div className="flex flex-col gap-10 md:gap-14">
            {/* The name — mixed italic + roman; this is the typographic signature */}
            <h1 className="font-display font-light text-mega text-cream tracking-tightest">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="block italic"
                >
                  Mai&nbsp;Linh
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Ho<span className="text-azure">.</span>
                </motion.span>
              </span>
            </h1>

            {/* Tagline + role — sits below the name, smaller and quieter */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-5 md:col-start-7"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50 mb-3">
                  /  Role
                </p>
                <p className="font-display text-large font-light italic text-cream/90 leading-tight">
                  {site.role}
                </p>
                <p className="mt-6 max-w-md text-cream/70 leading-relaxed">
                  {site.tagline} Hanoi-based, working across live productions,
                  brand storytelling and editorial.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom — scroll cue + status */}
          <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-col gap-1"
            >
              <span className="text-cream/40">/  Status</span>
              <span className="flex items-center gap-2 text-cream">
                <span className="size-1.5 rounded-full bg-azure animate-pulse" />
                Available, Spring 2026
              </span>
            </motion.div>

            <motion.a
              href="#about"
              data-cursor="hover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="group flex flex-col items-end gap-2"
              aria-label="Scroll to about"
            >
              <span className="text-cream/60 group-hover:text-cream transition-colors">
                Scroll
              </span>
              <span className="relative flex h-12 w-px overflow-hidden bg-cream/20">
                {/* The little vertical line that runs forever */}
                <motion.span
                  className="absolute inset-0 bg-cream"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* Floating tagline at bottom — kinetic, drifts very slowly */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-2 left-0 right-0 z-[5] overflow-hidden"
        >
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-50%' }}
            transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
            className="flex w-max font-display text-[clamp(7rem,18vw,18rem)] font-light italic leading-[0.75] text-cream/[0.05] whitespace-nowrap"
          >
            <span className="px-8">producing&nbsp;moments&nbsp;—</span>
            <span className="px-8">producing&nbsp;moments&nbsp;—</span>
            <span className="px-8">producing&nbsp;moments&nbsp;—</span>
            <span className="px-8">producing&nbsp;moments&nbsp;—</span>
          </motion.div>
        </div>
      </section>
    </Spotlight>
  );
}
