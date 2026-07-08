import PageShell from '../components/layout/PageShell';
import Card from '../components/ui/Card';
import { solutions } from '../constants/content';

const Solutions = () => (
  <div className="bg-[#070B14] text-slate-100">
    <PageShell
      eyebrow="Solutions"
      title="Secure platforms for public, institutional, and enterprise operations."
      intro="We build digital systems that align with policy, security expectations, and the pace of modern organizations."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {solutions.map((solution) => (
          <Card key={solution.title}>
            <h2 className="text-2xl font-semibold text-white">{solution.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">{solution.description}</p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p><span className="font-semibold text-white">Challenges:</span> {solution.challenges}</p>
              <p><span className="font-semibold text-white">Solutions:</span> {solution.solutions}</p>
              <p><span className="font-semibold text-white">Benefits:</span> {solution.benefits}</p>
              <p><span className="font-semibold text-white">Ideal clients:</span> {solution.ideal}</p>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  </div>
);

export default Solutions;
