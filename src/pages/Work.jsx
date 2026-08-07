import PageShell from '../components/layout/PageShell';
import WorkSection from '../components/sections/WorkSection';
import CtaSection from '../components/sections/CtaSection';

const Work = () => (
  <div className="bg-ink text-slate-100">
    <PageShell
      eyebrow="Work"
      index="(01)"
      title="Different worlds. One standard of care."
      intro="A live government platform, a premium hotel website, an edtech app, and a logistics landing page — each designed, built, and delivered end to end."
    />
    <WorkSection detailed />
    <CtaSection title="Want your product on this page next?" />
  </div>
);

export default Work;
