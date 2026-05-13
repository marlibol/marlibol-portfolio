'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/lib/content';

type LoaderProps = {
  onDone?: () => void;
};

/**
 * Loader — the first moment.
 *
 * Three beats:
 *   1. Count 0 → 100 over ~1.6s with the displayed name in the center
 *   2. Hold for ~250ms at 100
 *   3. Curtain sweeps up, taking the loader with it; the page beneath is revealed
 *
 * We DON'T tie the count to actual asset loading — at this scale that would
 * mean mostly-empty progress and abrupt jumps. The point of the loader isn't
 * truth, it's atmosphere: a controlled overture before the page begins.
 *
 * Persistence: we keep the loader for first visit only (sessionStorage flag).
 * Returning visitors skip straight to the page so the site feels fast on
 * repeat browsing — common pattern on Awwwards portfolios.
 */
export function Loader({ onDone }: LoaderProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [shouldShow, setShouldShow] = useState<null | boolean>(null);

  // Stash onDone in a ref so the decision effect below doesn't depend on it.
  // Without this, an unstable parent callback would re-run our setup effect
  // and we'd risk double-firing or flickering the loader.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // Decide whether to show the loader at all. Runs exactly once.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem('marlibol-intro-seen');
    if (seen) {
      setShouldShow(false);
      onDoneRef.current?.();
    } else {
      setShouldShow(true);
      sessionStorage.setItem('marlibol-intro-seen', '1');
    }
  }, []);

  // Counter — 0 to 100 over ~1.6s. We use rAF so the count doesn't drift
  // when the tab is throttled.
  useEffect(() => {
    if (!shouldShow) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out so the count slows as it approaches 100 — feels less mechanical.
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Brief hold at 100 before triggering the exit
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldShow]);

  // Notify parent when the exit animation completes
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => onDoneRef.current?.(), 1200); // matches exit duration
    return () => clearTimeout(t);
  }, [done]);

  if (shouldShow === null || shouldShow === false) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: [0.87, 0, 0.13, 1] }} // expo-io
          className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-ink text-cream grain-overlay grain-overlay-dark"
        >
          {/* Top bar — handle + role */}
          <div className="container-edge flex items-start justify-between pt-6 md:pt-8">
            <motion.span
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/70"
            >
              {site.handle} — Portfolio · 2026
            </motion.span>
            <motion.span
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/70 hidden sm:block"
            >
              {site.city}
            </motion.span>
          </div>

          {/* Center — name */}
          <div className="container-edge flex flex-col items-start justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/60 mb-4"
            >
              [ Index 000 ]
            </motion.span>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-mega font-light leading-[0.85] text-cream"
            >
              <span className="block italic">Mai Linh</span>
              <span className="block">Ho.</span>
            </motion.h1>
          </div>

          {/* Bottom bar — counter */}
          <div className="container-edge flex items-end justify-between pb-6 md:pb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/70">
              Loading the work
            </span>
            <span
              className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-none text-cream tabular-nums"
              aria-live="polite"
            >
              {String(count).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
