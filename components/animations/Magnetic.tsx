'use client';

import { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '@/hooks/useFinePointer';
import { cn } from '@/lib/cn';

type MagneticProps = {
  children: ReactNode;
  /** how far the element pulls toward the cursor, in px */
  strength?: number;
  /** how strong the spring is — lower = more elastic */
  stiffness?: number;
  className?: string;
};

/**
 * Magnetic — wraps an element so it gently follows the cursor on hover.
 *
 * Implementation notes:
 *  - We use a ref + getBoundingClientRect to compute the cursor offset
 *    relative to the element's center. NOT mouseX from the global hook —
 *    that would force this component to subscribe to every mouse move
 *    even when the cursor is far away.
 *  - The pull is clamped/damped via Framer's useSpring so the motion
 *    feels alive rather than mechanical.
 *  - On reset, we set both x and y back to 0 in onMouseLeave; the spring
 *    handles the return curve.
 *  - Disabled on touch devices where there's no hover anyway.
 *
 * Use this for: primary CTAs, social links in the footer, the "view project"
 * link on each project card. NOT for body text or large surfaces.
 */
export function Magnetic({
  children,
  strength = 0.45,
  stiffness = 150,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const fine = useFinePointer();

  // Spring config — `damping` controls overshoot, `stiffness` controls speed.
  const sx = useSpring(x, { stiffness, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness, damping: 20, mass: 0.4 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('inline-block', className)}
    >
      <motion.div style={{ x: sx, y: sy }} className="magnetic">
        {children}
      </motion.div>
    </div>
  );
}
