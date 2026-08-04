import PageShell from '../components/layout/PageShell';
import CtaSection from '../components/sections/CtaSection';
import TechnologySection from '../components/sections/TechnologySection';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProfilePhoto from '../components/ui/ProfilePhoto';
import ResumeButton from '../components/ui/ResumeButton';
import Section from '../components/ui/Section';
import { contactChannels, featuredProject, industries, projects } from '../content';

const About = () => (
  <div className="bg-ink text-slate-100">
    <PageShell
      eyebrow="About"
      index="(01)"
      title={
        <>
          A developer who treats every product like a{' '}
          <span className="serif-accent text-signal">system people depend on</span>
        </>
      }
      intro="I'm Ferdinard Ashonibare — a full-stack web developer based in Lagos, Nigeria. I design and build complete web products: secure platforms for institutions, polished sites for businesses, and practical tools for educators."
    >
      <div className="mt-14 grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
        <div className="overflow-hidden rounded-2xl border border-line">
          <ProfilePhoto className="rounded-2xl border-0" />
        </div>
        <Card>
          <p className="eyebrow">// at a glance</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line-soft pb-3">
              <dt className="mono-label text-slate-500">Role</dt>
              <dd className="text-white">Full-stack web developer</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line-soft pb-3">
              <dt className="mono-label text-slate-500">Stack</dt>
              <dd className="text-white">React · Node · Express · MongoDB</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line-soft pb-3">
              <dt className="mono-label text-slate-500">Base</dt>
              <dd className="text-white">Lagos, Nigeria — remote worldwide</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <dt className="mono-label text-slate-500">Status</dt>
              <dd className="flex items-center gap-2 text-white">
                <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                Open to projects &amp; roles
              </dd>
            </div>
          </dl>
          <div className="mt-7 flex flex-wrap gap-3">
            <ResumeButton />
            <Button href="/contact" variant="outline">
              Contact me
            </Button>
          </div>
          <p className="mono-label mt-6 text-slate-600">{contactChannels[0].value}</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="eyebrow">// the short version</p>
          <div className="mt-4 space-y-4 text-sm leading-8 text-slate-400">
            <p>
              I build web software end to end — the interface people see, the systems underneath
              it, and the deployment that keeps it alive. My work spans{' '}
              <span className="text-slate-200">government, hospitality, and education</span>,
              because I care less about the industry and more about building things that genuinely
              work for the people using them.
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
              )}{' '}
              — a state security institution.
              . That project shaped how I work: security as a default, performance as a given, and
              clarity as a promise.
            </p>
          </div>
        </Card>
        <Card>
          <p className="eyebrow">// currently</p>
          <div className="mt-4 space-y-4 text-sm leading-8 text-slate-400">
            <p>
              Building two more products I'm excited about:
            </p>
            <ul className="space-y-3">
              {projects
                .filter((project) => !project.featured)
                .map((project) => (
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
              And I'm always open to the next challenge — whether that's a{' '}
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
      title="Where I've shipped"
      description="Different worlds, same standards: secure, fast, and built for the people who depend on them."
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
      description="Selected work, built end to end — including a live government platform."
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

export default About;
