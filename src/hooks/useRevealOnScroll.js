import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export const useRevealOnScroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return { ref, isVisible };
};
