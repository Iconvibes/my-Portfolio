import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigation } from '../../content';
import { Button } from '../ui/Button';
import ResumeButton from '../ui/ResumeButton';

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none ${
    isActive ? 'bg-signal/10 text-signal' : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || isOpen
          ? 'border-line bg-ink/90 backdrop-blur-xl'
          : 'border-transparent bg-ink/60 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3 focus-visible:outline-none"
          aria-label="Ferdinard Ashonibare — home"
        >
          <span className="display-ink flex h-9 w-9 items-center justify-center rounded-lg bg-signal text-sm text-signal-ink transition-transform duration-300 group-hover:-rotate-6">
            FA
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="display-ink text-sm text-white">Ferdinard Ashonibare</span>
            <span className="mono-label text-[0.65rem] text-slate-500">full-stack developer</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={navClass({ isActive: location.pathname === item.href })}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ResumeButton className="hidden lg:inline-flex">Résumé</ResumeButton>
          <Button href="/contact" className="hidden !px-5 md:inline-flex">
            Let&rsquo;s talk
          </Button>
          <button
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-slate-200 hover:border-signal/50 hover:text-signal lg:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav
          className="border-t border-line bg-ink/95 px-6 py-4 backdrop-blur-xl lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                  location.pathname === item.href
                    ? 'bg-signal/10 text-signal'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <ResumeButton className="w-full">Download résumé</ResumeButton>
              <Button href="/contact" className="w-full">
                Let&rsquo;s talk
              </Button>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;
