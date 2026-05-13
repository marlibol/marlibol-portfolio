'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useLenis — sets up the global smooth scroll engine.
 *
 * Why we wire Lenis into GSAP's ticker rather than running our own RAF loop:
 *  - GSAP's ScrollTrigger needs to know about Lenis's virtual scroll position,
 *    otherwise scroll-triggered animations fire against the wrong scrollTop.
 *  - Running a single ticker (GSAP's) instead of two is also slightly cheaper.
 *
 * The hook is a no-op on touch devices and when the user has prefers-reduced-motion.
 * Lenis itself respects reduced-motion, but disabling outright on touch keeps
 * native momentum scroll on phones (which feels better than emulated smoothness).
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,                                     // slower = more cinematic
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out curve
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Keep ScrollTrigger in sync with Lenis's virtual scroll.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis off GSAP's ticker — single rAF loop for the whole site.
    const tick = (time: number) => {
      lenis.raf(time * 1000); // GSAP gives time in seconds, Lenis wants ms
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0); // we handle pacing ourselves

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
