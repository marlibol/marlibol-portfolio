'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Magnetic } from '@/components/animations/Magnetic';
import { site } from '@/lib/content';
import { cn } from '@/lib/cn';

const NAV_ITEMS = [
  { label: 'Index',   href: '#hero' },
  { label: 'Note',    href: '#about' },
  { label: 'Work',    href: '#work' },
  { label: 'Lineage', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Nav — minimal, fixed, breathes when you scroll past the hero.
 *
 * Two states:
 *  - Top of page: transparent on the dark hero, no border
 *  - Scrolled:    light glassmorphic panel that floats above content
 *
 * The transition itself is driven by useScroll → useTransform on the
 * scroll position rather than a binary boolean — that way the nav
 * fades smoothly rather than snapping at a threshold.
 *
 * The clock in the right corner ticks live (Hanoi time). It's a small
 * detail but adds tactile presence — the site feels "now" rather than
 * a static document.
 */
export function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  // We use a single transform to drive borderBottomColor (rgba string),
  // calling useTransform at the top level — not inside JSX, which would
  // violate the rules of hooks.
  const borderBottomColor = useTransform(
    scrollY,
    [0, 200],
    ['rgba(10,15,31,0)', 'rgba(10,15,31,0.06)']
  );

  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const d = new Date();
      // Hanoi local time, 24h
      const fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Ho_Chi_Minh',
      });
      setTime(fmt.format(d));
    };
    update();
    const id = setInterval(update, 30_000); // every 30s — nobody needs second precision
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50"
    >
      {/* Background panel — opacity ramps up after the hero. Framer animates
          backgroundColor's alpha via the borderBottomColor + bgOpacity chain
          set up at the top of the component. */}
      <motion.div
        className="absolute inset-0 glass"
        style={{
          opacity: bgOpacity,
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor,
        }}
      />
      <div className="relative container-edge flex items-center justify-between py-4 md:py-5">
        {/* Wordmark */}
        <Link
          href="#hero"
          className="font-display text-lg leading-none tracking-tightest"
          data-cursor="hover"
        >
          <span className="italic">marli</span>bol<span className="text-azure">.</span>
        </Link>

        {/* Center nav — desktop only */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item, i) => (
            <Magnetic key={item.href} strength={0.25}>
              <Link
                href={item.href}
                className="group relative font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70 hover:text-ink transition-colors"
                data-cursor="hover"
              >
                <span className="text-azure mr-2">0{i + 1}</span>
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-500 ease-expo-out group-hover:w-full" />
              </Link>
            </Magnetic>
          ))}
        </nav>

        {/* Time */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70">
          <span className="size-1.5 rounded-full bg-azure animate-pulse" />
          <span className="tabular-nums">{time || '— —'}</span>
          <span>HAN</span>
        </div>

        {/* Mobile — just a quick contact link, sized to thumb */}
        <Link
          href="#contact"
          className="md:hidden font-mono text-[11px] uppercase tracking-[0.25em] text-ink"
          data-cursor="hover"
        >
          Contact
        </Link>
      </div>
    </motion.header>
  );
}
