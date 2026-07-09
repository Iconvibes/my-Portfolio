import { Link } from 'react-router-dom';
import { navigation } from '../../content';

const Footer = () => (
  <footer className="border-t border-white/10 bg-slate-950">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
      <div>
        <p className="eyebrow">Codeferd Digital</p>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">Secure digital platforms for governments, institutions, security organizations, and ambitious businesses.</p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        {navigation.map((item) => (
          <Link key={item.href} to={item.href} className="transition hover:text-white">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
