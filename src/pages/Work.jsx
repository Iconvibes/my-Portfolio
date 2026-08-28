import WorkSection from '../components/sections/WorkSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CtaSection from '../components/sections/CtaSection';

const Work = () => (
  <div className="bg-ink text-slate-100">
    <WorkSection detailed />
    <TestimonialsSection index="(02)" />
    <CtaSection title="Want your product on this page next?" />
  </div>
);

export default Work;
