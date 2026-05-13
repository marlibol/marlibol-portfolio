import clsx, { ClassValue } from 'clsx';

/**
 * Tiny `cn` helper. We don't need tailwind-merge here — the project doesn't
 * have many conflicting class chains, and clsx alone keeps the bundle leaner.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
