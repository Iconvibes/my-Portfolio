import { useEffect, useState } from "react";
import myPics from "../assets/images/portfolio-img-optimized.jpg";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const About = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const resumePdf = "/resume/resume.pdf";
  const highlights = [
    "Founder, Codeferd Digital",
    "Frontend Engineering & UI/UX",
    "React, JavaScript, Tailwind CSS",
    "Responsive Web Design (Figma)",
    "Lagos, Nigeria - Remote worldwide"
  ];
  const capabilities = [
    {
      title: "Strategy & Direction",
      items: ["Positioning", "Messaging", "Content structure", "Launch planning"]
    },
    {
      title: "UI/UX & Design",
      items: ["Figma systems", "Responsive design", "Prototyping", "Design handoff"]
    },
    {
      title: "Frontend Engineering",
      items: ["HTML/CSS/JS", "React interfaces", "Tailwind systems", "Accessibility"]
    },
    {
      title: "Optimization & Growth",
      items: ["Performance tuning", "SEO basics", "Analytics", "Conversion flow"]
    }
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

  useEffect(() => {
    document.body.style.overflow = isResumeOpen ? "hidden" : "";
    document.documentElement.style.overflow = isResumeOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isResumeOpen]);

  return (
    <section className="section py-8 pt-28 md:pt-32 lg:pt-36 overflow-x-hidden">
      <Seo path="/studio" />
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div className="relative">
          <div className="absolute -top-6 left-6 w-28 h-28 rounded-full bg-accent/20 blur-2xl" />
          <img
            src={myPics}
            alt="Ashonibare Ferdinard portrait"
            loading="lazy"
            decoding="async"
            className="rounded-3xl bg-primary/40 border border-secondary/40 w-full object-cover object-top h-[420px]"
          />
        </div>

        <div className="space-y-4">
          <p className="section-kicker">Studio</p>
          <h1 className="section-title">Founder-led web development studio.</h1>
          <p className="text-myWhite/70 text-lg">
            Codeferd Digital is led by{" "}
            <a
              href={resumePdf}
              download
              onClick={(event) => {
                if (window.matchMedia("(min-width: 768px)").matches) {
                  event.preventDefault();
                  setIsResumeOpen(true);
                }
              }}
              className="text-secondary underline underline-offset-4"
            >
              Ashonibare Ferdinard
            </a>
            . We partner with startups and growing brands to design and build websites that feel premium,
            load fast, and convert the right audience.
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
              Start a project
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <p className="section-kicker">Capabilities</p>
          <h2 className="section-title">Skills that support the full build.</h2>
          <p className="text-myWhite/70 text-lg">
            We work across strategy, design, engineering, and optimization to deliver complete web
            experiences that scale.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {capabilities.map(capability => (
            <div key={capability.title} className="card p-4">
              <h3 className="text-lg">{capability.title}</h3>
              <ul className="mt-3 list-disc list-inside text-sm text-myWhite/70 space-y-2">
                {capability.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition ${
          isResumeOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsResumeOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-3xl transform bg-primary/95 border-l border-myWhite/10 transition duration-300 ${
            isResumeOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col p-6 overflow-y-auto overscroll-contain">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Resume</p>
                <h3 className="text-2xl">Ashonibare Ferdinard</h3>
                <p className="text-sm text-myWhite/70 mt-2">
                  Highlights, preview, and download in one place.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsResumeOpen(false)}
                className="text-xs uppercase tracking-[0.3em] text-myWhite/70"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="card p-4">
                <p className="section-kicker">Highlights</p>
                <ul className="mt-3 list-disc list-inside text-sm text-myWhite/70 space-y-2">
                  {highlights.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-myWhite/10 bg-primary/60 overflow-hidden h-[520px] md:h-[600px]">
                <iframe title="Resume Preview" src={resumePdf} className="w-full h-full" />
              </div>
            </div>

            <div className="mt-auto pt-6 flex flex-wrap gap-3">
              <a href={resumePdf} className="btn-ghost" target="_blank" rel="noopener noreferrer">
                Open PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
