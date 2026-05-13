'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

type MarqueeProps = {
  children: ReactNode;
  /** loop duration in seconds — lower = faster (default 40) */
  speed?: number;
  /** scroll direction */
  direction?: 'left' | 'right';
  className?: string;
};

/**
 * Marquee — pure CSS-driven kinetic strip.
 *
 * We render the content twice and animate the whole thing -50% along the X
 * axis. That way the second copy slides in seamlessly behind the first,
 * giving the illusion of an endless loop.
 *
 * Why not the keyframes from tailwind.config.js directly: I want the duration
 * to be configurable per instance. CSS variables would work too, but Framer's
 * `animate` prop is more readable and can be paused on hover if needed later.
 *
 * The `marquee-mask` utility on the wrapper feathers the edges so the type
 * doesn't hard-cut at the viewport gutters.
 */
export function Marquee({
  children,
  speed = 40,
  direction = 'left',
  className,
}: MarqueeProps) {
  const distance = direction === 'left' ? '-50%' : '0%';
  const start    = direction === 'left' ? '0%'   : '-50%';

  return (
    <div className={cn('relative overflow-hidden marquee-mask', className)}>
      <motion.div
        className="flex w-max"
        initial={{ x: start }}
        animate={{ x: distance }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {/* Render twice for seamless looping */}
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}
