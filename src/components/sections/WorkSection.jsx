import { useState } from 'react';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { projects } from '../../content';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProjectFrame from '../ui/ProjectFrame';
import Section from '../ui/Section';

const filterButtons = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'production', label: 'In Production' },
  { key: 'soon', label: 'Launching Soon' }
];

/* ---------- Home: large browser-framed previews ---------- */

const ProjectCard = ({ project, large = false }) => {
  const isLive = project.status === 'live';
  const linkable = isLive && project.href;

  const inner = (
    <div className={`group ${large ? '' : ''}`}>
      <ProjectFrame project={project} />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`display-ink text-white ${large ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
              {project.name}
            </h3>
            {isLive ? (
              <Badge tone="signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                Live
              </Badge>
            ) : (
              <Badge tone="paper">Launching soon</Badge>
            )}
          </div>
          <p className="mono-label mt-1.5 text-slate-500">{project.sector}</p>
        </div>
        {linkable ? (
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-slate-400 transition-all duration-150 group-hover:border-signal group-hover:bg-signal group-hover:text-signal-ink">
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:rotate-45" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="mono-label rounded-full border border-line px-2 py-0.5 text-[0.6rem] text-slate-500"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );

  return linkable ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <div className="block">{inner}</div>
  );
};

/* ---------- Work page: detailed view ---------- */

const ProjectDetail = ({ project, index }) => {
  const isLive = project.status === 'live';
  const isSoon = project.status === 'soon';
  const reversed = index % 2 === 1;

  return (
    <article
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-10 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      <div className={isSoon ? 'opacity-60' : ''}>
        <ProjectFrame project={project} />
      </div>
      <div className={isSoon ? 'opacity-60' : ''}>
        <p className="eyebrow">
          <span className="mr-2 text-slate-500">(0{index + 1})</span>
          {project.sector}
        </p>
        <h2 className="display-ink mt-3 text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl">{project.name}</h2>
        <p className="mt-2 text-base text-slate-400 sm:text-lg">{project.tagline}</p>
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:leading-8">{project.description}</p>

        <ul className="mt-5 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-slate-400">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          {project.href ? (
            <Button href={project.href} external icon>
              View Live
            </Button>
          ) : null}
          {project.caseStudyUrl ? (
            <Button href={project.caseStudyUrl} variant="outline" icon>
              Case Study
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
};

/* ---------- Section ---------- */

const WorkSection = ({ detailed = false }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  if (detailed) {
    const filteredProjects = projects.filter(
      (p) => activeFilter === 'all' || p.status === activeFilter
    );

    return (
      <div className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">(01) Selected Work</p>
            <h1 className="display-ink mt-3 text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl sm:mt-4">
              Different worlds. One standard of care.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              A government platform, a logistics landing page, a hotel website, and Verdant Estates live in production. EduTrack and NaijaMart, built to the same standard, are on the way.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setActiveFilter(btn.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-150 focus-visible:outline-none sm:px-5 ${
                  activeFilter === btn.key
                    ? 'bg-signal/10 text-signal border border-signal/30'
                    : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="mt-10 space-y-12 sm:mt-16 sm:space-y-20">
            {filteredProjects.map((project, index) => (
              <ProjectDetail key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Section
      index="(01)"
      eyebrow="Selected Work"
      title="Projects I've shipped"
      description="Real platforms, live in production. Each one built end to end, from first sketch to deployment."
    >
      {/* Verdant Estates leads, then the rest (skip featured) */}
      <div className="mt-10 sm:mt-14">
        <ProjectCard project={projects[5]} large />
      </div>

      <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8">
        {projects.slice(1, 3).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8">
        {projects.slice(3, 5).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-8 sm:mt-10">
        <Button href="/work" variant="outline" icon>
          View all projects
        </Button>
      </div>
    </Section>
  );
};

export default WorkSection;
