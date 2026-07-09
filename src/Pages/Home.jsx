import HeroSection from '../components/sections/HeroSection';
import TrustSection from '../components/sections/TrustSection';
import ProblemsSection from '../components/sections/ProblemsSection';
import SolutionsSection from '../components/sections/SolutionsSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import FeaturedCaseStudySection from '../components/sections/FeaturedCaseStudySection';
import ProcessSection from '../components/sections/ProcessSection';
import TechnologySection from '../components/sections/TechnologySection';
import IndustriesSection from '../components/sections/IndustriesSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';

const Home = () => (
  <div className="bg-slate-950 text-white">
    <HeroSection />
    <TrustSection />
    <ProblemsSection />
    <SolutionsSection />
    <WhyChooseUsSection />
    <FeaturedCaseStudySection />
    <ProcessSection />
    <TechnologySection />
    <IndustriesSection />
    <FAQSection />
    <CTASection />
  </div>
);

export default Home;
