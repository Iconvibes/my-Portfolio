import { Button } from '../ui/Button';

const CtaSection = ({ title = 'Have a project in mind?' }) => (
  <section className="relative overflow-hidden bg-grid-paper bg-signal text-signal-ink">
    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="mono-label text-signal-ink/60">// available for projects &amp; roles</p>
          <h2 className="display-ink mt-4 text-4xl sm:text-6xl">{title}</h2>
          <p className="mt-5 text-lg leading-8 text-signal-ink/75">
            Tell me what you're building and I'll reply with clear next steps — usually within 24
            hours.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" variant="paper" icon>
            Start the conversation
          </Button>
          <a
            href="mailto:ferdinardoluwajuwonlo@gmail.com"
            className="mono-label inline-flex items-center gap-2 rounded-full border border-signal-ink/30 px-6 py-3.5 text-signal-ink transition hover:border-signal-ink hover:bg-signal-ink hover:text-signal"
          >
            ferdinardoluwajuwonlo@gmail.com
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CtaSection;
