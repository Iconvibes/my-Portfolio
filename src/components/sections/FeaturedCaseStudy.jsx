import { Button } from '../ui/Button';
import Card from '../ui/Card';
import { featuredCaseStudy } from '../../content';

const FeaturedCaseStudy = () => (
  <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
    <Card hover={false} className="overflow-hidden border-sky-400/20 bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(15,23,42,0.96))] p-8 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="eyebrow">Featured Case Study</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            {featuredCaseStudy.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">{featuredCaseStudy.overview}</p>
          <div className="mt-8">
            <Button href="/case-study">Read Full Case Study</Button>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/80 p-6">
          <dl className="space-y-4 text-sm text-slate-300">
            {featuredCaseStudy.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1 border-b border-white/10 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:justify-between">
                <dt>{metric.label}</dt>
                <dd className="font-medium text-white">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Card>
  </section>
);

export default FeaturedCaseStudy;
