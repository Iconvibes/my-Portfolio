import { createElement } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Character-by-character reveal animation.
 *
 * Each character is wrapped in an inline-block span and animated with a
 * staggered delay. The parent should carry the display typography classes
 * (e.g. `display-ink`) — this component only handles the reveal motion.
 *
 * Spaces between words are rendered as visible gaps, not `\u00A0`,
 * so the text stays readable and selectable.
 */
const TextReveal = ({ text, className = '', as = 'span', ...props }) => {
  const reduced = useReducedMotion();
  const STAGGER_MS = 35;

  const words = text.split(' ');

  let charIndex = 0;

  return createElement(
    as,
    {
      className: `text-reveal ${reduced ? 'text-reveal-reduced' : ''} ${className}`.trim(),
      'aria-label': text,
      ...props,
    },
    words.map((word, wordIdx) => {
      const wordEl = createElement(
        'span',
        { key: `w-${wordIdx}`, className: 'text-reveal-word' },
        word.split('').map((char) => {
          const idx = charIndex++;
          return createElement(
            'span',
            {
              key: `c-${idx}`,
              className: 'text-reveal-char',
              style: reduced ? undefined : { animationDelay: `${idx * STAGGER_MS}ms` },
            },
            createElement('span', null, char)
          );
        })
      );

      // Add a visible space between words
      if (wordIdx < words.length - 1) {
        charIndex++; // count the space as a stagger step
        return [
          wordEl,
          createElement('span', { key: `sp-${wordIdx}`, 'aria-hidden': true }, '\u00A0'),
        ];
      }

      return wordEl;
    })
  );
};

export default TextReveal;
