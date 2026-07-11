import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

const navClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
    isActive ? 'bg-sky-400/10 text-sky-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" onClick={closeMenu} className="text-lg font-semibold uppercase tracking-normal text-white">
          Codeferd
        </Link>
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link key={item.href} to={item.href} className={navClass({ isActive: location.pathname === item.href })}>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <button
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <Button href="/contact" variant="primary">
          Book a Consultation
        </Button>
      </div>
      {isOpen && (
        <nav className="md:hidden flex flex-col p-4 bg-slate-900/85 backdrop-blur-xl border-b border-white/10">
          {navigation.map((item) => (
            <Link key={item.href} to={item.href} onClick={closeMenu} className={navClass({ isActive: location.pathname === item.href })}>
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
