import { testimonials } from '../../content';
import Card from '../ui/Card';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

// Reputation evidence (Search Quality Evaluator Guidelines §3.3, §7.2).
// Renders nothing while src/content/testimonials.js is empty — only real,
// consensual client quotes should ever appear here.
const TestimonialsSection = ({ index = '(07)' }) => {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-grid-ink bg-ink">
      <Section
        index={index}
        eyebrow="What people say"
        title="Trusted by the people I build for"
        description="Working with clients is a relationship, not a transaction. Here's what they say about it."
      >
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 80}>
              <Card as="figure" hover={false} className="flex h-full flex-col">
                <blockquote>
                  <p className="text-sm leading-7 text-slate-300">“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 flex items-end justify-between gap-3 border-t border-line-soft pt-4">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="mono-label mt-1 text-slate-500">{testimonial.role}</p>
                  </div>
                  {testimonial.href ? (
                    <a
                      href={testimonial.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono-label text-slate-600 underline-offset-4 transition hover:text-signal hover:underline"
                    >
                      verify ↗
                    </a>
                  ) : null}
                </figcaption>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </section>
  );
};

export default TestimonialsSection;
