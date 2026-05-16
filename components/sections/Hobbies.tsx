'use client';

import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';

/**
 * Hobbies — refined R7 (asymmetric scrapbook).
 *
 * Direction:
 *   - 4 floating polaroid cards positioned absolutely on desktop, stacked
 *     on mobile.
 *   - Each card rotates slightly (-3 / 2.5 / 1.5 / -2 deg).
 *   - Colored sticker badges on top corners (rust / ink / azure).
 *   - Handwritten italic notes scattered between cards.
 *   - Arrow annotation pointing to one of the cards.
 *   - Hover any card to straighten + lift + brighten shadow.
 *
 * Mobile fallback: stage becomes a vertical column, cards keep their
 * rotation but stack instead of float. Stickers + handwritten notes still
 * appear but anchored to each card.
 *
 * Photos are gradient placeholders for now. When user uploads real images,
 * flip the `hobbiesReady` flag and Image components will load real files.
 */

const hobbiesReady = false;

type HobbyCard = {
  title: string;
  meta: string;
  imgFilename: string;
  imgMetaCaption: string;
  gradient: string;
  sticker: { text: string; color: 'rust' | 'ink' | 'azure' };
};

const HOBBIES: readonly HobbyCard[] = [
  {
    title: 'Marketing Foundation',
    meta:  'with Hưng Lưu',
    imgFilename: '/images/hobby-marketing.jpg',
    imgMetaCaption: 'Marketing class · 2026',
    gradient: 'linear-gradient(135deg, #b8542b 0%, #4a2530 100%)',
    sticker: { text: 'Learning', color: 'ink' },
  },
  {
    title: 'Learning AI',
    meta:  'curiosity-driven',
    imgFilename: '/images/hobby-ai.jpg',
    imgMetaCaption: 'Notebook · AI tools',
    gradient: 'linear-gradient(135deg, #2a3550 0%, #3E7CCB 100%)',
    sticker: { text: 'In Progress', color: 'azure' },
  },
  {
    title: 'Vibe coding',
    meta:  'building with AI',
    imgFilename: '/images/hobby-vibecoding.jpg',
    imgMetaCaption: 'marlibol.vercel.app',
    gradient: 'linear-gradient(135deg, #1d4a3a 0%, #3a6a52 100%)',
    sticker: { text: 'This site', color: 'rust' },
  },
  {
    title: 'Photowalks',
    meta:  'Hanoi streets',
    imgFilename: '/images/hobby-photowalks.jpg',
    imgMetaCaption: 'Hà Nội streets · 35mm',
    gradient: 'linear-gradient(135deg, #2a2a3a 0%, #4a4555 100%)',
    sticker: { text: '35mm', color: 'ink' },
  },
];

// Sticker color map — explicit so Tailwind JIT picks these up.
const STICKER_BG = {
  rust:  'bg-rust',
  ink:   'bg-ink',
  azure: 'bg-azure',
} as const;

// Per-card desktop layout (top/left/rotation/stickerPos).
const DESKTOP_LAYOUT = [
  { top: '0', left: '4%',  rotate: '-3deg',   stickerTop: '-10px', stickerSide: 'right', stickerOffset: '-16px', stickerRotate: '8deg' },
  { top: '6%', left: '28%', rotate: '2.5deg',  stickerTop: '-12px', stickerSide: 'left',  stickerOffset: '-14px', stickerRotate: '-6deg' },
  { top: '46%', left: '8%', rotate: '1.5deg',  stickerTop: '-10px', stickerSide: 'right', stickerOffset: '-10px', stickerRotate: '-6deg' },
  { top: '38%', left: '32%',rotate: '-2deg',   stickerTop: '-8px',  stickerSide: 'left',  stickerOffset: '-16px', stickerRotate: '-10deg' },
];

export function Hobbies() {
  return (
    <section
      id="hobbies"
      className="relative bg-cream text-ink py-section-lg md:py-section-xl grain-overlay overflow-hidden"
    >
      <div className="container-edge">
        {/* Section header */}
        <div className="mb-16 md:mb-20 flex items-end justify-between">
          <div>
            <span className="font-mono text-meta text-ink/55">
              06 / Off-hours
            </span>
          </div>
          <div className="text-right hidden md:block">
            <span className="font-mono text-meta text-ink/45 block mb-1">
              04 things
            </span>
            <span className="font-display italic text-sm text-ink/50">
              A few human notes.
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-16 md:mb-24">
          <SplitText
            as="h2"
            className="font-display text-giant font-light leading-[0.92] tracking-tightest text-ink"
            stagger={0.04}
          >
            Outside
          </SplitText>
          <SplitText
            as="h2"
            className="font-display text-giant font-light italic leading-[0.92] tracking-tightest text-ink/65 -mt-2"
            stagger={0.04}
            delay={0.15}
          >
            the work.
          </SplitText>
        </div>

        {/* DESKTOP layout — absolute positioned scrapbook stage */}
        <div className="hidden md:block relative" style={{ minHeight: '720px' }}>
          {HOBBIES.map((h, i) => {
            const layout = DESKTOP_LAYOUT[i];
            return (
              <HobbyCardDesktop
                key={h.title}
                hobby={h}
                index={i}
                layout={layout}
              />
            );
          })}

          {/* Handwritten annotation note */}
          <p
            className="absolute font-display italic text-sm text-ink/55 max-w-[220px] leading-snug"
            style={{ top: '8%', left: '58%', transform: 'rotate(-4deg)' }}
          >
            &ldquo;Frameworks, mindset and craft — from someone with 11+ years across MoMo, PMAX, Topica.&rdquo;
          </p>

          {/* Arrow annotation */}
          <span
            aria-hidden
            className="absolute font-display text-3xl text-ink/30"
            style={{ top: '14%', left: '54%', transform: 'rotate(-15deg)' }}
          >
            ↘
          </span>

          {/* Second handwritten note */}
          <p
            className="absolute font-display italic text-sm text-ink/55 max-w-[200px] leading-snug"
            style={{ top: '70%', left: '60%', transform: 'rotate(2deg)' }}
          >
            &ldquo;Yes — this website is one of the experiments.&rdquo;
          </p>
        </div>

        {/* MOBILE layout — stacked cards with rotation kept */}
        <div className="md:hidden flex flex-col gap-12">
          {HOBBIES.map((h, i) => (
            <HobbyCardMobile key={h.title} hobby={h} index={i} />
          ))}

          <p className="font-display italic text-sm text-ink/55 leading-snug mt-2 max-w-sm">
            &ldquo;Frameworks, mindset and craft — from someone with 11+ years across MoMo, PMAX, Topica.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HobbyCardDesktop — absolutely positioned floating polaroid
// ============================================================

type DesktopLayout = {
  top: string;
  left: string;
  rotate: string;
  stickerTop: string;
  stickerSide: 'left' | 'right';
  stickerOffset: string;
  stickerRotate: string;
};

function HobbyCardDesktop({
  hobby,
  index,
  layout,
}: {
  hobby: HobbyCard;
  index: number;
  layout: DesktopLayout;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: 'absolute',
        top: layout.top,
        left: layout.left,
        transform: `rotate(${layout.rotate})`,
        width: '280px',
      }}
      className="bg-white p-3 pb-10 shadow-polaroid hover:shadow-polaroid-hover transition-shadow duration-500 cursor-default"
      data-cursor="hover"
    >
      {/* Image area */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden"
        style={{ background: hobby.gradient }}
      >
        {/* Caption overlay bottom-left */}
        <span className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-[0.2em] text-cream/85">
          {hobby.imgMetaCaption}
        </span>
      </div>

      {/* Title + meta */}
      <div className="mt-4 text-center px-1">
        <p className="font-display italic text-base text-ink/85 leading-tight">
          {hobby.title}
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45 mt-1">
          {hobby.meta}
        </p>
      </div>

      {/* Sticker badge */}
      <span
        className={`absolute ${STICKER_BG[hobby.sticker.color]} text-cream px-3 py-1 font-mono text-[8px] uppercase tracking-[0.22em] shadow-md`}
        style={{
          top: layout.stickerTop,
          [layout.stickerSide]: layout.stickerOffset,
          transform: `rotate(${layout.stickerRotate})`,
        }}
      >
        {hobby.sticker.text}
      </span>
    </motion.div>
  );
}

// ============================================================
// HobbyCardMobile — stacked variant
// ============================================================

const MOBILE_ROTATIONS = ['-2deg', '1.5deg', '-1deg', '2deg'];

function HobbyCardMobile({
  hobby,
  index,
}: {
  hobby: HobbyCard;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        transform: `rotate(${MOBILE_ROTATIONS[index] ?? '0deg'})`,
      }}
      className="relative bg-white p-3 pb-8 shadow-polaroid mx-auto max-w-[280px] w-full"
    >
      <div
        className="relative aspect-[4/5] w-full overflow-hidden"
        style={{ background: hobby.gradient }}
      >
        <span className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-[0.2em] text-cream/85">
          {hobby.imgMetaCaption}
        </span>
      </div>

      <div className="mt-3 text-center">
        <p className="font-display italic text-base text-ink/85 leading-tight">
          {hobby.title}
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45 mt-1">
          {hobby.meta}
        </p>
      </div>

      {/* Sticker on mobile — fixed top-right corner */}
      <span
        className={`absolute ${STICKER_BG[hobby.sticker.color]} text-cream px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.22em] shadow-md`}
        style={{
          top: '-8px',
          right: '-10px',
          transform: 'rotate(-6deg)',
        }}
      >
        {hobby.sticker.text}
      </span>
    </motion.div>
  );
}
