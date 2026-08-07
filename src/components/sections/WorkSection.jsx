import { ArrowUpRight } from 'lucide-react';
import { projects } from '../../content';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProjectFrame from '../ui/ProjectFrame';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import TiltCard from '../ui/TiltCard';

const StatusBadge = ({ status }) =>
  status === 'live' ? (
    <Badge tone="signal">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
      Live
    </Badge>
  ) : (
    <Badge tone="paper">
      <span className="h-1.5 w-1.5 rounded-full bg-ink/40" aria-hidden="true" />
      Launching soon
    </Badge>
  );

/* ---------- Compact "index" rows (Home) ---------- */

const ProjectRow = ({ project, index }) => {
  const isLive = project.status === 'live';
  const linkable = isLive && project.href;

  const inner = (
    <div className="group grid items-center gap-x-8 gap-y-3 rounded-2xl border border-ink/10 bg-white/40 px-6 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:shadow-[0_24px_60px_rgba(26,38,0,0.18)] sm:grid-cols-[auto_auto_1fr_auto] sm:px-8 sm:py-5">
      <span className="mono-label hidden text-ink/40 transition-colors duration-300 group-hover:text-signal sm:block">
        (0{index + 1})
      </span>

      <div className="hidden overflow-hidden rounded-lg border border-ink/10 bg-ink-2 shadow-[0_8px_24px_rgba(26,38,0,0.12)] sm:block">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="h-16 w-24 object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="display-ink text-2xl text-ink transition-colors duration-300 group-hover:text-white sm:text-3xl">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="mono-label mt-2 text-ink/50 transition-colors duration-300 group-hover:text-slate-400">
          {project.sector}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="mono-label rounded-full border border-ink/10 px-2.5 py-1 text-[0.65rem] text-ink/60 transition-colors duration-300 group-hover:border-white/15 group-hover:text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {linkable ? (
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-signal-ink">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
        </span>
      ) : (
        <span className="mono-label hidden text-ink/40 transition-colors duration-300 group-hover:text-slate-500 sm:block">
          Coming soon
        </span>
      )}
    </div>
  );

  return (
    <Reveal delay={index * 90}>
      {linkable ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
          {inner}
        </a>
      ) : (
        <div className="block">{inner}</div>
      )}
    </Reveal>
  );
};

/* ---------- Detailed cards (Work page) ---------- */

const ProjectDetail = ({ project, index }) => {
  const isLive = project.status === 'live';
  const reversed = index % 2 === 1;

  return (
    <Reveal
      as="article"
      delay={index * 80}
      className={`grid items-center gap-10 lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      <TiltCard maxTilt={7}>
        <ProjectFrame project={project} />
      </TiltCard>
      <div>
        <p className="eyebrow">
          <span className="mr-2 text-slate-500">(0{index + 1})</span>
          {project.sector}
        </p>
        <h2 className="display-ink mt-4 text-4xl text-white sm:text-5xl">{project.name}</h2>
        <p className="mt-3 text-lg italic text-slate-400">{project.tagline}</p>
        <p className="mt-5 leading-8 text-slate-300">{project.description}</p>

        <ul className="mt-6 space-y-2.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-slate-400">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {isLive && project.href ? (
            <Button href={project.href} external icon>
              Visit live site
            </Button>
          ) : (
            <Badge tone="signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              Launching soon — check back
            </Badge>
          )}
        </div>
      </div>
    </Reveal>
  );
};

/* ---------- Section ---------- */

const WorkSection = ({ detailed = false }) => {
  if (detailed) {
    return (
      <div className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">(01) — Selected Work</p>
            <h2 className="display-ink mt-4 text-4xl text-white sm:text-5xl">
              Different worlds. One standard of care.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              A government platform, a hotel website, an edtech app, and a logistics landing page
              — each designed, built, and delivered to the same standard.
            </p>
          </div>
          <div className="mt-16 space-y-20">
            {projects.map((project, index) => (
              <ProjectDetail key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-grid-paper bg-paper text-ink">
      <Section
        tone="paper"
        index="(01)"
        eyebrow="Selected Work"
        title="Different worlds. One standard of care."
        description="A government platform, a hotel website, an edtech app, and a logistics landing page — each built to the same standard."
      >
        <div className="mt-14 space-y-5">
          {projects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
        <Reveal className="mt-10 flex flex-wrap items-center gap-5">
          <Button href="/work" variant="paper" icon>
            Explore the work
          </Button>
          <p className="mono-label text-ink/50">So-Safe Corps is live — the rest are on the way</p>
        </Reveal>
      </Section>
    </section>
  );
};

export default WorkSection;
