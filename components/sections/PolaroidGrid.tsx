'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * PolaroidGrid — 3 floating polaroids xếp lệch lạc kiểu scrapbook.
 *
 * Direction:
 *   - Each polaroid is a 1:1 square photo on white card, with caption
 *     + sub-caption below in editorial style.
 *   - Cards rotate -3° / +2° / -1° in default state (lệch lạc, không hoàn hảo).
 *   - Hover straightens them + lifts up + brightens shadow.
 *   - Slight vertical offset on card 2 (translateY +24px) for visual rhythm.
 *
 * Used inside Work section to display Vietinbank + Phan Mạnh Quỳnh +
 * Tâm Thức Tinh Hoa projects. Other projects go into ProjectStrip below.
 */

type PolaroidItem = {
  cover: string;
  label: string;      // big title (uppercase, mono)
  sub: string;        // sub-caption italic
  alt: string;        // accessible alt text
};

type PolaroidGridProps = {
  items: readonly PolaroidItem[];
};

// Rotation values for 3 cards — defined here so they don't depend on
// arbitrary Tailwind classes that might not be JIT-generated.
const ROTATIONS = ['-3deg', '2deg', '-1deg'];
const VERTICAL_OFFSETS = [0, 24, 0]; // px — card 2 slightly lower for rhythm

export function PolaroidGrid({ items }: PolaroidGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-14 py-section-sm">
      {items.map((item, i) => (
        <motion.figure
          key={item.label}
          initial={{
            opacity: 0,
            y: 40,
            rotate: 0,
          }}
          whileInView={{
            opacity: 1,
            y: VERTICAL_OFFSETS[i] ?? 0,
            rotate: 0,
          }}
          whileHover={{
            rotate: 0,
            y: (VERTICAL_OFFSETS[i] ?? 0) - 8,
            scale: 1.02,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            delay: i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          // Default rotation set via inline style so motion can animate
          // from rotate:0 back to the resting rotation on hover-out.
          style={{
            transform: `rotate(${ROTATIONS[i] ?? '0deg'})`,
          }}
          className="bg-white p-3 pb-10 shadow-polaroid hover:shadow-polaroid-hover transition-shadow duration-500 cursor-default"
          data-cursor="hover"
        >
          {/* Photo — 1:1 square */}
          <div className="relative aspect-square w-full overflow-hidden bg-ink-800">
            <Image
              src={item.cover}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Caption block — magazine archive style */}
          <figcaption className="mt-4 text-center px-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink leading-tight">
              {item.label}
            </p>
            <p className="font-display italic text-[12px] text-ink/55 mt-1 leading-snug">
              {item.sub}
            </p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
