import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navigation } from '../../content';
import ResumeButton from '../ui/ResumeButton';

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none ${
    isActive ? 'bg-signal/10 text-signal' : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const prevY = useRef(0);
  const closeMenu = () => setIsOpen(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);

      if (isOpen) {
        prevY.current = y;
        return;
      }

      if (y > prevY.current && y > 160) {
        setIsHidden(true);
      } else if (y < prevY.current) {
        setIsHidden(false);
      }

      prevY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[translate,border-color] duration-300 ease-out ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled || isOpen
          ? 'border-line bg-ink'
          : 'border-transparent bg-ink/80'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3 focus-visible:outline-none"
          aria-label="Ferdinard Ashonibare, home"
        >
          <span className="display-ink flex h-11 w-11 items-center justify-center rounded-lg bg-signal text-sm text-signal-ink transition-transform duration-150 group-hover:-rotate-3">
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
          <ResumeButton>Resume</ResumeButton>
          <button
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.03] text-slate-200 hover:border-signal/50 hover:text-signal lg:hidden"
          >
            {isOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav
          className="border-t border-line bg-ink px-6 py-4 lg:hidden"
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
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;
