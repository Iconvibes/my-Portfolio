import Button from '../ui/Button';
import Section from '../ui/Section';

const AboutSection = () => (
  <Section
    eyebrow="About"
    title="Why I build what I build"
  >
    <div className="mt-8 max-w-3xl sm:mt-12">
      <div className="space-y-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
        <p>
          I started building websites because I wanted to prove that a developer in Lagos
          could ship work that competes with anyone in the world. So far, the evidence is
          encouraging.
        </p>
        <p>
          The most significant thing I've built is the official platform for Ogun State So-Safe
          Corps. A state security institution. Real citizens depend on it. It handles sensitive
          data. It loads in 0.1 seconds. It's the kind of project that makes you take security
          personally.
        </p>
        <p>
          That project changed how I work. Security became a default, not an afterthought.
          Performance became a promise, not a nice-to-have. And clarity, the kind that
          non-technical stakeholders can understand, became part of the deliverable.
        </p>
        <p>
          Since then I've shipped a hotel website that actually books rooms, a logistics
          landing page that turns WhatsApp into leads, a real estate platform, and an
          edtech app that helps educators track student progress. Different industries,
          same standard.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Button href="/about" icon>
          Read the full story
        </Button>
        <Button href="/work" variant="outline">
          See the work
        </Button>
      </div>
    </div>
  </Section>
);

export default AboutSection;
