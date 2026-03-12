import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Case Studies', href: '/work' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/contact' }
];

const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = stored || (prefersLight ? 'light' : 'dark');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const resolvedTheme = theme || 'dark';
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const isActive = href => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      return location.pathname === path && location.hash === `#${hash}`;
    }
    return location.pathname === href;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xs uppercase tracking-[0.4em] font-semibold text-myWhite"
        >
          Codeferd Digital
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={`transition ${
                isActive(item.href) ? 'text-secondary' : 'text-myWhite/70 hover:text-myWhite'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="text-xs uppercase tracking-[0.3em] text-myWhite/80 border border-myWhite/20 px-3 py-2 rounded-full"
          >
            {resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
          <button
            type="button"
            onClick={() => setOpen(prev => !prev)}
            className="md:hidden text-xs uppercase tracking-[0.3em] text-myWhite/80 border border-myWhite/20 px-3 py-2 rounded-full"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden mt-4 rounded-2xl border border-myWhite/10 bg-primary/80 backdrop-blur px-4 py-3 flex flex-col gap-3">
          {navItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={`text-sm ${
                isActive(item.href) ? 'text-secondary' : 'text-myWhite/70'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="text-xs uppercase tracking-[0.3em] text-myWhite/80 border border-myWhite/20 px-3 py-2 rounded-full text-left"
          >
            Switch to {resolvedTheme === 'dark' ? 'light' : 'dark'} mode
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
