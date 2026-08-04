import { processSteps } from '../../content';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

const ProcessSection = () => (
  <Section
    index="(04)"
    eyebrow="Process"
    title="A simple process, executed well"
    description="No mystery, no jargon. Four clear steps from first call to launched product — and I stay around after go-live."
  >
    <ol className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {processSteps.map((step, index) => (
        <Reveal
          as="li"
          key={step.number}
          delay={index * 80}
          className="relative rounded-2xl border border-line bg-ink-2 p-7 transition-colors duration-300 hover:border-signal/40"
        >
          <span className="serif-accent text-4xl text-signal">{step.number}</span>
          <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
        </Reveal>
      ))}
    </ol>
  </Section>
);

export default ProcessSection;
