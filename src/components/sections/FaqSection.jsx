import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { faqItems } from '../../content';
import Section from '../ui/Section';

const FaqItem = ({ item, isOpen, onToggle, index }) => (
  <div
    className={`overflow-hidden rounded-2xl border transition-colors duration-150 ${
      isOpen ? 'border-signal/40 bg-ink-2' : 'border-line bg-ink-2/60 hover:border-line'
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${index}`}
      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left focus-visible:outline-none sm:gap-4 sm:px-7 sm:py-5"
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
      <ChevronDownIcon
        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
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
      description="The honest answers. About projects, pricing, process, and whether I'm available."
      className="lg:max-w-5xl"
    >
      <div className="mt-10 space-y-3 sm:mt-14 sm:space-y-4">
        {faqItems.map((item, index) => (
          <FaqItem
            key={item.question}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
      <div className="mt-10 text-sm text-slate-500">
        Still curious?{' '}
        <a
          href="mailto:ferdinardoluwajuwonlo@gmail.com"
          className="text-signal underline-offset-4 hover:underline"
        >
          Ask me anything.
        </a>{' '}
        I answer within a day.
      </div>
    </Section>
  );
};

export default FaqSection;
