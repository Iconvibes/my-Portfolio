import { createElement } from 'react';
import { useInView } from '../../hooks/useInView';

const Reveal = ({ children, delay = 0, className = '', as = 'div', ...props }) => {
  const [ref, inView] = useInView();

  return createElement(
    as,
    {
      ref,
      style: { transitionDelay: delay ? `${delay}ms` : undefined },
      className: `reveal ${inView ? 'reveal-in' : ''} ${className}`.trim(),
      ...props
    },
    children
  );
};

export default Reveal;
