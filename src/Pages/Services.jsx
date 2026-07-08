import PageShell from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { capabilities, services } from '../constants/content';

const Services = () => (
  <PageShell
    eyebrow="Services"
    title="Strategy, design, and engineering aligned around growth."
    intro="We build digital experiences that feel polished on day one and stay flexible as your company scales."
  >
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-5">
        {services.map((service) => (
          <div key={service.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
            <p className="mt-3 text-slate-300">{service.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {service.points.map((point) => <li key={point}>• {point}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-sky-400/20 bg-slate-900/70 p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-300">What makes us effective</p>
        <ul className="mt-6 space-y-4 text-slate-300">
          {capabilities.map((capability) => (
            <li key={capability} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              {capability}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/contact" variant="primary">Discuss your next launch</Button>
        </div>
      </div>
    </div>
  </PageShell>
);

export default Services;
