'use client';

import { motion } from 'framer-motion';
import { FeaturedProject } from './FeaturedProject';
import { PolaroidGrid } from './PolaroidGrid';
import { ProjectStrip } from './ProjectStrip';
import { Marquee } from '@/components/ui/Marquee';
import { SplitText } from '@/components/animations/SplitText';
import { projects } from '@/lib/content';

/**
 * Work — Selected projects section.
 *
 * R5 update — final composition.
 *
 *   1. Section header (Selected works.)
 *   2. Featured project full-bleed (Taekwondo — projects[0])
 *   3. Kinetic marquee divider
 *   4. Polaroid grid (3 cards — Vietinbank, Phan Mạnh Quỳnh, Tâm Thức Tinh Hoa)
 *   5. Strip view (Sống Trong Lòng Dân, Nhan Dan TV, + future entries)
 *
 * The old v1 card list is GONE — Taekwondo duplicate removed.
 *
 * If user adds more projects to lib/content.ts later, they automatically
 * land in the Strip view by index (anything past index 3 goes to Strip).
 * Index assignment:
 *   - projects[0] → Featured
 *   - projects[1..3] → Polaroid grid (Vietinbank, Phan Mạnh Quỳnh, Tâm Thức Tinh Hoa)
 *   - projects[4..]  → Strip view
 */
export function Work() {
  const featured = projects[0];
  // Polaroid grid — Vietinbank, Phan Mạnh Quỳnh, Tâm Thức Tinh Hoa.
  // Note: project[3] in content.ts is the bundled "event portfolio" entry
  // covering Sống Trong Lòng Dân + PJICO + Tâm Thức Tinh Hoa — we split
  // the Tâm Thức Tinh Hoa imagery out specifically for the polaroid here.
  const polaroidItems = [
    {
      cover: '/images/polaroid-vietinbank.jpg',
      label: 'VIETINBANK COUNTDOWN',
      sub:   'Hanoi Opera House · 2024',
      alt:   'Vietinbank Countdown 2025 stage with crowd lightsticks',
    },
    {
      cover: '/images/polaroid-phanmanhquynh.jpg',
      label: 'PHAN MẠNH QUỲNH',
      sub:   'Chuyến tàu mùa Đông · 2024',
      alt:   'Phan Mạnh Quỳnh first concert — Chuyến tàu mùa Đông stage',
    },
    {
      cover: '/images/polaroid-tamthuctinhhoa.jpg',
      label: 'TÂM THỨC TINH HOA',
      sub:   'Cultural festival · MSB · 2024',
      alt:   'Tâm Thức Tinh Hoa stage with title backdrop',
    },
  ] as const;

  // Strip — Sống Trong Lòng Dân, Nhan Dan TV. Extensible.
  const stripItems = [
    {
      cover: '/images/strip-songtronglongdan.jpg',
      title: 'Sống Trong Lòng Dân',
      venue: 'Cultural production · Ministry of Public Security',
      year:  '2024',
      alt:   'Sống Trong Lòng Dân stage with sunflower backdrop',
    },
    {
      cover: '/images/strip-nhandantv.jpg',
      title: 'Nhan Dan TV — Foreign Affairs',
      venue: 'Press internship · 2 Lê Thạch, Hà Nội',
      year:  '2023',
      alt:   'Nhan Dan Television channel logo',
    },
  ] as const;

  return (
    <section
      id="work"
      className="relative bg-cream text-ink py-section-lg md:py-section-xl grain-overlay overflow-hidden"
    >
      <div className="container-edge">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-end justify-between mb-10">
            <span className="font-mono text-meta text-ink/55">
              04 / Work
            </span>
            <span className="font-mono text-meta text-ink/55">
              {String(projects.length).padStart(2, '0')} entries
            </span>
          </div>

          <SplitText
            as="h2"
            className="font-display text-giant font-light tracking-tightest leading-[0.92] text-ink"
            stagger={0.04}
          >
            Selected
          </SplitText>
          <SplitText
            as="h2"
            className="font-display text-giant font-light italic tracking-tightest leading-[0.92] text-ink/65 -mt-2"
            stagger={0.04}
            delay={0.15}
          >
            works.
          </SplitText>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-xl text-ink/75 text-body-lg leading-relaxed"
          >
            A short-list from the last two years &mdash; live productions
            for institutions, brands, and artists, plus editorial work from
            the press bench.
          </motion.p>
        </div>
      </div>

      {/* Featured project — full-bleed split-screen */}
      <FeaturedProject
        cover="/images/featured-taekwondo-cover.jpg"
        kicker={featured.kicker}
        title={featured.title}
        venue={featured.venue}
        summary={featured.summary}
        roles={featured.roles}
        tagline="13 nations · 4 days · 1 stage"
        stampLabel={`${featured.index} / ${String(projects.length).padStart(2, '0')}`}
      />

      {/* Kinetic marquee divider between Featured and Polaroid */}
      <div className="my-10 md:my-14">
        <Marquee speed={50} direction="left" className="py-4">
          <span className="font-display text-[clamp(2.5rem,7vw,5rem)] font-light italic leading-none text-ink/35 whitespace-nowrap">
            Taekwondo Championships
            <span className="not-italic text-azure/55 mx-6">★</span>
            Vietinbank Countdown
            <span className="not-italic text-azure/55 mx-6">★</span>
            Phan Mạnh Quỳnh
            <span className="not-italic text-azure/55 mx-6">★</span>
            Tâm Thức Tinh Hoa
            <span className="not-italic text-azure/55 mx-6">★</span>
            Sống Trong Lòng Dân
            <span className="not-italic text-azure/55 mx-6">★</span>
            Nhan Dan TV
            <span className="not-italic text-azure/55 mx-6">★</span>
          </span>
        </Marquee>
      </div>

      {/* Polaroid grid */}
      <div className="container-edge">
        <div className="mb-6 flex items-end justify-between">
          <span className="font-mono text-meta text-ink/55">
            / Archive · Polaroid view
          </span>
          <span className="font-mono text-meta-xs text-ink/45 hidden md:block">
            Hover to straighten
          </span>
        </div>
        <PolaroidGrid items={polaroidItems} />
      </div>

      {/* Strip view */}
      <div className="container-edge mt-16 md:mt-20">
        <div className="mb-6 flex items-end justify-between">
          <span className="font-mono text-meta text-ink/55">
            / The rest · Strip view
          </span>
          <span className="font-mono text-meta-xs text-ink/45 hidden md:block">
            {String(stripItems.length).padStart(2, '0')} more
          </span>
        </div>
        <ProjectStrip items={stripItems} />
      </div>
    </section>
  );
}
