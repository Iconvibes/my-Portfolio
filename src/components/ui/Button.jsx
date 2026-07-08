import { Link } from 'react-router-dom';

const baseClasses = 'inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

const variantClasses = {
  primary: 'border-sky-500 bg-sky-600 text-white hover:bg-sky-500',
  secondary: 'border-white/10 bg-white/5 text-slate-100 hover:border-sky-400/40 hover:text-sky-300',
  ghost: 'border-transparent bg-transparent text-slate-300 hover:text-white'
};

export const Button = ({ children, href, variant = 'primary', className = '', ...props }) => {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
