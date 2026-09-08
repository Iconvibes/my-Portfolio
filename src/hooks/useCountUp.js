import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Animates a number from 0 to `target` over `duration` ms on mount.
 * Returns the current interpolated value (rounded to `decimals` places).
 * Skips animation entirely when prefers-reduced-motion is active.
 *
 * Usage:
 *   const count = useCountUp(48, { duration: 600, decimals: 0 });
 *   // count: 0 → 48 over 600ms (or immediately if reduced motion)
 */
const useCountUp = (target, { duration = 600, decimals = 0 } = {}) => {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad for a natural deceleration
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = eased * target;

      setValue(Number(current.toFixed(decimals)));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, decimals, reduced]);

  return value;
};

export default useCountUp;
