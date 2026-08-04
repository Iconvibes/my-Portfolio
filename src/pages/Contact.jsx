import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import ContactForm from '../components/sections/ContactForm';
import Card from '../components/ui/Card';
import ResumeButton from '../components/ui/ResumeButton';
import { contactChannels, socialLinks } from '../content';

const channelIcon = {
  Email: <Mail className="h-4 w-4" aria-hidden="true" />,
  'Phone / WhatsApp': <Phone className="h-4 w-4" aria-hidden="true" />,
  Location: <MapPin className="h-4 w-4" aria-hidden="true" />
};

const socialIcon = {
  GitHub: <Github className="h-4 w-4" aria-hidden="true" />,
  LinkedIn: <Linkedin className="h-4 w-4" aria-hidden="true" />
};

const Contact = () => (
  <div className="bg-ink text-slate-100">
    <PageShell
      eyebrow="Contact"
      index="(01)"
      title="Let's build something worth shipping"
      intro="Whether it's a website, a web app, or a full-time role — tell me what you have in mind and I'll reply with clear next steps, usually within 24 hours."
    >
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
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
                    className="block rounded-xl border border-line bg-ink px-4 py-3 transition hover:border-signal/50"
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
                  className="flex items-center gap-3 rounded-xl border border-line bg-ink px-4 py-3 transition hover:border-signal/50"
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
            <p className="eyebrow">// résumé</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Prefer the full picture on one page? Open or download my résumé.
            </p>
            <div className="mt-5">
              <ResumeButton />
            </div>
          </Card>

          <div className="rounded-2xl border border-line bg-ink-2 p-6">
            <p className="eyebrow">// response time</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              I reply to every serious message within 24 hours. If it's urgent, WhatsApp or call me
              directly — I pick up.
            </p>
          </div>
        </div>

        <Card className="border-signal/20 bg-ink-2">
          <ContactForm />
        </Card>
      </div>
    </PageShell>
  </div>
);

export default Contact;
