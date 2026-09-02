import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/20/solid';

const baseClasses =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition duration-150 focus-visible:outline-none sm:w-auto';

const variantClasses = {
  primary:
    'border-signal bg-signal text-signal-ink hover:bg-signal/90 hover:scale-[1.02] active:scale-[0.98]',
  outline:
    'border-white/15 bg-white/[0.03] text-white hover:border-signal/60 hover:text-signal hover:scale-[1.02] active:scale-[0.98]',
  ghost: 'border-transparent bg-transparent text-slate-300 hover:text-white',
  paper: 'border-ink bg-ink text-paper hover:bg-ink/80 hover:scale-[1.02] active:scale-[0.98]'
};

const iconClass =
  'transition-transform duration-150 group-hover:translate-x-0.5';

const Button = ({ children, href, external = false, variant = 'primary', className = '', icon = false, ...props }) => {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();
  const iconEl = external ? (
    <ArrowUpRightIcon aria-hidden="true" className={`h-4 w-4 ${iconClass}`} />
  ) : (
    <ArrowRightIcon aria-hidden="true" className={`h-4 w-4 ${iconClass}`} />
  );
  const content = (
    <>
      {children}
      {icon ? iconEl : null}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${classes} group`} {...props}>
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={`${classes} group`} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`${classes} group`} {...props}>
      {content}
    </button>
  );
};

export { Button };
export default Button;
