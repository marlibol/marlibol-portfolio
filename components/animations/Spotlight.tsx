'use client';

import { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '@/hooks/useFinePointer';
import { cn } from '@/lib/cn';

type SpotlightProps = {
  children: ReactNode;
  /** glow color — should match the section's accent */
  color?: string;
  /** glow size in px (the radial gradient's outer radius) */
  size?: number;
  /** Tailwind class for the wrapper */
  className?: string;
};

/**
 * Spotlight — a soft radial glow that follows the cursor inside its
 * container. Adds atmosphere to dark sections without using glassmorphism.
 *
 * Why local-coordinate (vs the global mouse hook):
 *  - The glow needs to be relative to the container, not the viewport.
 *    Reading e.clientX directly and converting via getBoundingClientRect
 *    keeps the math local and means we don't need to know where the
 *    container is on the page.
 *
 * Performance:
 *  - The glow is a single absolute-positioned div with `filter: blur()`.
 *    GPU-accelerated; no JS animation loop running per frame.
 *  - useSpring smooths the cursor position so the glow doesn't pop on
 *    fast movements.
 */
export function Spotlight({
  children,
  color = 'rgba(62, 124, 203, 0.35)',
  size = 480,
  className,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const fine = useFinePointer();

  const sx = useSpring(x, { stiffness: 80, damping: 18, mass: 1 });
  const sy = useSpring(y, { stiffness: 80, damping: 18, mass: 1 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn('relative overflow-hidden', className)}
    >
      {fine && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 gpu"
          style={{
            x: sx,
            y: sy,
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
            filter: 'blur(40px)',
          }}
        />
      )}
      {children}
    </div>
  );
}
