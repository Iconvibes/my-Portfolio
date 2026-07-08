import PageShell from '../components/layout/PageShell';
import Card from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { contactChannels } from '../constants/content';

const Contact = () => (
  <div className="bg-[#070B14] text-slate-100">
    <PageShell
      eyebrow="Contact"
      title="Let’s discuss your next secure platform initiative."
      intro="Whether you need a public-facing platform, a secure internal system, or a modern enterprise portal, we can help you move with clarity and confidence."
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Business information</p>
          <div className="mt-6 space-y-4">
            {contactChannels.map((channel) => (
              <div key={channel.label} className="rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3">
                <p className="text-sm text-slate-400">{channel.label}</p>
                <p className="mt-1 font-medium text-white">{channel.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Calendly</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">A scheduling placeholder can be connected here for consultation booking.</p>
          </div>
        </Card>

        <Card className="border-sky-400/20 bg-[#111827]">
          <form className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm text-slate-300">
                <span className="mb-2 block">Full name</span>
                <input className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none focus:border-sky-400" placeholder="Your name" />
              </label>
              <label className="text-sm text-slate-300">
                <span className="mb-2 block">Work email</span>
                <input className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none focus:border-sky-400" placeholder="you@organization.com" />
              </label>
            </div>
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Organization</span>
              <input className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none focus:border-sky-400" placeholder="Institution or company" />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Project details</span>
              <textarea className="min-h-36 w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none focus:border-sky-400" placeholder="Tell us about the platform, audience, and goals." />
            </label>
            <div className="flex flex-wrap gap-4">
              <Button type="submit">Send Inquiry</Button>
              <Button href="/case-study" variant="secondary">View Case Study</Button>
            </div>
          </form>
        </Card>
      </div>
    </PageShell>
  </div>
);

export default Contact;
