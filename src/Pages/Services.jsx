import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import services from '../data/services';
import trainingPrograms from '../data/training';

const curriculum3Months = [
  {
    week: 'Weeks 1-4',
    topic: 'UI/UX fundamentals, Figma basics, responsive frames, and design systems'
  },
  {
    week: 'Weeks 5-8',
    topic: 'HTML structure, CSS fundamentals, Flexbox/Grid, and Bootstrap workflows'
  },
  {
    week: 'Weeks 9-12',
    topic: 'Tailwind CSS, JavaScript basics, DOM work, and React foundations'
  }
];

const curriculum6Months = [
  {
    week: 'Weeks 1-4',
    topic: 'UI/UX principles, typography, color systems, and Figma foundations'
  },
  {
    week: 'Weeks 5-8',
    topic: 'Auto layout, responsive prototypes, HTML semantics, and CSS fundamentals'
  },
  {
    week: 'Weeks 9-12',
    topic: 'Flexbox/Grid, responsive strategy, Bootstrap components, and mini project'
  },
  {
    week: 'Weeks 13-16',
    topic: 'Tailwind CSS workflows and JavaScript fundamentals'
  },
  {
    week: 'Weeks 17-20',
    topic: 'JavaScript APIs, async workflows, and React fundamentals'
  },
  {
    week: 'Weeks 21-24',
    topic: 'React patterns, routing, capstone build, and portfolio polish'
  }
];

const Services = () => {
  const trainingTopics = [
    'UI/UX',
    'Responsive Design (Figma)',
    'HTML',
    'CSS',
    'Bootstrap',
    'Tailwind CSS',
    'JavaScript',
    'ReactJS'
  ];

  return (
    <div>
      <Seo path="/services" />
      <section data-animate="fade-up" className="section pt-28 md:pt-32 lg:pt-36">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">Services</p>
          <h1 className="section-title">Everything Codeferd Digital delivers.</h1>
          <p className="text-myWhite/70 text-lg">
            Strategy, design, and development services for founders and teams who want premium web
            experiences. Explore our core offerings and training programs below.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Start a project
            </Link>
            <Link to="/#pricing" className="btn-ghost">
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <section data-animate="fade-up" className="section pt-10 md:pt-16">
        <div className="grid gap-4 md:grid-cols-2">
          {services.map(service => (
            <div key={service.title} className="card">
              <h3 className="text-xl">{service.title}</h3>
              <p className="mt-3 text-sm text-myWhite/70">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="training" data-animate="fade-up" className="section pt-16 md:pt-24 scroll-mt-28">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">Training</p>
          <h2 className="section-title">Frontend training with real-world structure.</h2>
          <p className="text-myWhite/70 text-lg">
            Learn UI/UX, responsive design in Figma, and frontend development from HTML to React. Choose
            3 or 6 months depending on your pace.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact?package=training-6-month" className="btn-ghost">
              Training inquiry
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card">
            <p className="section-kicker">What you will learn</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trainingTopics.map(topic => (
                <span key={topic} className="badge">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {trainingPrograms.map(program => (
              <div
                key={program.id}
                className={`card flex flex-col gap-4 ${
                  program.highlight ? 'border-secondary/60 bg-secondary/10' : ''
                }`}
              >
                {program.highlight && <span className="badge">{program.highlight}</span>}
                <div>
                  <h3 className="text-xl">{program.name}</h3>
                  <p className="mt-2 text-3xl font-semibold text-secondary">{program.price}</p>
                  <p className="mt-1 text-sm text-myWhite/70">{program.duration}</p>
                  <p className="mt-3 text-sm text-myWhite/70">{program.description}</p>
                </div>
                <ul className="list-disc list-inside text-sm text-myWhite/70 space-y-2">
                  {program.includes.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="rounded-xl border border-graphite/70 bg-primary/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-secondary">Expected outcomes</p>
                  <ul className="mt-2 list-disc list-inside text-sm text-myWhite/70 space-y-1">
                    {program.outcomes?.map(outcome => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                <Link to={`/contact?package=${program.id}`} className="btn-ghost mt-auto">
                  Training inquiry
                </Link>
              </div>
            ))}
          </div>
        </div>

        <details className="mt-10 rounded-2xl border border-myWhite/10 bg-primary/60 p-6">
          <summary className="text-xs uppercase tracking-[0.3em] text-secondary cursor-pointer">
            View curricula
          </summary>
          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-xl">3-Month Curriculum</h3>
              <div className="mt-4 grid gap-3">
                {curriculum3Months.map(item => (
                  <div key={item.week} className="card p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-secondary">{item.week}</p>
                    <p className="mt-2 text-sm text-myWhite/70">{item.topic}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl">6-Month Curriculum</h3>
              <div className="mt-4 grid gap-3">
                {curriculum6Months.map(item => (
                  <div key={item.week} className="card p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-secondary">{item.week}</p>
                    <p className="mt-2 text-sm text-myWhite/70">{item.topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </details>
      </section>
    </div>
  );
};

export default Services;
