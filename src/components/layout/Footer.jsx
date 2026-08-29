import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { navigation, siteConfig, contactChannels, socialLinks } from '../../content';
import PreferredSourceButton from '../ui/PreferredSourceButton';

const year = new Date().getFullYear();

const socialIcon = {
  GitHub: <Github className="h-4 w-4" aria-hidden="true" />,
  LinkedIn: <Linkedin className="h-4 w-4" aria-hidden="true" />
};

const contactIcon = {
  Email: <Mail className="h-4 w-4" aria-hidden="true" />,
  'Phone / WhatsApp': <Phone className="h-4 w-4" aria-hidden="true" />,
  Location: <MapPin className="h-4 w-4" aria-hidden="true" />
};

const Footer = () => (
  <footer className="border-t border-line bg-ink">
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="group inline-flex items-center gap-3">
            <span className="display-ink flex h-9 w-9 items-center justify-center rounded-lg bg-signal text-sm text-signal-ink transition-transform duration-300 group-hover:-rotate-6">
              FA
            </span>
            <span className="display-ink text-white">Ferdinard Ashonibare</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            Full-stack web developer building fast, secure platforms for government, hospitality,
            education, and beyond. Based in Lagos, working worldwide.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/3 text-slate-300 transition hover:border-signal/60 hover:text-signal"
              >
                {socialIcon[social.label]}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <p className="mono-label mb-4 text-slate-500">Navigate</p>
          <ul className="space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-slate-400 transition hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>



        <div>
          <p className="mono-label mb-4 text-slate-500">Contact</p>
          <ul className="space-y-3 text-sm">
            {contactChannels.map((channel) => (
              <li key={channel.label}>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="flex items-center gap-2.5 text-slate-400 transition hover:text-signal"
                  >
                    {contactIcon[channel.label]}
                    <span>{channel.value}</span>
                  </a>
                ) : (
                  <span className="flex items-center gap-2.5 text-slate-400">
                    {contactIcon[channel.label]}
                    <span>{channel.value}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-6 text-slate-600">
            Studio: {siteConfig.brandName} · {siteConfig.siteUrl.replace('https://', '')}
          </p>
          <PreferredSourceButton theme="dark" />
        </div>
      </div>

      <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          © {year} Ferdinard Ashonibare. Designed &amp; built by me.
        </p>
        <a
          href="#main-content"
          className="mono-label inline-flex items-center gap-2 text-slate-500 transition hover:text-signal"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
