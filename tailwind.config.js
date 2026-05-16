/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial palette — kept identical to v1.
        ink: {
          DEFAULT: '#0A0F1F',
          deep:    '#06091A',
          950:     '#0A0F1F',
          900:     '#101632',
          800:     '#1B2245',
          700:     '#2A3361',
        },
        azure: {
          DEFAULT: '#3E7CCB',
          400:     '#5B95DC',
          500:     '#3E7CCB',
          600:     '#2C66B0',
          700:     '#1F4F92',
        },
        cream: {
          DEFAULT: '#F4EFE6',
          50:      '#FBF8F2',
          100:     '#F4EFE6',
          200:     '#E9E2D2',
        },
        bone: '#EAE3D2',
        rust: '#B8542B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // ─────────────────────────────────────────────────
        // V1 — existing display scale (kept, untouched)
        // ─────────────────────────────────────────────────
        'mega':   ['clamp(4rem, 14vw, 14rem)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'giant':  ['clamp(3rem, 10vw, 9rem)',  { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'huge':   ['clamp(2.5rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'large':  ['clamp(2rem, 5vw, 4rem)',   { lineHeight: '1.0',  letterSpacing: '-0.025em' }],

        // ─────────────────────────────────────────────────
        // R-batch additions — refined editorial hierarchy.
        // Use these in redesigned components only.
        //
        // The naming:
        //   `editorial-*` = display headings (Fraunces serif)
        //   `body-*`      = readable body copy (Inter Tight)
        //   `meta-*`      = labels, kickers, mono stamps
        // ─────────────────────────────────────────────────

        // EDITORIAL DISPLAY — for role/project/section headings
        // editorial-xs   ~ in-card section labels
        // editorial-sm   ~ project titles in Polaroid/Strip
        // editorial-md   ~ Featured project title, Lineage role title (~32px)
        // editorial-lg   ~ Featured cover title, Production Diary masthead (~48-56px)
        // editorial-xl   ~ Closing spread "Get in touch" (~76px)
        'editorial-xs': ['1.25rem',  { lineHeight: '1.15', letterSpacing: '-0.012em' }], // 20px
        'editorial-sm': ['1.625rem', { lineHeight: '1.10', letterSpacing: '-0.015em' }], // 26px
        'editorial-md': ['clamp(1.75rem, 3.4vw, 2.25rem)', { lineHeight: '1.05', letterSpacing: '-0.018em' }], // 28→36px
        'editorial-lg': ['clamp(2.5rem, 5vw, 3.5rem)',     { lineHeight: '0.98', letterSpacing: '-0.025em' }], // 40→56px
        'editorial-xl': ['clamp(3.5rem, 7vw, 4.75rem)',    { lineHeight: '0.92', letterSpacing: '-0.03em'  }], // 56→76px

        // BODY — readable copy.
        // body-sm  ~ small notes, captions inside cards
        // body     ~ standard body (15px) replaces too-small 14px default
        // body-lg  ~ pull quotes, primary paragraphs (17px)
        // body-xl  ~ hero pull quotes, opening paragraph (20-22px)
        'body-sm': ['0.875rem', { lineHeight: '1.55' }], // 14px
        'body':    ['0.9375rem',{ lineHeight: '1.65' }], // 15px
        'body-lg': ['1.0625rem',{ lineHeight: '1.7'  }], // 17px
        'body-xl': ['1.375rem', { lineHeight: '1.45' }], // 22px italic quotes

        // META — uniform mono stamps and labels
        // meta-xs  ~ tiny tag pills (8-9px)
        // meta     ~ standard kicker labels (10-11px tracking 0.25em)
        // meta-lg  ~ hero status labels (12-13px)
        'meta-xs': ['0.5625rem', { lineHeight: '1.5', letterSpacing: '0.22em' }], // 9px
        'meta':    ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.3em'  }], // 11px
        'meta-lg': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.2em'  }], // 13px

        // STAT — for big numbers in stats strips (Featured Project page)
        'stat': ['clamp(3rem, 6vw, 4.5rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }], // 48→72px
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'tighter':  '-0.035em',
        'subtle':   '-0.012em',
      },
      // R-batch addition — semantic spacing helpers.
      // Use these on <section> instead of mixed py-24/py-40.
      // Keeps density consistent and easier to tune later.
      spacing: {
        'section-sm': '3rem',    // 48px  ~ tight cinematic sections
        'section-md': '4.5rem',  // 72px  ~ default editorial
        'section-lg': '6rem',    // 96px  ~ feature sections
        'section-xl': '8rem',    // 128px ~ legacy max
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':  'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-io':  'cubic-bezier(0.87, 0, 0.13, 1)',
        'silk':     'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      animation: {
        'marquee':    'marquee 40s linear infinite',
        'grain':      'grain 8s steps(10) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // R-batch — slow recording-red blink for footage REC badge
        'rec-blink':  'rec-blink 1.5s ease-in-out infinite',
        // R-batch — gentle Available/Current dot pulse
        'live-dot':   'live-dot 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        'rec-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.2' },
        },
        'live-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
      // R-batch — drop shadow for floating polaroids
      boxShadow: {
        'polaroid':       '0 12px 28px -10px rgba(0, 0, 0, 0.22)',
        'polaroid-hover': '0 18px 38px -10px rgba(0, 0, 0, 0.28)',
        'editorial':      '0 12px 32px -12px rgba(10, 15, 31, 0.18)',
      },
      // R-batch — rotation utilities for polaroid scrapbook
      rotate: {
        '0.5':  '0.5deg',
        '1.5':  '1.5deg',
        '2.5':  '2.5deg',
        '-0.5': '-0.5deg',
        '-1.5': '-1.5deg',
        '-2.5': '-2.5deg',
      },
    },
  },
  plugins: [],
};
