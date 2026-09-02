import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import PageShell from '../components/layout/PageShell';
import ContactForm from '../components/sections/ContactForm';
import Card from '../components/ui/Card';
import ResumeButton from '../components/ui/ResumeButton';
import ScrollReveal from '../components/ui/ScrollReveal';
import { contactChannels, socialLinks } from '../content';

const channelIcon = {
  Email: <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />,
  'Phone / WhatsApp': <PhoneIcon className="h-4 w-4" aria-hidden="true" />,
  Location: <MapPinIcon className="h-4 w-4" aria-hidden="true" />
};

/* Custom SVG icons for social platforms */
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

const Contact = () => (
  <div className="bg-ink text-slate-100">
    <PageShell
      eyebrow="Contact"
      index="(01)"
      title="Let's build something worth shipping"
      intro="Whether it's a website, a web app, or a full-time role. Tell me what you have in mind and I'll reply with clear next steps, usually within 24 hours."
    >
      <ScrollReveal>
      <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <Card>
            <p className="eyebrow">// direct line</p>
            <div className="mt-6 space-y-4">
              {contactChannels.map((channel) => {
                const content = (
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-ink text-signal">
                      {channelIcon[channel.label]}
                    </span>
                    <span>
                      <span className="mono-label block text-slate-500">{channel.label}</span>
                      <span className="mt-0.5 block text-sm font-medium text-white">
                        {channel.value}
                      </span>
                    </span>
                  </span>
                );

                return channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    className="block rounded-xl border border-line bg-ink px-4 py-3 transition duration-150 hover:border-signal/50"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={channel.label} className="rounded-xl border border-line bg-ink px-4 py-3">
                    {content}
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <p className="eyebrow">// find me online</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-line bg-ink px-4 py-3 transition duration-150 hover:border-signal/50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink text-signal">
                    {socialIcon[social.label]}
                  </span>
                  <span>
                    <span className="mono-label block text-slate-500">{social.label}</span>
                    <span className="mt-0.5 block text-sm font-medium text-white">{social.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </Card>

          <Card>
            <p className="eyebrow">// resume</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Prefer the full picture on one page? Open or download my resume.
            </p>
            <div className="mt-5">
              <ResumeButton />
            </div>
          </Card>

          <div className="rounded-2xl border border-line bg-ink-2 p-6">
            <p className="eyebrow">// response time</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              I reply to every serious message within 24 hours. If it's urgent, WhatsApp or call me
              directly. I pick up.
            </p>
          </div>
        </div>

        <Card className="border-signal/20 bg-ink-2">
          <ContactForm />
        </Card>
      </div>
      </ScrollReveal>
    </PageShell>
  </div>
);

export default Contact;
