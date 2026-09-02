import { createElement } from 'react';

/**
 * TextReveal has been removed per design requirements.
 * This component renders plain text without any animation.
 */
const TextReveal = ({ text, className = '', as = 'span', ...props }) => {
  return createElement(
    as,
    {
      className: className.trim(),
      ...props,
    },
    text
  );
};

export default TextReveal;
