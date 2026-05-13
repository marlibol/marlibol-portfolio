'use client';

import { useEffect, useState } from 'react';

/**
 * Returns `true` only on devices with a fine pointer (mouse / trackpad).
 * On touch devices we want to skip:
 *  - the custom cursor (it would just sit at 0,0)
 *  - magnetic-button hover transforms (no hover on touch)
 *  - image distortion on hover (same reason)
 *
 * We listen for changes too — laptops with touchscreens can flip between
 * primary input modes mid-session.
 */
export function useFinePointer(): boolean {
  // Default to false on the server so the first client paint matches SSR
  // and avoids a hydration flash. The real value gets set in the effect.
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: fine)');
    setFine(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    // addEventListener is the modern API; fall back for Safari < 14.
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return fine;
}
