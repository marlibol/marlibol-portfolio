'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * ProjectStrip — danh sách dày các project phụ, dạng index entries.
 *
 * Direction:
 *   - Each row: small image (16:10 landscape) + title + venue + year + arrow.
 *   - On hover: slide right with subtle pad-left + arrow turns rust + slides.
 *   - Border-bottom dashed-style separator between rows.
 *
 * Used for projects that aren't Featured or Polaroid — currently:
 *   - Sống Trong Lòng Dân
 *   - Nhan Dan TV
 *
 * Future projects user adds will extend this list naturally.
 */

type StripItem = {
  cover: string;
  title: string;
  venue: string;
  year: string;
  alt: string;
};

type ProjectStripProps = {
  items: readonly StripItem[];
};

export function ProjectStrip({ items }: ProjectStripProps) {
  return (
    <ul className="flex flex-col">
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.7,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group relative border-b border-ink/12 last:border-b-0"
        >
          
            href="#work"
            data-cursor="view"
            className="grid grid-cols-[100px_1fr_auto_24px] md:grid-cols-[160px_1fr_120px_24px] gap-4 md:gap-8 items-center py-6 md:py-7 transition-[padding] duration-500 ease-expo-out group-hover:pl-4"
            onClick={(e) => e.preventDefault()}
            aria-label={`${item.title} at ${item.venue}, ${item.year}`}
          >
            {/* Small cover — 16:10 */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
              <Image
                src={item.cover}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100px, 160px"
                className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-[1.04]"
              />
            </div>

            {/* Title + venue */}
            <div className="min-w-0">
              <h4 className="font-display text-editorial-sm font-light text-ink leading-[1.1] tracking-tightest">
                {item.title}
              </h4>
              <p className="font-display italic text-sm md:text-[15px] text-ink/55 mt-1 leading-snug">
                {item.venue}
              </p>
            </div>

            {/* Year — right column on md+, hidden on mobile to save space */}
            <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55 text-right">
              {item.year}
            </span>

            {/* Arrow — rust on hover + slide */}
            <span
              aria-hidden
              className="font-display text-lg text-ink/35 transition-all duration-500 ease-expo-out group-hover:text-rust group-hover:translate-x-2"
            >
              →
            </span>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
