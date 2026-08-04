import PageShell from '../components/layout/PageShell';
import CtaSection from '../components/sections/CtaSection';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { insights } from '../content';

const Insights = () => (
  <div className="bg-ink text-slate-100">
    <PageShell
      eyebrow="Insights"
      index="(01)"
      title="Notes from the field"
      intro="Short, practical writing on engineering, product, and design — learned the hard way, shared the easy way."
    >
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {insights.map((item, index) => (
          <Card key={item.title} as="article" className="flex flex-col">
            <div className="flex items-center justify-between">
              <Badge>{item.category}</Badge>
              <span className="mono-label text-slate-600">0{index + 1}</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold leading-8 text-white">{item.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{item.summary}</p>
            <p className="mono-label mt-6 text-slate-600">coming soon</p>
          </Card>
        ))}
      </div>
    </PageShell>
    <CtaSection title="Have a topic you want me to write about?" />
  </div>
);

export default Insights;
