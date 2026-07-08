import PageShell from '../components/layout/PageShell';
import Card from '../components/ui/Card';
import { insights } from '../constants/content';

const Insights = () => (
  <div className="bg-[#070B14] text-slate-100">
    <PageShell
      eyebrow="Insights"
      title="Professional thinking for modern organizations."
      intro="Practical perspectives on architecture, security, and digital delivery for teams operating in high-trust environments."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {insights.map((item) => (
          <Card key={item.title}>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">{item.category}</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">{item.summary}</p>
          </Card>
        ))}
      </div>
    </PageShell>
  </div>
);

export default Insights;
