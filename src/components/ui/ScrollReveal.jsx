import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Lightweight scroll reveal using Intersection Observer.
 * Elements fade in + slide up 24px over 250ms with ease-out.
 * Respects prefers-reduced-motion.
 *
 * Usage:
 *   <ScrollReveal><div>content</div></ScrollReveal>
 *   <ScrollReveal delay={100}><div>delayed content</div></ScrollReveal>
 */
const ScrollReveal = ({ children, className = '', delay = 0, once = true }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reduced) {
      setIsVisible(true);
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, once]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.25s ease-out ${delay}ms, transform 0.25s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
