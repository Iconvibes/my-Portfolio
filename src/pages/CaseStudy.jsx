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

      <Card className="mt-6">
        <p className="eyebrow">// how it's built</p>
        <h2 className="display-ink mt-4 text-2xl text-white">A full-stack system, end to end</h2>
        <p className="mt-4 text-sm leading-8 text-slate-400">{featuredCaseStudy.howItBuilt}</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
          {featuredCaseStudy.architectureLayers.map((layer, index) => (
            <div key={layer.layer} className="contents">
              {index > 0 ? (
                <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    fill="none"
                    className="text-signal"
                  >
                    <path
                      d="M2 10h34M29 3l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}
              <div className="rounded-2xl border border-line bg-ink p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="mono-label text-signal">{layer.layer}</p>
                  <span className="mono-label text-slate-600">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-3 font-semibold text-white">{layer.title}</p>
                <p className="mt-1 text-sm text-slate-500">{layer.detail}</p>
                <p className="mt-4 text-sm leading-6 text-slate-400">{layer.note}</p>
              </div>
              {index < featuredCaseStudy.architectureLayers.length - 1 ? (
                <div className="flex items-center justify-center py-2 lg:hidden" aria-hidden="true">
                  <svg
                    width="20"
                    height="32"
                    viewBox="0 0 20 32"
                    fill="none"
                    className="rotate-90 text-signal"
                  >
                    <path
                      d="M2 16h14M13 9l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          ))}
        </div>

      </Card>

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
