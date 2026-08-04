import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};

export { Button };
export default Button;
