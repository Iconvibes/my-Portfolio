import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import workItems from '../assets/project';
import pricing from '../data/pricing';

const Home = () => {
  const services = [
    {
      title: 'Brand Strategy & Design',
      description:
        'We build visual identities that command attention. From high-end logo systems to comprehensive brand guidelines, we ensure your business looks as professional as it operates.'
    },
    {
      title: 'Performance Web Engineering',
      description:
        'We develop bespoke web applications using React and Tailwind CSS. Our focus is on atomic design, lightning-fast load speeds, and seamless user transitions.'
    },
    {
      title: 'Creative Consulting',
      description:
        'Digital transformation tailored to your goals. We bridge the gap between complex technical requirements and intuitive user experiences to drive business growth.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Align on goals, audiences, and the story your site needs to tell.'
    },
    {
      step: '02',
      title: 'Design',
      description: 'Wireframes and high-fidelity UI so you can approve the direction fast.'
    },
    {
      step: '03',
      title: 'Build',
      description: 'Component-driven development, responsive QA, and performance checks.'
    },
    {
      step: '04',
      title: 'Launch',
      description: 'Deploy, measure, and iterate with analytics and clear next steps.'
    }
  ];

  const differentiators = [
    {
      title: 'Positioning first',
      description: 'We shape the message before the pixels, so the site sells the story.'
    },
    {
      title: 'Senior execution',
      description: 'Founder-led delivery with tight feedback loops and clean handoff.'
    },
    {
      title: 'Systems mindset',
      description: 'Reusable components and scalable UI so the site grows with you.'
    }
  ];

  const featured = workItems.slice(0, 3);

  return (
    <div>
      <Hero />

      <section id="services" className="section pt-16 md:pt-24 scroll-mt-28">
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
          <div className="max-w-xl space-y-4">
            <p className="section-kicker">Services</p>
            <h2 className="section-title">End-to-end web development for modern brands.</h2>
            <p className="text-myWhite/70 text-lg">
              From positioning to performance, we build sites that look sharp and move customers to action.
              Clear scope, focused milestones, and a process that respects your time.
            </p>
            <Link to="/#process" className="btn-ghost">
              See the process
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full lg:max-w-4xl">
            {services.map(service => (
              <div key={service.title} className="card">
                <h3 className="text-xl">{service.title}</h3>
                <p className="mt-3 text-sm text-myWhite/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section pt-16 md:pt-24 scroll-mt-28">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">Pricing</p>
          <h2 className="section-title">Clear packages with room to scale.</h2>
          <p className="text-myWhite/70 text-lg">
            Transparent starting points for the most requested builds. Final pricing depends on scope,
            content, and timeline.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricing.map(plan => (
            <div
              key={plan.id}
              className={`card flex flex-col gap-4 ${
                plan.highlight ? 'border-secondary/60 bg-secondary/10' : ''
              }`}
            >
              {plan.highlight && <span className="badge">{plan.highlight}</span>}
              <div>
                <h3 className="text-xl">{plan.name}</h3>
                <p className="mt-2 text-3xl font-semibold text-secondary">{plan.price}</p>
                <p className="mt-3 text-sm text-myWhite/70">{plan.description}</p>
              </div>
              <ul className="list-disc list-inside text-sm text-myWhite/70 space-y-2">
                {plan.includes.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to={`/contact?package=${plan.id}`} className="btn-ghost mt-auto">
                Request this package
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="section pt-16 md:pt-24 scroll-mt-28">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">Process</p>
          <h2 className="section-title">A focused, transparent workflow.</h2>
          <p className="text-myWhite/70 text-lg">
            We move fast with clear checkpoints. You always know what is shipping next and why it matters.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {process.map(item => (
            <div key={item.step} className="card">
              <p className="text-secondary text-sm tracking-[0.3em]">{item.step}</p>
              <h3 className="mt-3 text-xl">{item.title}</h3>
              <p className="mt-3 text-sm text-myWhite/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pt-16 md:pt-24">
        <div className="grid gap-4 md:grid-cols-3">
          {differentiators.map(item => (
            <div key={item.title} className="card">
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-3 text-sm text-myWhite/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="section pt-16 md:pt-24 scroll-mt-28">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="section-kicker">Work</p>
            <h2 className="section-title">Selected projects and prototypes.</h2>
            <p className="text-myWhite/70 text-lg">
              A mix of client work and concept builds that show the range of layout, interaction, and
              performance we deliver.
            </p>
          </div>
          <Link to="/work" className="btn-ghost">
            View all work
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map(item => (
            <article key={item.title} className="card group overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full rounded-xl object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="mt-4">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-myWhite/70">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={item.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-sm"
                  >
                    GitHub
                  </a>
                  <a
                    href={item.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    Live demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section py-20">
        <div className="card text-center border-secondary/40 bg-secondary/10">
          <p className="section-kicker">Ready to build</p>
          <h2 className="section-title mt-3">Let us shape your next release.</h2>
          <p className="mt-4 text-myWhite/70 text-lg max-w-2xl mx-auto">
            Tell us about your goals, timeline, and scope. We will respond with a clear plan and next steps.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/contact" className="btn-primary">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
