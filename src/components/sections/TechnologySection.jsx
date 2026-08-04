import { technologies } from '../../content';
import Badge from '../ui/Badge';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

const TechnologySection = () => (
  <Section
    index="(05)"
    eyebrow="Stack"
    title="Tools I reach for"
    description="A focused, modern full-stack toolkit — and the judgement to pick the right tool for the job rather than the trendiest one."
  >
    <div className="mt-14 grid gap-5 md:grid-cols-3">
      {technologies.map((group, index) => (
        <Reveal
          key={group.group}
          delay={index * 80}
          className="rounded-2xl border border-line bg-ink-2 p-7"
        >
          <p className="eyebrow">
            <span className="mr-2 text-slate-500">//</span>
            {group.group}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {group.items.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default TechnologySection;
