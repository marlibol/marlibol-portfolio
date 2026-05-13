'use client';

import { useEffect } from 'react';
import { motionValue, MotionValue } from 'framer-motion';

/**
 * Singleton mouse motion-values.
 *
 * Why singletons (declared at module scope, not inside the hook):
 *  - We want every component that reads cursor position to share ONE set of
 *    motion values. If each component created its own MotionValue, we'd
 *    fan out N event listeners and lose cross-component sync.
 *  - Framer Motion's MotionValue is observable — reading it from anywhere
 *    triggers re-renders only on the components that bind it.
 *
 * Coordinate system: viewport pixels (clientX/clientY), not page coordinates.
 * That's correct for cursor-following UI (which should stay with the viewport)
 * but wrong if you wanted scroll-aware element following — for that, add
 * window.scrollY to .y at read time.
 */
export const mouseX: MotionValue<number> = motionValue(0);
export const mouseY: MotionValue<number> = motionValue(0);
export const mouseVelocity: MotionValue<number> = motionValue(0);

let attached = false; // guard against StrictMode double-invocation in dev

export function useMouseTracker() {
  useEffect(() => {
    if (attached) return;
    attached = true;

    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Velocity in px/ms — we expose it for the cursor's "stretch on flick" effect.
      const now = performance.now();
      const dt = now - lastT || 1;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const v = Math.hypot(dx, dy) / dt;
      mouseVelocity.set(v);

      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      attached = false;
    };
  }, []);
}
