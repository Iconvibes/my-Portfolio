import { Link } from 'react-router-dom';
import { ArrowUpIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { navigation, siteConfig, contactChannels, socialLinks } from '../../content';
import PreferredSourceButton from '../ui/PreferredSourceButton';

const year = new Date().getFullYear();

const contactIcon = {
  Email: <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />,
  'Phone / WhatsApp': <PhoneIcon className="h-4 w-4" aria-hidden="true" />,
  Location: <MapPinIcon className="h-4 w-4" aria-hidden="true" />
};

/* Custom inline SVGs for social icons (no Lucide, no Heroicons for these) */
const GithubIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialIcon = {
  GitHub: <GithubIcon />,
  LinkedIn: <LinkedinIcon />
};

const Footer = () => (
  <footer className="border-t border-line bg-ink">
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-12">
        <div>
          <Link to="/" className="group inline-flex items-center gap-3">
            <span className="display-ink flex h-11 w-11 items-center justify-center rounded-lg bg-signal text-sm text-signal-ink transition-transform duration-150 group-hover:-rotate-3">
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/3 text-slate-300 transition hover:border-signal/60 hover:text-signal"
              >
                {socialIcon[social.label]}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <p className="mono-label mb-4 text-slate-500">Navigate</p>
          <ul className="space-y-1 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-slate-400 transition hover:text-signal inline-flex min-h-[44px] items-center py-2">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mono-label mb-4 text-slate-500">Contact</p>
          <ul className="space-y-1 text-sm">
            {contactChannels.map((channel) => (
              <li key={channel.label}>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="flex min-h-[44px] items-center gap-2.5 py-2 text-slate-400 transition hover:text-signal"
                  >
                    {contactIcon[channel.label]}
                    <span>{channel.value}</span>
                  </a>
                ) : (
                  <span className="flex min-h-[44px] items-center gap-2.5 py-2 text-slate-400">
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
          &copy; {year} Ferdinard Ashonibare. Designed and built by me.
        </p>
        <a
          href="#main-content"
          className="mono-label inline-flex min-h-[44px] items-center gap-2 py-2 text-slate-500 transition hover:text-signal"
        >
          Back to top <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
