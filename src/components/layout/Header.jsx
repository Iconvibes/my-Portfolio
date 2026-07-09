import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigation } from '../../content';

const navClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
    isActive ? 'bg-sky-400/10 text-sky-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" onClick={closeMenu} className="text-lg font-semibold uppercase tracking-normal text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
          Codeferd
        </Link>
        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink key={item.href} to={item.href} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link to="/contact" className="rounded-full border border-sky-500/40 px-4 py-2 text-sm font-medium text-sky-300 transition hover:border-sky-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
            Schedule Consultation
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-200 hover:border-sky-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {isOpen ? (
        <nav id="mobile-navigation" className="border-t border-white/10 px-6 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <NavLink key={item.href} to={item.href} onClick={closeMenu} className={navClass}>
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-2 rounded-full border border-sky-500/40 px-4 py-3 text-center text-sm font-medium text-sky-300 transition hover:border-sky-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Schedule Consultation
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;
