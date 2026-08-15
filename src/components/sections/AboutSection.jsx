import { values } from '../../content';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import TiltCard from '../ui/TiltCard';

const AboutSection = () => (
  <Section
    index="(03)"
    eyebrow="About"
    title={
      <>
        A developer who treats every product like a{' '}
        <span className="serif-accent text-signal">system people depend on</span>
      </>
    }
    description="I'm Ferdinard — a full-stack developer from Lagos, Nigeria. I've shipped two live platforms — a state security institution's site and a logistics landing page — and I'm building a hotel website, an edtech app, and a multi-vendor e-commerce store. Here's how I work."
  >
    <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {values.map((value, index) => (
        <TiltCard key={value.title} maxTilt={5} className="h-full">
          <Reveal
            as="article"
            delay={index * 70}
            className="h-full rounded-2xl border border-line bg-ink-2 p-7 transition-colors duration-300 hover:border-signal/40"
          >
          <p className="mono-label text-slate-500">0{index + 1}</p>
          <h3 className="mt-4 text-lg font-semibold text-white">{value.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{value.text}</p>
          </Reveal>
        </TiltCard>
      ))}
    </div>

    <Reveal className="mt-12 flex flex-wrap items-center gap-5 rounded-2xl border border-line bg-ink-2 px-7 py-6">
      <p className="flex-1 text-sm leading-7 text-slate-300">
        <span className="mono-label mr-2 text-signal">$ whoami</span>
        Full-stack developer · Lagos, Nigeria · building for government, hospitality, education &amp; more
      </p>
      <Button href="/about" variant="outline" icon>
        More about me
      </Button>
    </Reveal>
  </Section>
);

export default AboutSection;
