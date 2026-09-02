import HeroSection from '../components/sections/HeroSection';
import WorkSection from '../components/sections/WorkSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AboutSection from '../components/sections/AboutSection';
import CtaSection from '../components/sections/CtaSection';

const Home = () => (
  <>
    <HeroSection />
    <WorkSection />
    <TestimonialsSection />
    <AboutSection />
    <CtaSection title="Have a project that needs building?" />
  </>
);

export default Home;
