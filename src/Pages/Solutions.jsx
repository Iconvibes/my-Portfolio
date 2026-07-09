import PageShell from '../components/layout/PageShell';
import SolutionsSection from '../components/sections/SolutionsSection';
import CtaSection from '../components/sections/CtaSection';

const Solutions = () => (
  <div className="bg-slate-950 text-slate-100">
    <PageShell
      eyebrow="Solutions"
      title="Secure platforms for public, institutional, and enterprise operations."
      intro="We build digital systems that align with policy, security expectations, and the pace of modern organizations."
    />
    <SolutionsSection detailed />
    <CtaSection title="Modernize the system your organization depends on." />
  </div>
);

export default Solutions;
