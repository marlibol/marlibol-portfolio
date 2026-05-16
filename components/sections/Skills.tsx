'use client';

import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { Marquee } from '@/components/ui/Marquee';
import { skills } from '@/lib/content';

/**
 * Skills — read like a typed list in a magazine credits page.
 *
 * Two parts:
 *   - Grouped lists (Live Production, Content & Editorial, Craft & Tools, Languages)
 *   - A kinetic marquee at the bottom that loops through every tool name
 *     in oversized italic — this is the "kinetic typography" beat for the section.
 *
 * No icons. No skill bars. Both look generic. The list itself is the visual.
 */
export function Skills() {
  // Flatten every skill name once for the marquee.
  const allTools = skills.flatMap((g) => g.items);

  return (
    <section
      id="skills"
      className="relative bg-cream text-ink py-24 md:py-40 grain-overlay overflow-hidden"
    >
      <div className="container-edge">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-end justify-between mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
              05 / Skills
            </span>
          </div>

          <SplitText
            as="h2"
            className="font-display text-mega font-light tracking-tightest leading-[0.88] text-ink"
            stagger={0.04}
          >
            The kit.
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-xl text-ink/70 leading-relaxed"
          >
            What I bring to a brief. Mostly built across stages and press
            desks &mdash; some learned in school, most learned on the job.
          </motion.p>
        </div>

        {/* Grouped lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {skills.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-azure mb-6">
                {String(gi + 1).padStart(2, '0')} &mdash; {group.group}
              </p>
              <ul className="flex flex-col">
                {group.items.map((item, i) => (
                  <li
                    key={item}
                    className="group flex items-center justify-between py-3 border-b border-ink/10 last:border-b-0"
                  >
                    <span className="font-display text-xl md:text-2xl font-light text-ink leading-tight">
                      {item}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-ink/40 transition-all duration-500 group-hover:text-azure group-hover:tracking-[0.4em]">
                      ·{String(i + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Kinetic strip — full-bleed, runs outside the container */}
      <div className="mt-24 md:mt-36">
        <Marquee speed={60} direction="left" className="py-4">
          <span className="font-display text-[clamp(3rem,9vw,8rem)] font-light italic leading-none text-ink/10 whitespace-nowrap">
            {allTools.map((t, i) => (
              <span key={t}>
                {t}
                {i < allTools.length - 1 && (
                  <span className="not-italic text-azure/30 mx-6">/</span>
                )}
              </span>
            ))}
            <span className="not-italic text-azure/30 mx-6">/</span>
          </span>
        </Marquee>
      </div>
    </section>
  );
}
