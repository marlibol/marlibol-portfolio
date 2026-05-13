'use client';

import Image, { ImageProps } from 'next/image';
import { useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '@/hooks/useFinePointer';
import { cn } from '@/lib/cn';

type DistortImageProps = Omit<ImageProps, 'src' | 'alt' | 'fill' | 'onMouseMove' | 'onMouseLeave'> & {
  src: string;
  alt: string;
  /** how much the image shifts under the cursor, in px (default 14) */
  shift?: number;
  /** Tailwind classes for the wrapper */
  className?: string;
  /** intrinsic width — used for blur-up + responsive `sizes` defaulting */
  width?: number;
  /** intrinsic height — paired with width to set aspect ratio */
  height?: number;
};

/**
 * DistortImage — image with cursor-parallax + soft scale on hover.
 *
 * "Distortion" here is a tasteful interpretation: we shift the image
 * slightly under the cursor (creating a parallax illusion of the image
 * leaning into your pointer) and scale up gently. We do NOT use a WebGL
 * displacement shader here — that's overkill for the visual budget,
 * adds 100KB+ to the bundle, and the brief asked for "tasteful".
 *
 * The wrapper uses `overflow-hidden` so the scaled image doesn't spill
 * over its container — gives the "matte cropped" feel of editorial photography.
 *
 * We use next/image's `fill` mode here. The image absolutely-positions
 * inside the wrapper, so we need it to size from the parent's box,
 * not its own intrinsic dimensions. The aspect ratio is controlled
 * by Tailwind classes on the WRAPPER (e.g. aspect-[16/10]).
 */
export function DistortImage({
  src,
  alt,
  shift = 14,
  className,
  width,   // unused at runtime — kept so callers can document intrinsic size
  height,  // ditto
  sizes,
  ...rest
}: DistortImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  // Local cursor position normalized to [-1, 1] from the image center.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring smooth so motion is fluid.
  const smx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });

  // Convert to translation in px.
  const tx = useTransform(smx, (v) => v * shift);
  const ty = useTransform(smy, (v) => v * shift);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width  - 0.5; // -0.5 to 0.5
    const py = (e.clientY - r.top)  / r.height - 0.5;
    mx.set(px * 2); // -1 to 1
    my.set(py * 2);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Suppress unused-var lint for documentation-only props.
  void width; void height;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('img-distort relative overflow-hidden', className)}
      data-cursor="view"
    >
      <motion.div
        className="absolute inset-0 gpu"
        style={{ x: tx, y: ty }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? '(max-width: 768px) 100vw, 60vw'}
          className="object-cover"
          {...rest}
        />
      </motion.div>
    </div>
  );
}
