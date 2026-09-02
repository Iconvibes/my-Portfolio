import { createElement } from 'react';

/**
 * Reveal has been removed per design requirements (no fade-in on scroll animations).
 * This is a passthrough wrapper for backward compatibility.
 */
const Reveal = ({ children, delay, className = '', as = 'div', ...props }) => {
  return createElement(
    as,
    {
      className: className.trim(),
      ...props
    },
    children
  );
};

export default Reveal;
