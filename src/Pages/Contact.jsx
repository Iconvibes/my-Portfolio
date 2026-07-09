import PageShell from '../components/layout/PageShell';
import ContactForm from '../components/sections/ContactForm';
import Card from '../components/ui/Card';
import { contactChannels } from '../content';

const Contact = () => (
  <div className="bg-slate-950 text-slate-100">
    <PageShell
      eyebrow="Contact"
      title="Let's discuss your next secure platform initiative."
      intro="Whether you need a public-facing platform, a secure internal system, or a modern enterprise portal, we can help you move with clarity and confidence."
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <p className="eyebrow">Business information</p>
          <div className="mt-6 space-y-4">
            {contactChannels.map((channel) => {
              const content = (
                <>
                  <p className="text-sm text-slate-400">{channel.label}</p>
                  <p className="mt-1 font-medium text-white">{channel.value}</p>
                </>
              );

              return channel.href ? (
                <a
                  key={channel.label}
                  href={channel.href}
                  className="block rounded-xl border border-white/10 bg-slate-950 px-4 py-3 transition hover:border-sky-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {content}
                </a>
              ) : (
                <div key={channel.label} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
                  {content}
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-xl border border-white/10 bg-slate-900 p-6">
            <p className="eyebrow">Consultation</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Share your goals through the form and we will respond with the next best step for discovery.
            </p>
          </div>
        </Card>

        <Card className="border-sky-400/20 bg-slate-900">
          <ContactForm />
        </Card>
      </div>
    </PageShell>
  </div>
);

export default Contact;
