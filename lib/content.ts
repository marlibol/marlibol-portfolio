/**
 * Site content — single source of truth.
 *
 * Edit values here and the whole site updates.
 */

// ============================================================
// Site-wide info
// ============================================================
export const site = {
  name:    'Mai Linh Ho',
  handle:  '@marlibol',
  role:    'Social & Event Production',
  city:    'Hanoi, Vietnam',
  email:   'linhrin02@gmail.com',
  phone:   '0374827688',
  socials: {
    instagram: 'https://www.instagram.com/marlibol/',
    linkedin:  'https://www.linkedin.com/in/mai-linh-ho-596558207/',
  },
  tagline: 'Producing stories on stage and on screen.',
  // Philosophy stays nested in `site` so components reading
  // `site.philosophy.body` keep working.
  philosophy: {
    title: 'A note on the work.',
    body:  "I work where journalism meets stagecraft — coordinating artists, building moments, telling stories that hold a room of people for a few hours. The events I produce aren't products. They're memory, lit and rehearsed. My job is to make sure nothing breaks the spell.",
  },
};

// ============================================================
// About paragraphs
// ============================================================
export const about = [
  "I'm a Communications & Event Producer based in Hanoi. My work sits at the intersection of journalism, stagecraft and content — which is a long way of saying I build moments that hold a room.",
  "Recent rooms include international taekwondo championships, bank-headlined countdowns at the Opera House, an artist's first stadium tour, and a press desk at the Ministry of Foreign Affairs. Different rooms, same job: keep the story clean and the energy alive.",
  'I write and produce in Vietnamese and English (C1), with experience translating, transcribing, and editing across both.',
];

// ============================================================
// Projects
// ============================================================
export const projects = [
  {
    slug:    'asian-police-taekwondo',
    index:   '01',
    year:    '2024',
    kicker:  'International Sport Event',
    title:   'Vietnam Asian Open Police Taekwondo Championships',
    venue:   'Quảng Ninh Provincial Arena',
    summary: 'Coordinating the live stage and 13 national delegations through opening ceremony, competition rounds, and broadcast moments.',
    roles:   ['Stage Coordination', 'Team Liaison (13 nations)', 'Run-of-Show'],
    cover:   '/images/project-taekwondo.jpg',
    accent:  '#3E7CCB',
  },
  {
    slug:    'vietinbank-countdown-2025',
    index:   '02',
    year:    '2024 / 2025',
    kicker:  'Brand Live Show',
    title:   'Vietinbank Countdown 2025 — Trust the Moment',
    venue:   'Hanoi Opera House',
    summary: "Stage coordination and artist care for the headlining countdown broadcast on New Year's Eve. Cinematic main stage, simultaneous outdoor zone.",
    roles:   ['Stage Coordination', 'Artist Liaison', 'Backstage Run'],
    cover:   '/images/project-vietinbank.jpg',
    accent:  '#B8542B',
  },
  {
    slug:    'phan-manh-quynh-concert',
    index:   '03',
    year:    '2024 / 2025',
    kicker:  'First Live Concert',
    title:   'Phan Mạnh Quỳnh — Chuyến tàu mùa Đông / mùa Xuân',
    venue:   'Nguyễn Du Stadium · Quần Ngựa Stadium',
    summary: "Show-assistant for the artist's first headlining live concert series. Wrangled run-of-show details from soundcheck to encore across two stadium runs.",
    roles:   ['Show Assistant', 'Artist Care', 'Stage Coordination'],
    cover:   '/images/project-phanmanhquynh.jpg',
    accent:  '#3E7CCB',
  },
  {
    slug:    'event-portfolio-2024-2025',
    index:   '04',
    year:    '2024 — 2025',
    kicker:  'Selected Productions',
    title:   'Sống Trong Lòng Dân · PJICO Fest · Tâm Thức Tinh Hoa',
    venue:   'Multiple venues · Hanoi & national',
    summary: 'A run of stage coordination work across institutional, corporate, and cultural productions — from Ministry events to bank-headlined festivals.',
    roles:   ['Stage Coordination', 'Production Liaison'],
    cover:   '/images/project-events-collage.jpg',
    accent:  '#B8542B',
  },
  {
    slug:    'nhan-dan-tv-journalism',
    index:   '05',
    year:    '2023',
    kicker:  'Editorial Internship',
    title:   'Nhan Dan Television — Foreign Affairs Bureau',
    venue:   '2 Le Thach, Hanoi',
    summary: 'Editorial internship covering Ministry of Foreign Affairs press briefings and producing bilingual broadcast packages.',
    roles:   ['Editor (Internship)', 'EN—VI Translation', 'Press Coverage'],
    cover:   '/images/project-journalism.jpg',
    accent:  '#3E7CCB',
  },
] as const;

export type Project = typeof projects[number];

// ============================================================
// Experience
// ============================================================
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

// ============================================================
// Skills
// ============================================================
export const skills = [
  {
    group: 'Live Production',
    items: ['On-site Execution', 'Artist & Talent Coordination', 'Run-of-Show', 'Stakeholder Liaison'],
  },
  {
    group: 'Content & Editorial',
    items: ['Content Direction', 'Copywriting (EN / VI)', 'Editing & Storytelling', 'Press Coverage'],
  },
  {
    group: 'Craft & Tools',
    items: ['Photoshop', 'Premiere Pro', 'CapCut', 'Canva', 'Microsoft / Google Workspace'],
  },
  {
    group: 'Languages',
    items: ['English — C1 (Advanced)', 'Vietnamese — Native', 'EN ↔ VI Translation & Transcription'],
  },
] as const;

// ============================================================
// Education
// ============================================================
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
