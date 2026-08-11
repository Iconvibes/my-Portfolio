import PageShell from '../components/layout/PageShell';
import WorkSection from '../components/sections/WorkSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CtaSection from '../components/sections/CtaSection';

const Work = () => (
  <div className="bg-ink text-slate-100">
    <PageShell
      eyebrow="Work"
      index="(01)"
      title="Different worlds. One standard of care."
      intro="One live in production — a government platform. Plus a hotel website, an edtech app, and a logistics landing page, built and launching soon."
    />
    <WorkSection detailed />
    <TestimonialsSection index="(02)" />
    <CtaSection title="Want your product on this page next?" />
  </div>
);

export default Work;
