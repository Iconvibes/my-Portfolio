import Section from '../ui/Section';
import CardGrid from './CardGrid';
import { whyCodeferd } from '../../content';

const WhySection = () => (
  <Section
    eyebrow="Why Codeferd"
    title="Reasoned delivery for organizations that value precision"
    description="We combine architecture, product thinking, and execution discipline to create systems that remain dependable over time."
  >
    <CardGrid
      items={whyCodeferd}
      renderItem={(item) => (
        <>
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
        </>
      )}
    />
  </Section>
);

export default WhySection;
