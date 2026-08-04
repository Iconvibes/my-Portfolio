import { createElement } from 'react';

const Card = ({ children, className = '', hover = true, as = 'div', tone = 'ink' }) =>
  createElement(
    as,
    {
      className: `rounded-2xl border ${
        tone === 'ink' ? 'border-line bg-ink-2' : 'border-signal/20 bg-paper text-ink'
      } p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] ${
        hover ? 'transition duration-300 hover:-translate-y-1 hover:border-signal/40' : ''
      } ${className}`.trim()
    },
    children
  );

export default Card;
