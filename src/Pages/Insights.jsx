import PageShell from '../components/layout/PageShell';
import CtaSection from '../components/sections/CtaSection';
import Card from '../components/ui/Card';
import { insights } from '../content';

const Insights = () => (
  <div className="bg-slate-950 text-slate-100">
    <PageShell
      eyebrow="Insights"
      title="Professional thinking for modern organizations."
      intro="Practical perspectives on architecture, security, and digital delivery for teams operating in high-trust environments."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {insights.map((item) => (
          <Card key={item.title} as="article">
            <p className="eyebrow">{item.category}</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">{item.summary}</p>
          </Card>
        ))}
      </div>
    </PageShell>
    <CtaSection title="Turn strategic thinking into a dependable platform." />
  </div>
);

export default Insights;
