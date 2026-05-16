'use client';

import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { Marquee } from '@/components/ui/Marquee';
import { skills } from '@/lib/content';

/**
 * Skills — refined R6.
 *
 * Direction shift from v1:
 *   - Group labels promoted to mono uppercase stamps (was just plain text).
 *   - Items moved from small sans to Fraunces 18-20px serif — reads more
 *     like a catalog spec than a resume bullet list.
 *   - Dashed border separator between items (one per line).
 *   - Bottom marquee scrolls tool names continuously — credit roll vibe.
 *
 * Layout: 2x2 grid for the 4 groups, with the marquee spanning full width
 * underneath. Dark section so it sits between Work (cream) and Hobbies
 * (cream) without three light sections stacking.
 *
 * The marquee text is hardcoded here rather than derived from skills[2].items
 * because we want a richer roll that mentions additional adjacent tools
 * (After Effects, Lightroom, Figma) — the canonical Skills data stays the
 * concise version that reads cleanly above.
 */
export function Skills() {
  return (
    <section
      id="skills"
      className="relative bg-ink text-cream py-section-lg md:py-section-xl grain-overlay grain-overlay-dark overflow-hidden"
    >
      <div className="container-edge">
        {/* Section header */}
        <div className="mb-16 md:mb-20 flex items-end justify-between">
          <span className="font-mono text-meta text-cream/55">
            05 / Skills
          </span>
          <span className="font-mono text-meta text-cream/45 hidden md:block">
            The toolkit
          </span>
        </div>

        {/* Two-line headline */}
        <div className="mb-16 md:mb-24">
          <SplitText
            as="h2"
            className="font-display text-giant font-light leading-[0.92] tracking-tightest text-cream"
            stagger={0.04}
          >
            The
          </SplitText>
          <SplitText
            as="h2"
            className="font-display text-giant font-light italic leading-[0.92] tracking-tightest text-cream/65 -mt-2"
            stagger={0.04}
            delay={0.15}
          >
            kit.
          </SplitText>
        </div>

        {/* 2x2 grid of skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 md:gap-y-20">
          {skills.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: gi * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Group label — mono stamp */}
              <div className="mb-5 flex items-baseline justify-between border-b border-cream/15 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
                  / {group.group}
                </span>
                <span className="font-mono text-[9px] text-cream/35 tracking-[0.2em]">
                  {String(gi + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Items list */}
              <ul className="flex flex-col">
                {group.items.map((item, i) => (
                  <li
                    key={item}
                    className="font-display text-xl md:text-[22px] font-light text-cream/95 leading-relaxed py-2.5 border-b border-dashed border-cream/15 last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom tools marquee — credit roll vibe, full-width */}
      <div className="mt-20 md:mt-28 border-t border-b border-cream/15 py-5">
        <Marquee speed={45} direction="left" className="py-2">
          <span className="font-mono text-sm md:text-base uppercase tracking-[0.25em] text-cream/55 whitespace-nowrap">
            Photoshop
            <span className="text-azure/65 mx-6">·</span>
            Premiere Pro
            <span className="text-azure/65 mx-6">·</span>
            CapCut
            <span className="text-azure/65 mx-6">·</span>
            Canva
            <span className="text-azure/65 mx-6">·</span>
            After Effects
            <span className="text-azure/65 mx-6">·</span>
            Lightroom
            <span className="text-azure/65 mx-6">·</span>
            Figma
            <span className="text-azure/65 mx-6">·</span>
            Microsoft 365
            <span className="text-azure/65 mx-6">·</span>
            Google Workspace
            <span className="text-azure/65 mx-6">·</span>
            Notion
            <span className="text-azure/65 mx-6">·</span>
            Slack
            <span className="text-azure/65 mx-6">·</span>
          </span>
        </Marquee>
      </div>
    </section>
  );
}
