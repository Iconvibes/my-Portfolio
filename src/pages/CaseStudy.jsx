import PageShell from '../components/layout/PageShell';
import CtaSection from '../components/sections/CtaSection';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { featuredCaseStudy } from '../content';

const storySections = [
  ['Research', 'research'],
  ['Planning', 'planning'],
  ['Design', 'design'],
  ['Architecture', 'architecture'],
  ['Development', 'development'],
  ['Security', 'security']
];

const CaseStudy = () => (
  <div className="bg-ink text-slate-100">
    <PageShell
      eyebrow="Case Study"
      index="(01)"
      title={featuredCaseStudy.title}
      intro={`A secure, public-facing platform for ${featuredCaseStudy.client} — live at ${featuredCaseStudy.liveUrl.replace('https://', '')}.`}
    >
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button href={featuredCaseStudy.liveUrl} external icon>
          Visit the live platform
        </Button>
        <Button href="/work" variant="outline">
          Back to all work
        </Button>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <p className="eyebrow">// overview</p>
          <p className="mt-4 text-sm leading-8 text-slate-400">{featuredCaseStudy.overview}</p>
          <p className="mt-6 text-sm leading-8 text-slate-400">{featuredCaseStudy.challenge}</p>
        </Card>
        <Card>
          <p className="eyebrow">// at a glance</p>
          <dl className="mt-6 space-y-4">
            {featuredCaseStudy.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col gap-1 border-b border-line-soft pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:justify-between"
              >
                <dt className="mono-label text-slate-500">{metric.label}</dt>
                <dd className="text-sm font-medium text-white">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {storySections.map(([label, key]) => (
          <Card key={key}>
            <h2 className="display-ink text-xl text-white">{label}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">{featuredCaseStudy[key]}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="display-ink text-xl text-white">Performance</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{featuredCaseStudy.performance}</p>
        </Card>
        <Card>
          <h2 className="display-ink text-xl text-white">Lessons learned</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{featuredCaseStudy.lessons}</p>
        </Card>
      </div>

      <Card className="mt-6 border-signal/25">
        <p className="eyebrow">// outcome</p>
        <h2 className="display-ink mt-4 text-2xl text-white">What shipped</h2>
        <p className="mt-4 text-sm leading-8 text-slate-400">{featuredCaseStudy.outcome}</p>
        <p className="mt-4 text-sm leading-8 text-slate-400">{featuredCaseStudy.future}</p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {featuredCaseStudy.techStack.map((stack) => (
            <Badge key={stack}>{stack}</Badge>
          ))}
        </div>
        <div className="mt-8">
          <Button href={featuredCaseStudy.liveUrl} external icon>
            See it live — {featuredCaseStudy.liveUrl.replace('https://', '')}
          </Button>
        </div>
      </Card>
    </PageShell>

    <CtaSection title="Need a platform with institutional standards?" />
  </div>
);

export default CaseStudy;
