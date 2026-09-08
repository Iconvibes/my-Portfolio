import { Button } from '../ui/Button';
import ResumeButton from '../ui/ResumeButton';
import ProfilePhoto from '../ui/ProfilePhoto';
import ProjectFrame from '../ui/ProjectFrame';
import useCountUp from '../../hooks/useCountUp';
import { featuredProject, projects } from '../../content';

const liveProjects = projects.filter((project) => project.status === 'live');

/* Shared animation shorthand — 250ms, no blur, no scale, just fade + slide. */
const fade = (delay = 0) => ({
  animation: `fadeInUp 0.25s ease-out ${delay}s both`,
});

const HeroSection = () => {
  const platformCount = useCountUp(liveProjects.length, { duration: 500 });
  const pageWeight = useCountUp(48, { duration: 600, decimals: 0 });
  const ttfb = useCountUp(0.1, { duration: 600, decimals: 1 });

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* Data-as-texture background: real performance stats, faintly visible */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display text-[18vw] font-extrabold leading-none tracking-tighter text-paper/[0.03] select-none">
          48KB 0.1s
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        {/* Two-column: text left, photo right on desktop */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
          {/* Left: text content */}
          <div className="max-w-2xl">
            <p className="eyebrow" style={fade(0.05)}>
              Full-stack web developer, Lagos, Nigeria
            </p>

            <h1
              className="display-ink mt-5 text-[clamp(2.25rem,6vw,5.5rem)] text-paper"
              aria-label="Ferdinard Ashonibare"
              style={fade(0.1)}
            >
              <span className="block">Ferdinard</span>
              <span className="block text-accent">Ashonibare</span>
            </h1>

            <p
              className="mt-5 max-w-xl text-base leading-7 text-secondary sm:text-lg sm:leading-8"
              style={fade(0.15)}
            >
              I design and build fast, secure web platforms for government, hospitality, education,
              real estate, and beyond. From first sketch to production deployment, end to end.
            </p>

            <div
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              style={fade(0.2)}
            >
              <Button href="/case-study" icon>
                Read the case study
              </Button>
              <Button href="/work" variant="outline">
                See all projects
              </Button>
              <ResumeButton>Resume</ResumeButton>
            </div>

            {/* Trust indicators — real, verified stats with count-up */}
            <dl
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6 sm:gap-x-12"
              style={fade(0.25)}
            >
              <div>
                <dt className="display-ink text-2xl text-accent sm:text-3xl">{platformCount}</dt>
                <dd className="mono-label mt-1 text-[0.6rem] leading-3 text-secondary sm:text-[0.65rem]">
                  Live platforms
                </dd>
              </div>
              <div>
                <dt className="display-ink text-2xl text-accent sm:text-3xl">≈{pageWeight}KB</dt>
                <dd className="mono-label mt-1 text-[0.6rem] leading-3 text-secondary sm:text-[0.65rem]">
                  So-Safe Corps page weight
                </dd>
              </div>
              <div>
                <dt className="display-ink text-2xl text-accent sm:text-3xl">≈{ttfb}s</dt>
                <dd className="mono-label mt-1 text-[0.6rem] leading-3 text-secondary sm:text-[0.65rem]">
                  Time to first byte
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: portrait */}
          <div className="flex items-start justify-center lg:justify-end" style={fade(0.12)}>
            <ProfilePhoto priority className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>

        {/* Full-bleed project screenshot with browser chrome */}
        <div className="mt-14 sm:mt-16 lg:mt-20" style={fade(0.3)}>
          <ProjectFrame project={featuredProject} eager />
          <p className="mono-label mt-4 text-center text-secondary">
            {featuredProject.name}. {featuredProject.domain}. {featuredProject.status === 'live' ? 'Live in production.' : 'Launching soon.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
