'use client';

import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { site } from '@/lib/content';

/**
 * Contact — refined R8 (closing magazine spread).
 *
 * Final section of the site. Direction:
 *   - Full-bleed hero with cinematic gradient (placeholder until photo).
 *   - Two stamps: "End spread · 07/07" white + "Hà Nội / 2026" mono.
 *   - Big title "Get in touch." in Fraunces over the hero.
 *   - Body: pull quote left + contact list right.
 *   - Contact rows are real links (mailto, tel, IG, LinkedIn) with hover
 *     slide + arrow turning rust.
 *   - Handwritten italic endnote rotated 1°.
 *   - Footer signature "— marlibol" italic rotated -1.5°.
 *
 * When user adds a real closing image (/images/contact-closing.jpg), flip
 * the `closingImageReady` flag and replace the gradient div with <Image>.
 */

const closingImageReady = false;

export function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-ink text-cream grain-overlay grain-overlay-dark overflow-hidden"
    >
      {/* HERO SPREAD — full-bleed 21:9 */}
      <div className="relative w-full aspect-[21/9] min-h-[320px] md:min-h-[420px] overflow-hidden">
        {/* Gradient placeholder (will be replaced by real image) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #1a2540 0%, #3E7CCB 30%, #b8542b 70%, #4a2530 100%)',
          }}
          aria-hidden
        />

        {/* Bottom-to-top vignette so stamps stay readable */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,15,31,0.35) 0%, rgba(10,15,31,0.1) 50%, rgba(10,15,31,0.75) 100%)',
          }}
        />

        {/* Top-left stamp */}
        <div className="absolute top-5 left-5 md:top-7 md:left-7 z-10">
          <span className="px-2.5 py-1 bg-cream text-ink font-mono text-[10px] uppercase tracking-[0.25em]">
            End spread · 07 / 07
          </span>
        </div>

        {/* Top-right meta stamp */}
        <div className="absolute top-5 right-5 md:top-7 md:right-7 z-10 text-right font-mono text-[10px] uppercase tracking-[0.25em] text-cream/85 leading-relaxed">
          <div>Hà Nội</div>
          <div>2026</div>
        </div>

        {/* Center-left title */}
        <div className="absolute left-5 md:left-10 lg:left-14 bottom-12 md:bottom-16 z-10">
          <SplitText
            as="h2"
            className="font-display text-editorial-xl font-light leading-[0.92] tracking-tightest text-cream"
            stagger={0.04}
          >
            Get in
          </SplitText>
          <SplitText
            as="h2"
            className="font-display text-editorial-xl font-light italic leading-[0.92] tracking-tightest text-cream -mt-2"
            stagger={0.04}
            delay={0.15}
          >
            touch.
          </SplitText>
        </div>

        {/* Bottom-left caption */}
        <span className="absolute bottom-5 left-5 md:bottom-7 md:left-10 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/85">
          Closing image · 2026
        </span>

        {/* Bottom-right caption */}
        <span className="absolute bottom-5 right-5 md:bottom-7 md:right-7 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/85 text-right max-w-[200px]">
          For commissions and conversations.
        </span>
      </div>

      {/* BODY — pull quote left + contact list right */}
      <div className="container-edge py-section-md md:py-section-lg relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left column — pull quote */}
          <div>
            <span className="font-mono text-meta text-cream/55 mb-4 block">
              / A final note
            </span>
            <p className="font-display italic text-2xl md:text-[28px] leading-[1.4] text-cream max-w-md">
              <span className="text-rust font-display not-italic text-5xl leading-[0] align-[-12px] mr-2">
                &ldquo;
              </span>
              I read every email. Brief or long &mdash; both welcome.
            </p>
            <p className="font-mono text-meta-xs text-cream/45 mt-3 pl-2">
              &mdash; Mai Linh, on incoming mail
            </p>
          </div>

          {/* Right column — contact list */}
          <ul className="flex flex-col">
            <ContactRow
              label="Email"
              value={site.email}
              sub="Preferred channel."
              href={`mailto:${site.email}`}
            />
            <ContactRow
              label="Phone"
              value={`+84 ${site.phone.slice(1)}`}
              sub="For urgent productions."
              href={`tel:+84${site.phone.slice(1)}`}
            />
            <ContactRow
              label="Instagram"
              value="@marlibol"
              sub="Photowalks & everyday."
              href={site.socials.instagram}
              external
            />
            <ContactRow
              label="LinkedIn"
              value="Mai Linh Ho"
              sub="Production CV & references."
              href={site.socials.linkedin}
              external
            />
          </ul>
        </div>

        {/* Handwritten endnote — bottom right, rotated */}
        <p
          className="hidden md:block absolute font-display italic text-sm text-cream/40 max-w-[260px] leading-snug text-right"
          style={{
            bottom: '40px',
            right: '40px',
            transform: 'rotate(1deg)',
          }}
        >
          &ldquo;If you&apos;re scrolling this far, you&apos;re already curious. Say hi.&rdquo;
        </p>
      </div>

      {/* FOOTER strip */}
      <div className="border-t border-cream/15 px-5 md:px-10 lg:px-14 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="font-mono text-meta-xs text-cream/45 leading-relaxed">
          <div>Designed &amp; built in Hanoi</div>
          <div>&copy; Mai Linh Ho &middot; 2026</div>
        </div>
        <span className="font-display italic text-xl md:text-2xl text-cream/85 inline-block" style={{ transform: 'rotate(-1.5deg)' }}>
          &mdash; marlibol
        </span>
      </div>
    </section>
  );
}

// ============================================================
// ContactRow — single row in the contact list
// ============================================================

type ContactRowProps = {
  label: string;
  value: string;
  sub: string;
  href: string;
  external?: boolean;
};

function ContactRow({ label, value, sub, href, external }: ContactRowProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group border-b border-cream/12 last:border-b-0"
    >
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        data-cursor="hover"
        className="grid grid-cols-[90px_1fr_20px] md:grid-cols-[110px_1fr_24px] gap-4 items-baseline py-4 md:py-5 transition-[padding] duration-500 ease-expo-out group-hover:pl-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/55">
          / {label}
        </span>
        <div className="min-w-0">
          <div className="font-display text-lg md:text-xl font-light text-cream leading-tight tracking-tightest truncate">
            {value}
          </div>
          <div className="font-display italic text-xs md:text-sm text-cream/50 mt-1">
            {sub}
          </div>
        </div>
        <span
          aria-hidden
          className="font-display text-lg text-cream/40 transition-all duration-500 ease-expo-out group-hover:text-rust group-hover:translate-x-1.5"
        >
          &rarr;
        </span>
      </a>
    </motion.li>
  );
}
