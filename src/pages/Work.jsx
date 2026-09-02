import WorkSection from '../components/sections/WorkSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CtaSection from '../components/sections/CtaSection';
import ScrollReveal from '../components/ui/ScrollReveal';

const Work = () => (
  <div className="bg-ink text-slate-100">
    <WorkSection detailed />
    <ScrollReveal delay={50}>
      <TestimonialsSection index="(02)" />
    </ScrollReveal>
    <ScrollReveal>
      <CtaSection title="Want your product on this page next?" />
    </ScrollReveal>
  </div>
);

export default Work;
