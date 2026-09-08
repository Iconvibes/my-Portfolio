import { useParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import CtaSection from '../components/sections/CtaSection';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { egopayCaseStudy, featuredCaseStudy, verdantEstatesCaseStudy } from '../content';
import { getProjectBySlug } from '../content/projects';

const storySections = [
  ['Research', 'research'],
  ['Planning', 'planning'],
  ['Design', 'design'],
  ['Architecture', 'architecture'],
  ['Development', 'development'],
  ['Security', 'security']
];

/* ---------- Full case study ---------- */

const FullCaseStudy = ({ cs }) => (
  <div className="bg-ink text-paper">
    <PageShell
      eyebrow="Case Study"
      index="(01)"
      title={cs.title}
      intro={cs.intro ?? `A ${cs.client === 'Verdant Estates' ? 'modern real estate platform' : 'secure, public-facing platform'} for ${cs.client}, live at ${cs.liveUrl.replace('https://', '')}.`}
    >
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button href={cs.liveUrl} external icon>
          {cs.visitLabel ?? 'Visit the live platform'}
        </Button>
        <Button href="/work" variant="outline">
          Back to all work
        </Button>
      </div>

      <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <p className="eyebrow">// overview</p>
          <p className="mt-4 text-sm leading-8 text-secondary">{cs.overview}</p>
          <p className="mt-6 text-sm leading-8 text-secondary">{cs.challenge}</p>
        </Card>
        <Card>
          <p className="eyebrow">// at a glance</p>
          <dl className="mt-6 space-y-4">
            {cs.atAGlance.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col gap-1 border-b border-line-soft pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:justify-between"
              >
                <dt className="mono-label text-secondary">{metric.label}</dt>
                <dd className="text-sm font-medium text-paper">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-ink-2 px-7 py-8 sm:px-10">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow">// measured outcomes</p>
          <span className="mono-label hidden text-secondary sm:block">verified · not estimates</span>
        </div>
        <dl className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2 xl:grid-cols-4">
          {cs.outcomes.map((outcome) => (
            <div key={outcome.label}>
              <dt className="mono-label text-secondary">{outcome.label}</dt>
              <dd className="mt-2 text-sm font-medium text-paper">{outcome.value}</dd>
              <dd className="mt-1.5 text-xs leading-6 text-secondary">{outcome.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6">
        {storySections.map(([label, key]) => (
          <Card key={key}>
            <h2 className="display-ink text-xl text-paper">{label}</h2>
            <p className="mt-4 text-sm leading-7 text-secondary">{cs[key]}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <p className="eyebrow">// how it's built</p>
        <h2 className="display-ink mt-4 text-2xl text-paper">A full-stack system, end to end</h2>
        <p className="mt-4 text-sm leading-8 text-secondary">{cs.howItBuilt}</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
          {cs.architectureLayers.map((layer, index) => (
            <div key={layer.layer} className="contents">
              {index > 0 ? (
                <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    fill="none"
                    className="text-accent"
                  >
                    <path
                      d="M2 10h34M29 3l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}
              <div className="rounded-2xl border border-line bg-ink p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="mono-label text-accent">{layer.layer}</p>
                  <span className="mono-label text-secondary">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-3 font-semibold text-paper">{layer.title}</p>
                <p className="mt-1 text-sm text-secondary">{layer.detail}</p>
                <p className="mt-4 text-sm leading-6 text-secondary">{layer.note}</p>
              </div>
              {index < cs.architectureLayers.length - 1 ? (
                <div className="flex items-center justify-center py-2 lg:hidden" aria-hidden="true">
                  <svg
                    width="20"
                    height="32"
                    viewBox="0 0 20 32"
                    fill="none"
                    className="rotate-90 text-accent"
                  >
                    <path
                      d="M2 16h14M13 9l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          ))}
        </div>

      </Card>

      <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6">
        <Card>
          <h2 className="display-ink text-xl text-paper">Performance</h2>
          <p className="mt-4 text-sm leading-7 text-secondary">{cs.performance}</p>
        </Card>
        <Card>
          <h2 className="display-ink text-xl text-paper">Lessons learned</h2>
          <p className="mt-4 text-sm leading-7 text-secondary">{cs.lessons}</p>
        </Card>
      </div>

      <Card className="mt-6 border-accent/25">
        <p className="eyebrow">// outcome</p>
        <h2 className="display-ink mt-4 text-2xl text-paper">What shipped</h2>
        <p className="mt-4 text-sm leading-8 text-secondary">{cs.outcome}</p>
        <p className="mt-4 text-sm leading-8 text-secondary">{cs.future}</p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {cs.techStack.map((stack) => (
            <Badge key={stack}>{stack}</Badge>
          ))}
        </div>
        <div className="mt-8">
          <Button href={cs.liveUrl} external icon>
            {cs.visitLabel ?? 'See it live.'} {cs.liveUrl.replace('https://', '')}
          </Button>
        </div>
      </Card>
    </PageShell>

    <CtaSection title="Need a platform with institutional standards?" />
  </div>
);

/* ---------- Project-specific case study ---------- */

const ProjectCaseStudy = ({ project }) => (
  <div className="bg-ink text-paper">
    <PageShell
      eyebrow="Case Study"
      title={project.name}
      intro={project.description}
    >
      <div className="mt-6 flex flex-wrap items-center gap-4">
        {project.href ? (
          <Button href={project.href} external icon>
            Visit the live platform
          </Button>
        ) : null}
        <Button href="/work" variant="outline">
          Back to all work
        </Button>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="eyebrow">// overview</p>
          <p className="mt-4 text-sm leading-8 text-secondary">{project.description}</p>
          <p className="mt-5 text-sm leading-8 text-secondary">
            {project.sector}. {project.tagline}
          </p>
        </Card>
        <Card>
          <p className="eyebrow">// at a glance</p>
          <dl className="mt-6 space-y-4">
            <div className="flex flex-col gap-1 border-b border-line-soft pb-3 sm:flex-row sm:justify-between">
              <dt className="mono-label text-secondary">Client</dt>
              <dd className="text-sm font-medium text-paper">{project.name}</dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-line-soft pb-3 sm:flex-row sm:justify-between">
              <dt className="mono-label text-secondary">Sector</dt>
              <dd className="text-sm font-medium text-paper">{project.sector}</dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-line-soft pb-3 sm:flex-row sm:justify-between">
              <dt className="mono-label text-secondary">Status</dt>
              <dd className="text-sm font-medium text-paper">
                {project.status === 'live' ? 'Live in production' : project.status === 'production' ? 'In production' : 'Launching soon'}
              </dd>
            </div>
            <div className="flex flex-col gap-1 pb-0 sm:flex-row sm:justify-between">
              <dt className="mono-label text-secondary">Stack</dt>
              <dd className="text-sm font-medium text-paper">{project.tech.join(', ')}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <Card className="mt-6">
        <p className="eyebrow">// highlights</p>
        <ul className="mt-6 space-y-2.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-secondary">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-6 border-accent/25">
        <p className="eyebrow">// technology</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </Card>

      {project.href ? (
        <div className="mt-6">
          <Button href={project.href} external icon>
            See it live. {project.href.replace('https://', '')}
          </Button>
        </div>
      ) : null}
    </PageShell>

    <CtaSection title="Need a platform built to this standard?" />
  </div>
);

/* ---------- Page entry ---------- */

const CaseStudy = () => {
  const { slug } = useParams();

  // Default /case-study (no slug) → So-Safe Corps featured case study
  if (!slug || slug === 'so-safe-corps') {
    return <FullCaseStudy cs={featuredCaseStudy} />;
  }

  // Verdant Estates → full detailed case study
  if (slug === 'verdant-estates') {
    return <FullCaseStudy cs={verdantEstatesCaseStudy} />;
  }

  if (slug === 'egopay') {
    return <FullCaseStudy cs={egopayCaseStudy} />;
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
        <h1 className="display-ink text-3xl text-paper">Case study not found</h1>
        <p className="mt-4 text-secondary">That case study does not exist, yet.</p>
        <div className="mt-8">
          <Button href="/work">Back to projects</Button>
        </div>
      </div>
    );
  }

  return <ProjectCaseStudy project={project} />;
};

export default CaseStudy;
