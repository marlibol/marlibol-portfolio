'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { mouseX, mouseY, mouseVelocity, useMouseTracker } from '@/hooks/useMouseTracker';
import { useFinePointer } from '@/hooks/useFinePointer';

/**
 * Cursor — site-wide custom cursor.
 *
 * Visibility fix (v2):
 * The old version used mix-blend-mode: difference which inverts colors —
 * great on pure black/white, but on the azure/cream palette the inverted
 * result lands at near-cream → invisible on cream sections.
 *
 * New approach: dual-tone cursor with a black core + cream halo, plus a
 * morphing outline ring. Both rendered with regular blending so they read
 * on any background color.
 *
 * Modes: default | hover | view | text
 */
export function Cursor() {
  useMouseTracker();
  const fine = useFinePointer();
  const [mode, setMode] = useState<'default' | 'hover' | 'view' | 'text'>('default');
  const [hidden, setHidden] = useState(false);

  // Spring-damped ring for that weighty trailing feel.
  const ringX = useSpring(mouseX, { stiffness: 320, damping: 32, mass: 0.7 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 32, mass: 0.7 });

  // Squash on flick — directional stretch tied to velocity.
  const stretch = useTransform(mouseVelocity, [0, 1, 4], [1, 1.15, 1.4]);

  useEffect(() => {
    if (!fine) return;

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

  // Mode-driven ring style — no mix-blend-mode. Uses solid strokes + a soft
  // shadow that gives just enough separation from any background.
  const ringVariants = {
    default: {
      width: 36, height: 36,
      borderColor: 'rgba(244,239,230,0.95)',
      borderWidth: 1.5,
      backgroundColor: 'rgba(10,15,31,0)',
    },
    hover: {
      width: 60, height: 60,
      borderColor: 'rgba(244,239,230,0.95)',
      borderWidth: 1.5,
      backgroundColor: 'rgba(62,124,203,0.18)',
    },
    view: {
      width: 96, height: 96,
      borderColor: 'rgba(244,239,230,0)',
      borderWidth: 0,
      backgroundColor: 'rgba(244,239,230,0.95)',
    },
    text: {
      width: 4, height: 26,
      borderColor: 'rgba(244,239,230,0)',
      borderWidth: 0,
      backgroundColor: 'rgba(244,239,230,0.95)',
    },
  };

  return (
    <>
      {/* The dot — pixel-precise, no spring.
          Dual-tone trick: cream halo (10px) + ink core (5px) stacked.
          This reads on any background, including azure-blue zones, without
          relying on mix-blend-mode (which fails on near-azure colors). */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] gpu"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: hidden || mode === 'view' || mode === 'text' ? 0 : 1,
        }}
      >
        {/* outer cream halo */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 10,
            height: 10,
            background: 'rgba(244,239,230,0.95)',
            boxShadow: '0 0 0 1px rgba(10,15,31,0.15)',
          }}
        />
        {/* inner ink core */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 5,
            height: 5,
            background: '#0A0F1F',
          }}
        />
      </motion.div>

      {/* The morphing ring — bigger, springy trail */}
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
          style={{
            boxShadow: '0 0 0 1px rgba(10,15,31,0.25), 0 4px 14px rgba(10,15,31,0.18)',
          }}
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
