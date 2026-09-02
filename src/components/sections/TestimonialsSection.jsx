import { testimonials } from '../../content';
import Card from '../ui/Card';
import Section from '../ui/Section';

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
        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.name} as="figure" hover={false} className="flex h-full flex-col">
              <blockquote>
                <p className="text-sm leading-7 text-slate-300">&ldquo;{testimonial.quote}&rdquo;</p>
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
                    verify &nearr;
                  </a>
                ) : null}
              </figcaption>
            </Card>
          ))}
        </div>
      </Section>
    </section>
  );
};

export default TestimonialsSection;
