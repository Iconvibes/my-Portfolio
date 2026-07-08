import PageShell from '../components/layout/PageShell';
import { caseStudies } from '../constants/content';

const Work = () => (
  <PageShell
    eyebrow="Work"
    title="Selected engagements that moved metrics and strengthened brands."
    intro="Each project is tailored to the audience, business model, and growth stage behind it."
  >
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {caseStudies.map((study) => (
        <article key={study.title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Case study</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">{study.title}</h2>
          <p className="mt-4 text-slate-300">{study.summary}</p>
          <p className="mt-6 text-sm font-semibold text-sky-300">{study.outcome}</p>
        </article>
      ))}
    </div>
  </PageShell>
);

export default Work;
