import { ArrowRight } from 'lucide-react';
import { capabilities } from '../../content';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import TiltCard from '../ui/TiltCard';

const CapabilitiesSection = () => (
  <Section
    index="(02)"
    eyebrow="Capabilities"
    title="What I can build for you"
    description="Full-stack development with a product mindset — the same discipline I brought to a state government platform, applied to your project."
  >
    <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {capabilities.map((capability, index) => (
        <TiltCard key={capability.title} maxTilt={6} className="h-full">
          <Reveal
            as="article"
            delay={index * 70}
            className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-2 p-7 transition-colors duration-300 hover:border-signal/40"
          >
          <div className="flex items-start justify-between">
            <h3 className="display-ink text-xl text-white">{capability.title}</h3>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
              aria-hidden="true"
            />
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">{capability.description}</p>
          <ul className="mt-5 space-y-2 border-t border-line-soft pt-5">
            {capability.items.map((item) => (
              <li
                key={item}
                className="mono-label flex items-center gap-2.5 text-[0.7rem] text-slate-500"
              >
                <span className="text-signal">→</span>
                {item}
              </li>
            ))}
          </ul>
          </Reveal>
        </TiltCard>
      ))}
    </div>
  </Section>
);

export default CapabilitiesSection;
