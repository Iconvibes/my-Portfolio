import { technologies } from '../../content';
import Badge from '../ui/Badge';
import Section from '../ui/Section';

const TechnologySection = () => (
  <Section
    index="(05)"
    eyebrow="Stack"
    title="Tools I reach for"
    description="A focused, modern full-stack toolkit. The judgment to pick the right tool for the job, not the trendiest one."
  >
    <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
      {technologies.map((group) => (
        <div
          key={group.group}
          className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-7"
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
        </div>
      ))}
    </div>
  </Section>
);

export default TechnologySection;
