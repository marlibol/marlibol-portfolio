/**
 * Site content.
 *
 * Editing your portfolio: change values here and the whole site updates.
 * No component imports raw strings — everything flows through this file.
 */

export const site = {
  name:    'Mai Linh Ho',
  handle:  '@marlibol',
  role:    'Communications & Event Producer',
  city:    'Hà Nội, Vietnam',
  email:   'hello@marlibol.com',
  phone:   '+84 000 000 000',
  socials: {
    instagram: 'https://instagram.com/marlibol',
    linkedin:  'https://linkedin.com/in/marlibol',
    behance:   'https://behance.net/marlibol',
  },
  // Used in the hero — the single sentence that frames everything else.
  tagline: 'Producing stories on stage and on screen.',
  // The "creative philosophy" longform — kept in the content file
  // so it's easy to rewrite without touching JSX.
  philosophy: {
    title: 'A note on the work.',
    body:  `I work where journalism meets stagecraft — coordinating artists, building moments, telling stories that hold a room of people for a few hours. The events I produce aren't products. They're memory, lit and rehearsed. My job is to make sure nothing breaks the spell.`,
  },
};

/**
 * Featured projects.
 * `kicker` is the small label, `title` is the display headline.
 * `roles` is shown as a list under the project on the case page.
 * `cover` references files under /public/images.
 */
export const projects = [
  {
    slug: 'asian-police-taekwondo',
    index: '01',
    year:  '2024',
    kicker: 'International Sport Event',
    title: 'Vietnam Asian Open Police Taekwondo Championships',
    venue: 'Quảng Ninh Provincial Arena',
    summary:
      'Coordinating the live stage and 13 national delegations through opening ceremony, competition rounds, and broadcast moments.',
    roles: ['Stage Coordination', 'Team Liaison (13 nations)', 'Run-of-Show'],
    cover:  '/images/project-taekwondo.jpg',
    accent: '#B8542B',
  },
  {
    slug: 'vietinbank-countdown-2025',
    index: '02',
    year:  '2024 / 2025',
    kicker: 'Brand Live Show',
    title: 'Vietinbank Countdown 2025 — Trust the Moment',
    venue: 'Hanoi Opera House',
    summary:
      'Stage coordination and artist care for the headlining countdown broadcast on New Year\u2019s Eve. Cinematic main stage, simultaneous outdoor zone.',
    roles: ['Stage Coordination', 'Artist Liaison', 'Backstage Run'],
    cover:  '/images/project-vietinbank.jpg',
    accent: '#3E7CCB',
  },
  {
    slug: 'phan-manh-quynh-concert',
    index: '03',
    year:  '2024 / 2025',
    kicker: 'First Live Concert',
    title: 'Phan Mạnh Quỳnh — Chuyến tàu mùa Đông / mùa Xuân',
    venue: 'Nguyễn Du Stadium · Quần Ngựa Stadium',
    summary:
      'Show-assistant for the artist\u2019s first headlining live concert series. Wrangled run-of-show details from soundcheck to encore across two stadium runs.',
    roles: ['Show Assistant', 'Artist Care', 'Stage Coordination'],
    cover:  '/images/project-phanmanhquynh.jpg',
    accent: '#D4A656',
  },
  {
    slug: 'event-portfolio-2024-2025',
    index: '04',
    year:  '2024 — 2025',
    kicker: 'Selected Productions',
    title: 'Sống Trong Lòng Dân · PJICO Fest · Tâm Thức Tinh Hoa',
    venue: 'Multiple venues · Hanoi & national',
    summary:
      'A run of stage coordination work across institutional, corporate, and cultural productions — from Ministry events to bank-headlined festivals.',
    roles: ['Stage Coordination', 'Production Liaison'],
    cover:  '/images/project-events-collage.jpg',
    accent: '#3E7CCB',
  },
  {
    slug: 'nhan-dan-tv-journalism',
    index: '05',
    year:  '2023',
    kicker: 'Editorial Internship',
    title: 'Nhan Dan Television — Foreign Affairs Bureau',
    venue: '2 Le Thach, Hanoi',
    summary:
      'Editorial internship covering Ministry of Foreign Affairs press briefings and producing bilingual broadcast packages.',
    roles: ['Editor (Internship)', 'EN—VI Translation', 'Press Coverage'],
    cover:  '/images/project-journalism.jpg',
    accent: '#0A0F1F',
  },
] as const;

export type Project = typeof projects[number];

/**
 * Experience timeline — most-recent first.
 */
export const experience = [
  {
    period: '2025 — Now',
    role:   'Freelance Producer',
    org:    'Independent · Hanoi',
    note:   'Selected event + content commissions.',
  },
  {
    period: '11/2025 — 2/2026',
    role:   'Social Media Researcher',
    org:    'STATT Consulting',
    note:   'Quantitative & qualitative social research.',
  },
  {
    period: 'Oct 2024 — Apr 2025',
    role:   'Event Executive (Probation)',
    org:    'ZEIT — art comes first',
    note:   'Stage coordination for major live productions.',
  },
  {
    period: 'Jul 2025',
    role:   'Conference Transcriber',
    org:    'Techcombank Investment Summit',
    note:   'EN—VI live transcription, panel sessions.',
  },
  {
    period: 'Sep 2023 — Oct 2024',
    role:   'Social Media Manager / Content Creator',
    org:    'MVP Academy',
    note:   'Cross-platform content strategy and execution.',
  },
  {
    period: 'Mar 2023 — Jun 2023',
    role:   'Editor (Internship)',
    org:    'Nhan Dan Television',
    note:   'Foreign Affairs press coverage.',
  },
] as const;

/**
 * Skills — grouped to read editorially rather than as a wall of badges.
 */
export const skills = [
  {
    group: 'Live Production',
    items: [
      'On-site Execution',
      'Artist & Talent Coordination',
      'Run-of-Show',
      'Stakeholder Liaison',
    ],
  },
  {
    group: 'Content & Editorial',
    items: [
      'Content Direction',
      'Copywriting (EN / VI)',
      'Editing & Storytelling',
      'Press Coverage',
    ],
  },
  {
    group: 'Craft & Tools',
    items: [
      'Photoshop',
      'Premiere Pro',
      'CapCut',
      'Canva',
      'Microsoft / Google Workspace',
    ],
  },
  {
    group: 'Languages',
    items: [
      'English — C1 (Advanced)',
      'Vietnamese — Native',
      'EN ↔ VI Translation & Transcription',
    ],
  },
] as const;

/**
 * Education timeline.
 */
export const education = [
  {
    school: 'Academy of Journalism & Communication',
    degree: "Bachelor's, International Relations — Global Communication",
    period: '2020 — 2024',
    note:   'Graduated with Very Good classification.',
  },
  {
    school: 'Marie Curie Hanoi School',
    degree: 'Secondary Education',
    period: '2017 — 2020',
    note:   'Graduated with Very Good classification.',
  },
] as const;
