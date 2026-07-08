import PageShell from '../components/layout/PageShell';
import Card from '../components/ui/Card';
import { caseStudy } from '../constants/content';

const CaseStudy = () => (
  <div className="bg-[#070B14] text-slate-100">
    <PageShell
      eyebrow="Case Study"
      title="Building the Official Digital Platform for Ogun State So-Safe Corps"
      intro="A secure, public-facing platform designed to strengthen institutional presence and improve engagement with confidence."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Overview</p>
          <p className="mt-4 text-sm leading-8 text-slate-400">{caseStudy.overview}</p>
          <p className="mt-6 text-sm leading-8 text-slate-400">{caseStudy.challenge}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Timeline</p>
          <div className="mt-6 space-y-3">
            {caseStudy.timeline.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-sm text-slate-300">{item}</div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-white">Research</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{caseStudy.research}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Planning</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{caseStudy.planning}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Design</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{caseStudy.design}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Architecture</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{caseStudy.architecture}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Development</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{caseStudy.development}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Security</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{caseStudy.security}</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-white">Performance</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{caseStudy.performance}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Lessons Learned</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">{caseStudy.lessons}</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-white">Outcome</h2>
        <p className="mt-4 text-sm leading-7 text-slate-400">{caseStudy.outcome}</p>
        <p className="mt-6 text-sm leading-7 text-slate-400">{caseStudy.future}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {caseStudy.techStack.map((stack) => (
            <span key={stack} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">{stack}</span>
          ))}
        </div>
      </Card>
    </PageShell>
  </div>
);

export default CaseStudy;
