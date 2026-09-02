import { processSteps } from '../../content';
import Section from '../ui/Section';

const ProcessSection = () => (
  <Section
    index="(04)"
    eyebrow="Process"
    title="A simple process, executed well"
    description="No mystery, no jargon. Four clear steps from first call to launched product. I stay around after go-live."
  >
    <ol className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
      {processSteps.map((step) => (
        <li
          key={step.number}
          className="relative rounded-2xl border border-line bg-ink-2 p-5 sm:p-7 transition-colors duration-150 hover:border-signal/40"
        >
          <span className="display-ink text-4xl text-signal">{step.number}</span>
          <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
        </li>
      ))}
    </ol>
  </Section>
);

export default ProcessSection;
