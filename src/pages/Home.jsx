import HeroSection from '../components/sections/HeroSection';
import FactSheet from '../components/sections/FactSheet';
import Marquee from '../components/sections/Marquee';
import WorkSection from '../components/sections/WorkSection';
import CapabilitiesSection from '../components/sections/CapabilitiesSection';
import AboutSection from '../components/sections/AboutSection';
import ProcessSection from '../components/sections/ProcessSection';
import TechnologySection from '../components/sections/TechnologySection';
import FaqSection from '../components/sections/FaqSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CtaSection from '../components/sections/CtaSection';
import { techMarquee } from '../content';

const Home = () => (
  <>
    <HeroSection />
    <FactSheet />
    <Marquee items={techMarquee} />
    <WorkSection />
    <CapabilitiesSection />
    <AboutSection />
    <ProcessSection />
    <TechnologySection />
    <FaqSection />
    <TestimonialsSection />
    <CtaSection />
  </>
);

export default Home;
