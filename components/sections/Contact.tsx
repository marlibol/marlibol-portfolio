'use client';

import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { Magnetic } from '@/components/animations/Magnetic';
import { Spotlight } from '@/components/animations/Spotlight';
import { site } from '@/lib/content';

/**
 * Contact — the closing section.
 *
 * The page is a journey from dark (hero) → light (about, work, skills,
 * philosophy) → dark (contact). The return to ink at the end gives the
 * site a sense of having closed a book.
 *
 * The CTA is a magnetic email button. It's big — about the size of a
 * section heading — because it IS the call to action and the brief said
 * no generic UI blocks.
 *
 * Below the CTA, the socials read like the colophon at the back of a
 * magazine. Quiet, informational, no icons.
 */
export function Contact() {
  return (
    <Spotlight color="rgba(62, 124, 203, 0.35)" size={560}>
      <section
        id="contact"
        className="relative bg-ink text-cream py-24 md:py-40 grain-overlay grain-overlay-dark overflow-hidden"
      >
        <div className="container-edge">
          {/* Header */}
          <div className="mb-20 md:mb-32">
            <div className="flex items-end justify-between mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50">
                06 / Contact
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50 hidden md:block">
                Available, Spring 2026
              </span>
            </div>

            <SplitText
              as="h2"
              className="font-display text-mega font-light tracking-tightest leading-[0.86] text-cream"
              stagger={0.04}
            >
              Have a room
            </SplitText>
            <SplitText
              as="h2"
              className="font-display text-mega font-light italic tracking-tightest leading-[0.86] text-azure -mt-2 md:-mt-4"
              stagger={0.04}
              delay={0.15}
            >
              to fill?
            </SplitText>
          </div>

          {/* Magnetic email CTA */}
          <div className="mt-16 md:mt-20">
            <Magnetic strength={0.35}>
              <a
                href={`mailto:${site.email}`}
                data-cursor="hover"
                className="group inline-flex items-center gap-4 md:gap-6 border-b border-cream/30 pb-3 transition-colors hover:border-azure"
                aria-label={`Email ${site.email}`}
              >
                <span className="font-display font-light italic text-[clamp(2rem,5.5vw,4.5rem)] text-cream leading-none">
                  Write to me
                </span>
                <span
                  className="inline-block transition-transform duration-500 ease-expo-out group-hover:translate-x-3 group-hover:text-azure"
                  aria-hidden
                >
                  <svg
                    width="56"
                    height="24"
                    viewBox="0 0 56 24"
                    fill="none"
                    className="md:w-[72px] md:h-[28px]"
                  >
                    <path
                      d="M44 4l8 8-8 8M0 12h52"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </a>
            </Magnetic>

            <p className="mt-6 max-w-md text-cream/60 leading-relaxed">
              For productions, brand commissions, editorial work, or anything
              else &mdash; the kettle&rsquo;s on. Hanoi-based, available remote.
            </p>
          </div>

          {/* Colophon — socials + meta in editorial layout */}
          <div className="mt-24 md:mt-40 hairline hairline-light" />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-2">
                /  Email
              </p>
              <a
                href={`mailto:${site.email}`}
                data-cursor="hover"
                className="font-display text-lg md:text-xl font-light text-cream hover:text-azure transition-colors break-all"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-2">
                /  Based
              </p>
              <p className="font-display text-lg md:text-xl font-light text-cream">
                {site.city}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-2">
                /  Elsewhere
              </p>
              <ul className="flex flex-col gap-1">
                {Object.entries(site.socials).map(([k, v]) => (
                  <li key={k}>
                    <a
                      href={v}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="font-display text-lg md:text-xl font-light text-cream hover:text-azure transition-colors capitalize inline-flex items-center gap-2 group"
                    >
                      {k}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-500 ease-expo-out group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-2">
                /  Languages
              </p>
              <p className="font-display text-lg md:text-xl font-light text-cream">
                EN — C1
                <br />
                Vietnamese — Native
              </p>
            </div>
          </div>
        </div>

        {/* Closing oversized signature */}
        <div className="mt-32 md:mt-44 overflow-hidden">
          <motion.h2
            initial={{ y: '50%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light leading-[0.85] tracking-tightest text-cream text-center"
            style={{ fontSize: 'clamp(5rem, 22vw, 24rem)' }}
          >
            <span className="italic text-azure">marli</span>bol
          </motion.h2>
        </div>
      </section>
    </Spotlight>
  );
}
