import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { capabilities } from '../../content';
import Section from '../ui/Section';

const CapabilitiesSection = () => (
  <Section
    index="(02)"
    eyebrow="Capabilities"
    title="What I can build for you"
    description="Full-stack development with a product mindset. The same discipline I brought to a state government platform, applied to your project."
  >
    <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2">
      {/* First card spans full width on mobile, stays normal on desktop */}
      {capabilities.map((capability, index) => {
        const isWide = index === 0;
        return (
          <article
            key={capability.title}
            className={`group relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 sm:p-7 transition-colors duration-150 hover:border-accent/40 ${
              isWide ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <h3 className="display-ink text-xl text-paper">{capability.title}</h3>
              <ArrowRightIcon
                className="h-5 w-5 shrink-0 text-secondary transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-secondary">{capability.description}</p>
            <ul className="mt-5 space-y-2 border-t border-line-soft pt-5">
              {capability.items.map((item) => (
                <li
                  key={item}
                  className="mono-label flex items-center gap-2.5 text-[0.7rem] text-secondary"
                >
                  <span className="text-accent">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  </Section>
);

export default CapabilitiesSection;
