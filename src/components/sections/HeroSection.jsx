import { Button } from '../ui/Button';
import ResumeButton from '../ui/ResumeButton';
import ProjectFrame from '../ui/ProjectFrame';
import TerminalCard from './TerminalCard';
import { featuredProject, projects } from '../../content';

const liveProjects = projects.filter((project) => project.status === 'live');

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="bg-grid-ink absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        {/* Hook headline: achievement first */}
        <div className="max-w-3xl">
          <p className="eyebrow">Full-stack web developer, Lagos, Nigeria</p>

          <h1
            className="display-ink mt-5 text-[clamp(2.25rem,6vw,5.5rem)] text-white"
            aria-label="Ferdinard Ashonibare"
          >
            <span className="block">Ferdinard</span>
            <span className="block text-signal">Ashonibare</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            I design and build fast, secure web platforms for government, hospitality, education,
            real estate, and beyond. From first sketch to production deployment, end to end.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button href="/case-study" icon>
              Read the case study
            </Button>
            <Button href="/work" variant="outline">
              See all projects
            </Button>
            <ResumeButton>Resume</ResumeButton>
          </div>

          {/* Trust indicators */}
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6 sm:gap-x-12">
            <div>
              <dt className="display-ink text-2xl text-signal sm:text-3xl">{liveProjects.length}</dt>
              <dd className="mono-label mt-1 text-[0.6rem] leading-3 text-slate-500 sm:text-[0.65rem]">
                Live platforms
              </dd>
            </div>
            <div>
              <dt className="display-ink text-2xl text-signal sm:text-3xl">{'≈48KB'}</dt>
              <dd className="mono-label mt-1 text-[0.6rem] leading-3 text-slate-500 sm:text-[0.65rem]">
                So-Safe Corps page weight
              </dd>
            </div>
            <div>
              <dt className="display-ink text-2xl text-signal sm:text-3xl">{'≈0.1s'}</dt>
              <dd className="mono-label mt-1 text-[0.6rem] leading-3 text-slate-500 sm:text-[0.65rem]">
                Time to first byte
              </dd>
            </div>
          </dl>
        </div>

        {/* Terminal card */}
        <div className="mt-8 lg:mt-10">
          <TerminalCard />
        </div>

        {/* Full-bleed project screenshot with browser chrome */}
        <div className="mt-10 lg:mt-14">
          <ProjectFrame project={featuredProject} eager />
          <p className="mono-label mt-4 text-center text-slate-600">
            {featuredProject.name}. {featuredProject.domain}. {featuredProject.status === 'live' ? 'Live in production.' : 'Launching soon.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
