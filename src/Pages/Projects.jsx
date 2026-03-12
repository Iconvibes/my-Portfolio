import items from "../assets/project";
import { Link } from "react-router-dom";
const Projects = () => {
  
  return (
    <section className="section pt-28 md:pt-32 lg:pt-36">
      <div data-animate="fade-up" className="max-w-3xl space-y-4">
        <p className="section-kicker">Case Studies</p>
        <h2 className="section-title">Projects that showcase strategy, design, and build.</h2>
        <p className="text-myWhite/70 text-lg">
          Each case study highlights the challenge, the build, and the outcome behind the experience.
        </p>
      </div>

      <div className="mt-10 grid gap-6">
        {items.map((item, index) => {
          const isReversed = index % 2 === 1;
          return (
            <article
              key={item.title}
              data-animate={isReversed ? "fade-left" : "fade-right"}
              data-animate-distance="90"
              data-animate-rotate={isReversed ? "-4" : "4"}
              data-animate-scale="0.94"
              className="card overflow-hidden"
            >
              <div className={`grid gap-8 items-center lg:grid-cols-[1.1fr_0.9fr] ${isReversed ? 'lg:grid-cols-[0.9fr_1.1fr]' : ''}`}>
                <div className={`${isReversed ? 'lg:order-2' : ''} relative`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 w-full h-56 md:h-72 lg:h-full object-cover rounded-2xl border border-myWhite/10"
                  />
                </div>

                <div className={`${isReversed ? 'lg:order-1' : ''} space-y-4`}>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge">{item.category || 'Development'}</span>
                    {item.stack?.map(stackItem => (
                      <span key={stackItem} className="badge">
                        {stackItem}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="text-myWhite/70">{item.description}</p>

                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-myWhite/10 bg-primary/60 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-secondary">Challenge</p>
                      <p className="mt-2 text-sm text-myWhite/70">{item.challenge}</p>
                    </div>
                    <div className="rounded-xl border border-myWhite/10 bg-primary/60 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-secondary">Build</p>
                      <p className="mt-2 text-sm text-myWhite/70">{item.build}</p>
                    </div>
                    <div className="rounded-xl border border-myWhite/10 bg-primary/60 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-secondary">Role</p>
                      <p className="mt-2 text-sm text-myWhite/70">{item.role}</p>
                    </div>
                    <div className="rounded-xl border border-myWhite/10 bg-primary/60 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-secondary">Deliverables</p>
                      <ul className="mt-2 list-disc list-inside text-sm text-myWhite/70 space-y-1">
                        {item.deliverables?.map(deliverable => (
                          <li key={deliverable}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-myWhite/10 bg-primary/60 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-secondary">Outcome</p>
                      <p className="mt-2 text-sm text-myWhite/70">{item.outcome}</p>
                      {item.impact && (
                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-secondary/80">
                          {item.impact}
                        </p>
                      )}
                    </div>
                    <div className="rounded-xl border border-myWhite/10 bg-primary/60 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-secondary">Results</p>
                      <ul className="mt-2 list-disc list-inside text-sm text-myWhite/70 space-y-1">
                        {item.results?.map(result => (
                          <li key={result}>{result}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={item.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-sm"
                    >
                      View live
                    </a>
                    <a
                      href={item.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-sm"
                    >
                      View code
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Link to="/contact" className="btn-primary">
          Start a project
        </Link>
      </div>
    </section>
  );
};

export default Projects;
