import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
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
  const isDarkMode = resolvedTheme === 'dark';
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
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            className="hidden md:inline-flex items-center justify-center border border-myWhite/20 px-3 py-2 rounded-full text-myWhite/80"
          >
            {isDarkMode ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12h2.5M19 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 14.5a8.5 8.5 0 1 1-11.5-11.5 7 7 0 0 0 11.5 11.5Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen(prev => !prev)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-nav"
            className="md:hidden border border-myWhite/20 px-3 py-2 rounded-full text-myWhite/80"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 w-full h-full bg-myBlack/40 backdrop-blur-sm"
          />
          <div
            id="mobile-nav"
            className="absolute left-4 right-4 top-20 rounded-2xl border border-myWhite/10 bg-primary/80 backdrop-blur px-4 py-3 flex flex-col gap-3 z-10"
          >
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
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              className="inline-flex items-center justify-center border border-myWhite/20 px-3 py-2 rounded-full text-myWhite/80"
            >
              {isDarkMode ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12h2.5M19 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 14.5a8.5 8.5 0 1 1-11.5-11.5 7 7 0 0 0 11.5 11.5Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
