'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/cn';

type ParallaxProps = {
  children: ReactNode;
  /** how many pixels of vertical drift over the scroll range (default 120) */
  amount?: number;
  /** invert direction — useful when you want background to drift up */
  reverse?: boolean;
  className?: string;
};

/**
 * Parallax — vertical drift driven by scroll progress.
 *
 * Why useScroll(target) and not a global scroll listener:
 *  - Framer's useScroll on a target ref auto-computes a 0..1 progress
 *    value as that element passes through the viewport. We don't need to
 *    do any math.
 *  - It plays well with Lenis because Lenis emits scroll events that
 *    Framer reads via the standard scroll API.
 *
 * The drift is small by default (120px). Going further makes things
 * "shift" rather than "float", which loses the cinematic feel.
 */
export function Parallax({
  children,
  amount = 120,
  reverse = false,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // 0 when entering, 1 when leaving
  });

  // Map 0..1 -> [-amount/2, amount/2] (or reversed). Centered around the midpoint
  // so the element doesn't visibly "jump" when it enters/leaves.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [amount / 2, -amount / 2] : [-amount / 2, amount / 2]
  );

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={{ y }} className="gpu">
        {children}
      </motion.div>
    </div>
  );
}
