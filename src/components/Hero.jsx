import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import heroShot from '../assets/images/myport.jpg';

const headlineParts = [
  { text: 'Engineering ' },
  { text: 'Digital ', accent: true },
  { text: 'Excellence.' }
];

const Hero = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(
        '.hero-char',
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.02
        }
      ).fromTo(
        '[data-hero]',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
        '-=0.45'
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    'Brand Strategy & Design',
    'Performance Web Engineering',
    'Creative Consulting',
    'Frontend Training'
  ];

  return (
    <section ref={rootRef} className="section pt-28 md:pt-36 lg:pt-40">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div className="space-y-6">
          <span className="badge" data-hero>
            Codeferd Digital
          </span>
          <div data-hero className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-myWhite/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-secondary">
              Availability
            </span>
            <span>Now booking new projects</span>
          </div>
          <h1
            aria-label="Engineering Digital Excellence."
            className="text-myWhite font-semibold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-glow"
          >
            {headlineParts.map((part, partIndex) =>
              part.text.split('').map((char, index) => (
                <span
                  key={`${partIndex}-${index}`}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <span
                    className={`hero-char inline-block will-change-transform ${
                      part.accent ? 'text-secondary' : ''
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                </span>
              ))
            )}
          </h1>
          <p data-hero className="text-myWhite/70 text-lg md:text-xl leading-relaxed max-w-2xl">
            A high-end digital studio blending strategy, design, and engineering to build premium websites
            that convert. We deliver clarity, speed, and polish in every release.
          </p>
          <div data-hero className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">
              Start a project
            </Link>
            <Link to="/work" className="btn-ghost">
              View case studies
            </Link>
          </div>
          <div data-hero className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-myWhite/60">
            <span>Lagos, Nigeria</span>
            <span className="text-secondary">Remote worldwide</span>
            <span>React + Tailwind</span>
          </div>
        </div>

        <div data-hero className="space-y-6">
          <div className="rounded-3xl border border-myWhite/10 bg-primary/70 backdrop-blur p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-myWhite/60">
              <span>Services</span>
              <span className="text-secondary">Studio focus</span>
            </div>
            <div className="mt-4 space-y-3 text-myWhite">
              {highlights.map(item => (
                <div key={item} className="flex items-center justify-between border-b border-myWhite/10 pb-3 last:border-b-0 last:pb-0">
                  <span className="text-sm">{item}</span>
                  <span className="text-xs text-myWhite/50">High impact</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-myWhite/10 bg-primary/70 backdrop-blur p-4 overflow-hidden">
            <img
              src={heroShot}
              alt="Selected case study preview"
              loading="eager"
              decoding="async"
              className="w-full h-56 object-cover rounded-2xl"
            />
            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-myWhite/60">
              <span>Featured build</span>
              <span className="text-secondary">Case study</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
