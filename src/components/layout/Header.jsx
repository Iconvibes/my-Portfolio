import { Link, NavLink } from 'react-router-dom';
import { navigation } from '../../constants/content';

const Header = () => (
  <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070B14]/80 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
      <Link to="/" className="text-lg font-semibold uppercase tracking-[0.3em] text-white">
        Codeferd
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `text-sm transition ${isActive ? 'text-sky-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link to="/contact" className="rounded-full border border-sky-500/40 px-4 py-2 text-sm font-medium text-sky-300 transition hover:border-sky-400 hover:text-white">
        Schedule Consultation
      </Link>
    </div>
  </header>
);

export default Header;
