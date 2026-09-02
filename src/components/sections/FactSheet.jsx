import { facts } from '../../content/facts';
import FactList from '../ui/FactList';

// Plain, quotable key facts rendered near the top of the home page so AI
// engines can extract accurate, standalone statements (GEO) and visitors get
// a fast verified summary. Deliberately no Reveal/scroll animation: the
// content is guaranteed visible and parseable without JavaScript.
const FactSheet = () => (
  <section
    aria-labelledby="key-facts-heading"
    className="mx-auto max-w-7xl px-5 pt-10 sm:px-6 sm:pt-14 md:px-8 lg:px-10"
  >
    <div className="rounded-2xl border border-line bg-ink-2 px-5 py-6 sm:px-7 sm:py-8 md:px-10">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow">// key facts</p>
        <span className="mono-label hidden text-slate-600 sm:block">quotable · verifiable</span>
      </div>
      <h2 id="key-facts-heading" className="sr-only">
        Key facts about Ferdinard Ashonibare
      </h2>
      <FactList
        facts={facts}
        className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2 xl:grid-cols-4"
      />
    </div>
  </section>
);

export default FactSheet;
