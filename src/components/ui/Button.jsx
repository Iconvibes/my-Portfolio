import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const STRENGTH = 0.35;

const baseClasses =
  'group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none';

const variantClasses = {
  primary:
    'border-signal bg-signal text-signal-ink hover:bg-transparent hover:text-signal',
  outline:
    'border-white/15 bg-white/[0.03] text-white hover:border-signal/60 hover:text-signal',
  ghost: 'border-transparent bg-transparent text-slate-300 hover:text-white',
  paper: 'border-ink bg-ink text-paper hover:bg-transparent hover:text-ink'
};

const iconClass =
  'transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5';

const Button = ({ children, href, external = false, variant = 'primary', className = '', icon = false, ...props }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();
  const iconEl = external ? (
    <ArrowUpRight aria-hidden="true" className={`h-4 w-4 ${iconClass}`} />
  ) : (
    <ArrowRight aria-hidden="true" className={`h-4 w-4 ${iconClass}`} />
  );
  const content = (
    <>
      {children}
      {icon ? iconEl : null}
    </>
  );

  const onMouseMove = (event) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (event.clientX - cx) * STRENGTH;
    const dy = (event.clientY - cy) * STRENGTH;
    ref.current.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  };

  const onMouseLeave = () => {
    if (reduced || !ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  if (href) {
    if (external) {
      return (
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="magnetic-btn inline-block"
        >
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
            {content}
          </a>
        </div>
      );
    }
    return (
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="magnetic-btn inline-block"
      >
        <Link to={href} className={classes} {...props}>
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="magnetic-btn inline-block"
    >
      <button className={classes} {...props}>
        {content}
      </button>
    </div>
  );
};

export { Button };
export default Button;
