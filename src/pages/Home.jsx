import HeroSection from '../components/sections/HeroSection';
import WorkSection from '../components/sections/WorkSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AboutSection from '../components/sections/AboutSection';
import CtaSection from '../components/sections/CtaSection';
import ScrollReveal from '../components/ui/ScrollReveal';

const Home = () => (
  <>
    <HeroSection />
    <ScrollReveal>
      <WorkSection />
    </ScrollReveal>
    <ScrollReveal delay={50}>
      <TestimonialsSection />
    </ScrollReveal>
    <ScrollReveal delay={50}>
      <AboutSection />
    </ScrollReveal>
    <ScrollReveal>
      <CtaSection title="Have a project that needs building?" />
    </ScrollReveal>
  </>
);

export default Home;
