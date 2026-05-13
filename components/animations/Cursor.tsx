'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { mouseX, mouseY, mouseVelocity, useMouseTracker } from '@/hooks/useMouseTracker';
import { useFinePointer } from '@/hooks/useFinePointer';

/**
 * Cursor — site-wide custom cursor.
 *
 * Two layers:
 *  - The dot:  exact, no spring. Reads mouseX/mouseY directly so the dot
 *              feels "attached" to your finger.
 *  - The ring: spring-damped so it lazily follows. The contrast between
 *              the precise dot and the trailing ring is what gives the
 *              cursor a "sentient" feel without crossing into gimmick.
 *
 * Modes (set via data-cursor on hovered elements):
 *   default | hover | view | text
 *
 * The element listens for hover events bubbled to document via event delegation
 * — cheaper than every magnetic button registering its own listener.
 *
 * Disabled on touch devices and when reduced motion is set.
 */
export function Cursor() {
  useMouseTracker(); // ensure the singleton listener is alive
  const fine = useFinePointer();
  const [mode, setMode] = useState<'default' | 'hover' | 'view' | 'text'>('default');
  const [hidden, setHidden] = useState(false);

  // Ring follows with spring damping so it feels weighty.
  const ringX = useSpring(mouseX, { stiffness: 320, damping: 32, mass: 0.7 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 32, mass: 0.7 });

  // Squash effect — when you flick the mouse fast, the ring stretches in
  // the direction of motion. This is the "ambient motion" the brief asked for.
  const stretch = useTransform(mouseVelocity, [0, 1, 4], [1, 1.15, 1.4]);

  useEffect(() => {
    if (!fine) return;

    // Event delegation — listen on document, decide based on event.target.
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const cursorAttr = t.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr === 'view')      setMode('view');
      else if (cursorAttr === 'text') setMode('text');
      else if (cursorAttr === 'hover' || t.closest('a, button, [role="button"]')) {
        setMode('hover');
      } else {
        setMode('default');
      }
    };

    const onLeaveDoc = () => setHidden(true);
    const onEnterDoc = () => setHidden(false);

    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeaveDoc);
    document.documentElement.addEventListener('mouseenter', onEnterDoc);

    document.body.classList.add('has-custom-cursor');

    return () => {
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc);
      document.documentElement.removeEventListener('mouseenter', onEnterDoc);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [fine]);

  if (!fine) return null;

  // The mode-driven ring style. We animate via Framer's variants so transitions
  // are spring-driven rather than CSS-stepped.
  const ringVariants = {
    default: { width: 36, height: 36, borderColor: 'rgba(10,15,31,0.5)', backgroundColor: 'rgba(10,15,31,0)', mixBlendMode: 'difference' as const },
    hover:   { width: 64, height: 64, borderColor: 'rgba(10,15,31,0.0)', backgroundColor: 'rgba(244,239,230,0.15)', mixBlendMode: 'difference' as const },
    view:    { width: 96, height: 96, borderColor: 'rgba(244,239,230,0.0)', backgroundColor: 'rgba(244,239,230,0.95)', mixBlendMode: 'difference' as const },
    text:    { width: 4,  height: 26, borderColor: 'rgba(10,15,31,0.0)', backgroundColor: 'rgba(10,15,31,0.85)', mixBlendMode: 'difference' as const },
  };

  return (
    <>
      {/* The dot — pixel-precise, no spring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] gpu"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: hidden || mode === 'view' || mode === 'text' ? 0 : 1,
        }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
          style={{ width: 6, height: 6, mixBlendMode: 'difference' }}
        />
      </motion.div>

      {/* The ring / morphing label */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] gpu"
        style={{
          x: ringX,
          y: ringY,
          scaleX: stretch,
          opacity: hidden ? 0 : 1,
        }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center"
          variants={ringVariants}
          animate={mode}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        >
          {mode === 'view' && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
              View
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
