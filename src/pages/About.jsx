import PageShell from '../components/layout/PageShell';
import CtaSection from '../components/sections/CtaSection';
import TechnologySection from '../components/sections/TechnologySection';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProfilePhoto from '../components/ui/ProfilePhoto';
import ResumeButton from '../components/ui/ResumeButton';
import Section from '../components/ui/Section';
import FactList from '../components/ui/FactList';
import { contactChannels, credentials, facts, featuredProject, industries, projects } from '../content';

const glanceFacts = facts.filter((fact) =>
  ['Who', 'Availability', 'Stats', 'Stack'].includes(fact.label)
);

const buildingProjects = projects.filter((project) => project.status !== 'live');

const About = () => {
  const hasEducation = credentials.education.length > 0;
  const hasCertifications = credentials.certifications.length > 0;
  const hasCurrentLearning = (credentials.currentlyLearning?.length ?? 0) > 0;
  const showCredentials = hasEducation || hasCertifications || hasCurrentLearning;

  return (
  <div className="bg-ink text-slate-100">
    <PageShell
      eyebrow="About"
      index="(01)"
      title={
        'A developer who treats every product like a system people depend on'
      }
      intro="I'm Ferdinard Ashonibare, a full-stack web developer based in Lagos, Nigeria. I design and build complete web products: secure platforms for institutions, polished sites for businesses, and practical tools for educators."
    >
      <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-[0.4fr_0.6fr]">
        <div className="overflow-hidden rounded-2xl border border-line">
          <ProfilePhoto priority className="rounded-2xl border-0" />
        </div>
        <Card>
          <p className="eyebrow">// at a glance</p>
          <FactList
            facts={glanceFacts}
            rows
            ddClassName="mt-1.5 text-sm leading-6 text-slate-300"
            className="mt-5"
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <ResumeButton />
            <Button href="/contact" variant="outline">
              Contact me
            </Button>
          </div>
          <p className="mono-label mt-6 text-slate-600">{contactChannels[0].value}</p>
        </Card>
      </div>

      {showCredentials ? (
        <Card className="mt-6">
          <p className="eyebrow">// credentials</p>
          <div className="mt-5 grid gap-8 md:grid-cols-2">
            {hasEducation ? (
              <div className={hasCertifications ? '' : 'md:col-span-2'}>
                <p className="mono-label text-slate-500">Education</p>
                <ul className="mt-3 space-y-5">
                  {credentials.education.map((item) => (
                    <li key={`${item.institution}-${item.degree}`}>
                      <p className="font-semibold text-white">{item.degree}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {item.institution}
                        {item.location ? ` · ${item.location}` : ''}
                        {item.year ? ` · ${item.year}` : ''}
                      </p>
                      {item.field ? (
                        <p className="mono-label mt-1.5 text-slate-500">{item.field}</p>
                      ) : null}
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono-label mt-1.5 inline-block text-signal underline-offset-4 hover:underline"
                        >
                          verify
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {hasCertifications ? (
              <div className={hasEducation ? '' : 'md:col-span-2'}>
                <p className="mono-label text-slate-500">Certifications</p>
                <ul className="mt-3 space-y-4">
                  {credentials.certifications.map((item) => (
                    <li key={`${item.name}-${item.issuer}`}>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {item.issuer}
                        {item.year ? ` · ${item.year}` : ''}
                      </p>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono-label mt-1 inline-block text-signal underline-offset-4 hover:underline"
                        >
                          verify
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          {hasCurrentLearning ? (
            <div className="mt-6 border-t border-line-soft pt-5">
              <p className="mono-label text-slate-500">// currently deepening</p>
              <ul className="mt-3 space-y-3">
                {credentials.currentlyLearning.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Card>
      ) : null}

      <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
        <Card>
          <p className="eyebrow">// the short version</p>
          <div className="mt-4 space-y-4 text-sm leading-8 text-slate-400">
            <p>
              I build web software end to end. The interface people see, the systems underneath
              it, and the deployment that keeps it alive. My work spans{' '}
              <span className="text-slate-200">government, hospitality, education, real estate, business, and
              logistics</span> because I care less about the industry and more about building
              things that genuinely work for the people using them.
            </p>
            <p>
              The most significant build so far is{' '}
              {featuredProject.href ? (
                <a
                  href={featuredProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-200 underline-offset-4 hover:text-signal hover:underline"
                >
                  the official platform for Ogun State So-Safe Corps
                </a>
              ) : (
                <span className="font-semibold text-slate-200">
                  the official platform for Ogun State So-Safe Corps
                </span>
              )}, a state security institution.
              That project shaped how I work: security as a default, performance as a given, and
              clarity as a promise.
            </p>
          </div>
        </Card>
        <Card>
          <p className="eyebrow">// currently</p>
          <div className="mt-4 space-y-4 text-sm leading-8 text-slate-400">
            <p>
              Building {buildingProjects.length} product{buildingProjects.length === 1 ? '' : 's'} I'm excited about:
            </p>
            <ul className="space-y-3">
              {buildingProjects.map((project) => (
                  <li key={project.slug} className="rounded-xl border border-line bg-ink px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-white">{project.name}</span>
                      <Badge tone="signal">Launching soon</Badge>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500">{project.sector}</p>
                  </li>
                ))}
            </ul>
            <p>
              And I'm always open to the next challenge, whether that's a{' '}
              <span className="text-slate-200">full-time role</span> or a{' '}
              <span className="text-slate-200">project worth building well</span>.
            </p>
          </div>
        </Card>
      </div>
    </PageShell>

    <Section
      index="(02)"
      eyebrow="Sectors"
      title="Where I work"
      description="Different worlds, same standards. Focus areas, not limits. If it lives in a browser, I can build it."
    >
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {industries.map((industry) => (
          <Card key={industry.title} className="border-line-soft">
            <h3 className="display-ink text-xl text-white">{industry.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{industry.description}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section
      index="(03)"
      eyebrow="Work"
      title="Want to see the proof?"
      description="Selected work, built end to end, including a live government platform."
    >
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button href="/work" icon>
          View my work
        </Button>
        <Button href="/case-study" variant="outline">
          Read the So-Safe Corps case study
        </Button>
      </div>
    </Section>

    <TechnologySection />
    <CtaSection title="Let's build something that matters." />
  </div>
  );
};

export default About;
