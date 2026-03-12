import myPics from "../assets/images/portfolio-img.jpg";
import InfiniteScroll from "../components/Ui/InfinteScroll";
import { Link } from "react-router-dom";

const About = () => {
  const items = [
    { content: <h3>STRATEGY</h3> },
    { content: <h3>UI DESIGN</h3> },
    { content: <h3>UX FLOWS</h3> },
    { content: <h3>REACT</h3> },
    { content: <h3>TAILWIND CSS</h3> },
    { content: <h3>NODE</h3> },
    { content: <h3>CMS</h3> },
    { content: <h3>SEO</h3> },
    { content: <h3>ANALYTICS</h3> },
    { content: <h3>ACCESSIBILITY</h3> },
  ];

  const principles = [
    {
      title: "Clarity over noise",
      description: "We sharpen the message so the website feels confident and focused."
    },
    {
      title: "Craft and performance",
      description: "Design that looks refined, backed by fast, accessible engineering."
    },
    {
      title: "Partnership mindset",
      description: "We collaborate like an in-house team, keeping feedback tight and useful."
    },
    {
      title: "Long-term support",
      description: "We stay close after launch for optimization and iteration."
    }
  ];

  return (
    <section className="section py-8 pt-28 md:pt-32 lg:pt-36 overflow-x-hidden">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div className="relative">
          <div className="absolute -top-6 left-6 w-28 h-28 rounded-full bg-accent/20 blur-2xl" />
          <img
            src={myPics}
            alt="Ashonibare Ferdinard portrait"
            className="rounded-3xl bg-primary/40 border border-secondary/40 w-full object-cover h-[420px]"
          />
        </div>

        <div className="space-y-4">
          <p className="section-kicker">Studio</p>
          <h2 className="section-title">Founder-led web development studio.</h2>
          <p className="text-myWhite/70 text-lg">
            Codeferd Digital is led by Ashonibare Ferdinard. We partner with startups and growing brands
            to design and build websites that feel premium, load fast, and convert the right audience.
          </p>
          <p className="text-myWhite/70 text-lg">
            Our work blends strategy, UI design, and modern engineering. The result is a site that looks
            sharp, works flawlessly, and is easy for your team to evolve.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            {principles.map(principle => (
              <div key={principle.title} className="card p-4">
                <h3 className="text-lg">{principle.title}</h3>
                <p className="mt-2 text-sm text-myWhite/70">{principle.description}</p>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <Link to="/contact" className="btn-primary">
              Work with the studio
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <p className="section-kicker">Capabilities</p>
          <h2 className="section-title">Skills that support the full build.</h2>
          <p className="text-myWhite/70 text-lg">
            We work across strategy, design, engineering, and optimization to deliver complete web
            experiences that scale.
          </p>
        </div>

        <div className="relative h-[320px]">
          <InfiniteScroll
            items={items}
            isTilted={true}
            tiltDirection="left"
            autoplay={true}
            autoplaySpeed={1.1}
            autoplayDirection="down"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
