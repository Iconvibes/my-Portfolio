import { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import ProfilePhoto from '../ui/ProfilePhoto';
import ResumeButton from '../ui/ResumeButton';
import TextReveal from '../ui/TextReveal';
import TiltCard from '../ui/TiltCard';
import TerminalCard from './TerminalCard';
import { featuredProject, projects } from '../../content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Derived from the projects module so the counts can never drift from the
// content that defines them.
const liveProjects = projects.filter((project) => project.status === 'live');
const inProgressProjects = projects.filter((project) => project.status !== 'live');
const liveSectors = new Set(liveProjects.map((project) => project.sector)).size;

const stats = [
  { value: String(liveProjects.length), label: liveProjects.length === 1 ? 'Live platform' : 'Live platforms' },
  {
    value: String(inProgressProjects.length),
    label: inProgressProjects.length === 1 ? 'Product in the making' : 'Products in the making'
  },
  { value: String(liveSectors), label: liveSectors === 1 ? 'Sector live' : 'Sectors live' }
];

const HeroSection = () => {
  const reduced = useReducedMotion();
  const gridRef = useRef(null);
  const glowRef = useRef(null);

  // Subtle scroll + mouse parallax on the background layers (reduced-motion safe).
  useEffect(() => {
    if (reduced) {
      return undefined;
    }

    const grid = gridRef.current;
    const glow = glowRef.current;
    if (!grid || !glow) {
      return undefined;
    }

    const onScroll = () => {
      grid.style.transform = `translate3d(0, ${window.scrollY * 0.12}px, 0)`;
    };
    const onMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 24;
      const y = (event.clientY / window.innerHeight - 0.5) * 24;
      glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [reduced]);

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div ref={gridRef} className="bg-grid-ink absolute inset-0" aria-hidden="true" />
      <div
        ref={glowRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,241,53,0.10),transparent_42%),radial-gradient(ellipse_at_bottom_right,rgba(56,130,246,0.10),transparent_45%)] transition-transform duration-300 ease-out"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-24">
        <div className="animate-enter">
          <p className="eyebrow">// full-stack web developer — lagos, nigeria</p>

          <h1 className="mt-6 text-[clamp(3rem,9vw,5.75rem)] text-white" aria-label="Ferdinard Ashonibare">
            <TextReveal text="Ferdinard" as="span" className="display-ink block" />
            <TextReveal text="Ashonibare" as="span" className="serif-accent text-signal block" />
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-9 text-slate-300 sm:text-2xl sm:leading-10">
            I design &amp; build <span className="font-semibold text-white">fast, secure web platforms</span>{' '}
            for government, hospitality, education, and beyond — from idea to launch, end to end.
          </p>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
            I recently had the opportunity to build the official web platform for{' '}
            {featuredProject.href ? (
              <a
                href={featuredProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline-offset-4 hover:text-signal hover:underline"
              >
                Ogun State So-Safe Corps
              </a>
            ) : (
              <span className="font-semibold text-white">Ogun State So-Safe Corps</span>
            )}{' '}
            — a state security institution — and I'm currently crafting a hotel website, an
            edtech app, and a multi-vendor e-commerce store. If it lives in a browser, I can build it.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/work" icon>
              See my work
            </Button>
            <Button href="/contact" variant="outline">
              Get in touch
            </Button>
            <ResumeButton>View résumé</ResumeButton>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="display-ink text-3xl text-signal sm:text-4xl">{stat.value}</dt>
                <dd className="mono-label mt-2 text-[0.65rem] leading-4 text-slate-500">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait + terminal status card */}
        <div className="relative lg:justify-self-end" style={{ perspective: '900px' }}>
          <div className="ring-3d pointer-events-none absolute -top-16 -right-8" aria-hidden="true" />
          <div className="relative z-10 mx-auto mb-8 w-44 sm:w-52 lg:mr-0">
            <TiltCard maxTilt={6}>
              <ProfilePhoto priority />
            </TiltCard>
          </div>
          <div className="relative z-10 animate-float">
            <TiltCard maxTilt={8}>
              <TerminalCard />
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
