import PageShell from '../components/layout/PageShell';
import CtaSection from '../components/sections/CtaSection';
import Badge from '../components/ui/Badge';
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
  <div className="bg-slate-950 text-slate-100">
    <PageShell
      eyebrow="Case Study"
      title={featuredCaseStudy.title}
      intro="A secure, public-facing platform designed to strengthen institutional presence and improve engagement with confidence."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <p className="eyebrow">Overview</p>
          <p className="mt-4 text-sm leading-8 text-slate-400">{featuredCaseStudy.overview}</p>
          <p className="mt-6 text-sm leading-8 text-slate-400">{featuredCaseStudy.challenge}</p>
        </Card>
        <Card>
          <p className="eyebrow">Timeline</p>
          <ol className="mt-6 space-y-3">
            {featuredCaseStudy.timeline.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300">
                {item}
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {storySections.map(([label, key]) => (
          <Card key={key}>
            <h2 className="text-xl font-semibold text-white">{label}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">{featuredCaseStudy[key]}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-white">Performance</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{featuredCaseStudy.performance}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Lessons Learned</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{featuredCaseStudy.lessons}</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-white">Outcome</h2>
        <p className="mt-4 text-sm leading-7 text-slate-400">{featuredCaseStudy.outcome}</p>
        <p className="mt-6 text-sm leading-7 text-slate-400">{featuredCaseStudy.future}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {featuredCaseStudy.techStack.map((stack) => (
            <Badge key={stack}>{stack}</Badge>
          ))}
        </div>
      </Card>
    </PageShell>

    <CtaSection title="Need a secure platform with institutional polish?" />
  </div>
);

export default CaseStudy;
