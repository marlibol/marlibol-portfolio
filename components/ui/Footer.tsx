'use client';

import { site } from '@/lib/content';

/**
 * Footer — credits strip. Stays on the ink background so it reads as a
 * continuation of the contact section rather than a fourth color zone.
 */
export function Footer() {
  return (
    <footer className="relative bg-ink text-cream/40 py-8">
      <div className="container-edge flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em]">
        <span>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span className="hidden md:block">
          Built with care. Set in Fraunces &amp; Inter Tight.
        </span>
        <span>
          {site.handle} &mdash; v1.0
        </span>
      </div>
    </footer>
  );
}
