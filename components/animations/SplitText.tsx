'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import { cn } from '@/lib/cn';

type SplitTextProps = {
  children: string;
  /** how to split: by 'word' (default) or 'char' (for kinetic single-line moments) */
  split?: 'word' | 'char';
  /** stagger between each unit, in seconds */
  stagger?: number;
  /** delay before the first unit, in seconds */
  delay?: number;
  /** whether to reveal once and stay (default) or re-animate on each enter */
  once?: boolean;
  /** how far below the final position the units start, in % (default 105) */
  fromY?: number;
  /** Tailwind classes for the wrapper (typography goes here) */
  className?: string;
  /** custom amount-in-view threshold; default 0.4 (good for big type) */
  amount?: number;
  /** semantic tag — use 'h1', 'h2' etc when reveal is on a heading */
  as?: keyof Pick<JSX.IntrinsicElements, 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'>;
};

/**
 * SplitText — the foundational reveal primitive.
 *
 * How it works:
 *  1. The string is split into units (words by default).
 *  2. Each unit is wrapped in a motion.span that animates from translateY(105%)
 *     to translateY(0).
 *  3. The PARENT span has overflow-hidden so the unit is clipped while it rises.
 *     This is what gives the "reveal from below the line" feel — the same trick
 *     used by Locomotive, Studio Klar, etc. CSS overflow on inline elements
 *     only works when the parent is inline-block, hence the .reveal-line utility.
 *
 *  4. We use whileInView (not animate) so units only reveal when they enter
 *     the viewport — saves us from setting up our own IntersectionObserver.
 *
 * Why not splitting characters by default:
 *  - Word-level splitting respects word-wrapping; char-level can break ligatures
 *    and break on resize. Char split is opt-in for short, intentional moments.
 *
 * Reduced-motion path: we render plain text with no transforms.
 */
export function SplitText({
  children,
  split = 'word',
  stagger = 0.06,
  delay = 0,
  once = true,
  fromY = 105,
  className,
  amount = 0.4,
  as: Tag = 'div',
}: SplitTextProps) {
  const reduce = useReducedMotion();

  // Memoize the split — we don't want to re-split on every render.
  const units = useMemo(() => {
    if (split === 'char') return Array.from(children);
    return children.split(/(\s+)/); // keep whitespace tokens so spacing survives
  }, [children, split]);

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={cn('font-stylize', className)} aria-label={children}>
      {units.map((unit, i) => {
        // Whitespace tokens shouldn't animate or take a wrapper — render as-is.
        if (/^\s+$/.test(unit)) {
          return <span key={i} aria-hidden> {unit}</span>;
        }
        return (
          <span key={i} className="reveal-line align-baseline" aria-hidden>
            <motion.span
              className="inline-block"
              initial={{ y: `${fromY}%`, opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once, amount }}
              transition={{
                duration: 1.0,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1], // expo-out — same curve Lenis uses
              }}
            >
              {unit}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
