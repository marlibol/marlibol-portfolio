'use client';

import { useState } from 'react';
import { Loader } from '@/components/ui/Loader';
import { Cursor } from '@/components/animations/Cursor';
import { useLenis } from '@/hooks/useLenis';

/**
 * AppShell — the client-side orchestrator that wraps every page.
 *
 * Responsibilities:
 *   - Initialize Lenis smooth scroll (once, at the root)
 *   - Render the custom cursor (once, at the root)
 *   - Render the intro Loader on first visit
 *   - Lock the page body until the loader has exited
 *
 * Why this is its own component instead of being inlined into the layout:
 *   - The root layout is a Server Component (Next 14 app router pattern).
 *     Hooks and event listeners need a client component, so we delegate
 *     everything browser-touching into AppShell.
 *
 * Body lock during the loader:
 *   - We add `overflow-hidden` to the document during the loader so the
 *     user can't scroll past the intro. Once the loader signals done,
 *     we release the lock.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  useLenis();
  const [loading, setLoading] = useState(true);

  // We control overflow via a class so it composes cleanly with Lenis's
  // own .lenis class. Lenis adds .lenis-stopped to .lenis when it's paused;
  // we just gate scrolling via inline style to keep things simple.
  return (
    <>
      <Loader onDone={() => setLoading(false)} />
      <Cursor />
      <div
        style={{
          // Block scroll until the loader exits. Visibility shift on exit
          // is handled by the loader animation itself.
          overflow: loading ? 'hidden' : 'auto',
          // While loading we hide the underlying content so the loader has
          // a clean black canvas — no fragments of the page peeking through.
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        {children}
      </div>
    </>
  );
}
