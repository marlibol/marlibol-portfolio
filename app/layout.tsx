import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { AppShell } from '@/components/AppShell';
import { Nav } from '@/components/ui/Nav';
import { site } from '@/lib/content';
import './globals.css';

/**
 * Fonts.
 *
 * - Fraunces: a variable display serif by Phaedra Charles. Beautiful italics,
 *   character that reads "editorial" without being too austere. We pull
 *   a curated weight range (300–700) + italic for the body+display use.
 * - Inter Tight: a refined variant of Inter with tighter tracking that doesn't
 *   look like "generic SaaS Inter". Used for body and UI.
 * - JetBrains Mono: timestamps, indexes, kicker labels. Distinctive
 *   without the geometric coldness of IBM Plex Mono.
 *
 * We expose each through a CSS variable so the Tailwind config can reference
 * them via `var(--font-...)` and not need to know the specific font name.
 */
const fraunces = Fraunces({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const interTight = Inter_Tight({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  // Open Graph for social shares
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    type: 'website',
    locale: 'en_US',
  },
  // Apple icon + viewport handled below
  authors: [{ name: site.name }],
};

export const viewport: Viewport = {
  themeColor: '#0A0F1F', // matches the ink background — clean status bar on mobile
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body>
        <AppShell>
          <Nav />
          {children}
        </AppShell>
      </body>
    </html>
  );
}
