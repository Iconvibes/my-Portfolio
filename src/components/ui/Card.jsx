import { createElement } from 'react';

const Card = ({ children, className = '', hover = true, as = 'div' }) =>
  createElement(
    as,
    {
      className: `rounded-xl border border-white/10 bg-slate-900 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.24)] ${hover ? 'transition duration-300 hover:-translate-y-1 hover:border-sky-400/40' : ''} ${className}`.trim()
    },
    children
  );

export default Card;
