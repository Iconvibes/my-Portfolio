import { Button } from '../ui/Button';

const CtaSection = ({ title = 'Have a project in mind?' }) => (
  <section className="relative overflow-hidden bg-grid-paper bg-signal text-signal-ink">
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="mono-label text-signal-ink/60">// available for projects and roles</p>
          <h2 className="display-ink mt-3 text-2xl sm:text-3xl md:text-4xl sm:mt-4 lg:text-6xl">{title}</h2>
          <p className="mt-5 text-lg leading-8 text-signal-ink/75">
            Tell me what you're building and I'll reply with clear next steps. Usually within 24
            hours.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button href="/contact" variant="paper" icon>
            Start the conversation
          </Button>
          <a
            href="mailto:ferdinardoluwajuwonlo@gmail.com"
            className="mono-label inline-flex items-center gap-2 rounded-full border border-signal-ink/30 px-6 py-3.5 text-signal-ink transition duration-150 hover:border-signal-ink hover:bg-signal-ink hover:text-signal"
          >
            ferdinardoluwajuwonlo@gmail.com
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CtaSection;
