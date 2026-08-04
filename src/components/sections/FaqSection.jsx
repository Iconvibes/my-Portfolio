import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../../content';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

const FaqItem = ({ item, isOpen, onToggle, index }) => (
  <div
    className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
      isOpen ? 'border-signal/40 bg-ink-2' : 'border-line bg-ink-2/60 hover:border-line'
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${index}`}
      className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left focus-visible:outline-none"
    >
      <span className="flex items-center gap-4">
        <span className="mono-label text-slate-500">0{index + 1}</span>
        <span
          className={`text-base font-semibold transition-colors ${
            isOpen ? 'text-signal' : 'text-white'
          }`}
        >
          {item.question}
        </span>
      </span>
      <ChevronDown
        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
          isOpen ? 'rotate-180 text-signal' : ''
        }`}
        aria-hidden="true"
      />
    </button>
    <div
      id={`faq-panel-${index}`}
      role="region"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        <p className="px-7 pb-6 pl-[3.4rem] text-sm leading-7 text-slate-400">{item.answer}</p>
      </div>
    </div>
  </div>
);

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section
      index="(06)"
      eyebrow="FAQ"
      title="Questions people ask"
      description="The honest answers — about projects, pricing, process, and whether I'm available."
      className="lg:max-w-5xl"
    >
      <div className="mt-14 space-y-4">
        {faqItems.map((item, index) => (
          <Reveal key={item.question} delay={index * 50}>
            <FaqItem
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-sm text-slate-500">
        Still curious?{' '}
        <a
          href="mailto:ferdinardoluwajuwonlo@gmail.com"
          className="text-signal underline-offset-4 hover:underline"
        >
          Ask me anything
        </a>{' '}
        — I answer within a day.
      </Reveal>
    </Section>
  );
};

export default FaqSection;
