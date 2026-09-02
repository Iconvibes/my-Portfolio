import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import CtaSection from '../components/sections/CtaSection';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { insightDate, insights, readingTime } from '../content';

const Insights = () => (
  <div className="bg-ink text-slate-100">
    <PageShell
      eyebrow="Insights"
      index="(01)"
      title="Notes from the field"
      intro="Short, practical writing on engineering, product, and design. Learned the hard way, shared the easy way."
    >
      <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {insights.map((item, index) => (
          <Card key={item.slug} as="article" className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <Badge>{item.category}</Badge>
              <span className="mono-label text-slate-600">{insightDate(item.published)}</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold leading-8 text-white">
              <Link
                to={`/insights/${item.slug}`}
                className="underline-offset-4 transition hover:text-signal hover:underline"
              >
                {item.title}
              </Link>
            </h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{item.summary}</p>
            <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-5">
              <span className="mono-label text-slate-600">
                {String(index + 1).padStart(2, '0')} · {readingTime(item)} min read
              </span>
              <Link
                to={`/insights/${item.slug}`}
                className="mono-label text-signal underline-offset-4 transition hover:underline"
              >
                read →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
    <CtaSection title="Have a topic you want me to write about?" />
  </div>
);

export default Insights;
