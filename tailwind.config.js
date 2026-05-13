/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial palette — derived from the Canva file but pushed darker/more cinematic.
        // Two-tone navy + cornflower from the deck become "midnight" + "azure"
        // Warm cream replaces stark white for an editorial feel.
        ink: {
          DEFAULT: '#0A0F1F',  // near-black with a blue undertone
          deep:    '#06091A',  // background black for dark sections
          950:     '#0A0F1F',
          900:     '#101632',
          800:     '#1B2245',
          700:     '#2A3361',
        },
        azure: {
          DEFAULT: '#3E7CCB', // the bold cornflower from the cover
          400:     '#5B95DC',
          500:     '#3E7CCB',
          600:     '#2C66B0',
          700:     '#1F4F92',
        },
        cream: {
          DEFAULT: '#F4EFE6', // warm off-white
          50:      '#FBF8F2',
          100:     '#F4EFE6',
          200:     '#E9E2D2',
        },
        bone: '#EAE3D2', // accent neutral
        rust: '#B8542B', // warm accent — for hover/highlight (very lightly used)
      },
      fontFamily: {
        // Display: PP Editorial-style serif (we use Fraunces — close, free on Google).
        // Body: a refined sans (Inter Tight gives editorial feel without looking generic).
        // Mono: JetBrains Mono for kinetic timestamp/index labels.
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial typography scale — wider range than default Tailwind
        // for the cinematic oversized hero type.
        'mega':   ['clamp(4rem, 14vw, 14rem)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'giant':  ['clamp(3rem, 10vw, 9rem)',  { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'huge':   ['clamp(2.5rem, 7vw, 6rem)',  { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'large':  ['clamp(2rem, 5vw, 4rem)',    { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'tighter': '-0.035em',
        'subtle': '-0.012em',
      },
      transitionTimingFunction: {
        // Custom easings — the "expo" curves are what gives premium portfolios
        // their cinematic feel. Default Tailwind cubic-bezier feels jumpy by comparison.
        'expo-out':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':   'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-io':   'cubic-bezier(0.87, 0, 0.13, 1)',
        'silk':      'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'grain':   'grain 8s steps(10) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':  { transform: 'translate(-5%, -10%)' },
          '20%':  { transform: 'translate(-15%, 5%)' },
          '30%':  { transform: 'translate(7%, -25%)' },
          '40%':  { transform: 'translate(-5%, 25%)' },
          '50%':  { transform: 'translate(-15%, 10%)' },
          '60%':  { transform: 'translate(15%, 0%)' },
          '70%':  { transform: 'translate(0%, 15%)' },
          '80%':  { transform: 'translate(3%, 35%)' },
          '90%':  { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
};
