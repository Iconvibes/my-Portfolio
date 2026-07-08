import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { faqItems, industries, insights, processSteps, solutions, technologies, trustLogos, whyCodeferd } from '../constants/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Home = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="bg-[#070B14] text-slate-100">
      <section className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-sky-400">Codeferd Digital</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-8xl">
            Building Secure Digital Platforms That Power Organizations.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
            Codeferd Digital designs secure software for governments, institutions, security organizations and ambitious businesses.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">Schedule Consultation</Button>
            <Button href="/case-study" variant="secondary">View Case Study</Button>
          </div>
        </motion.div>
      </section>

      <Section eyebrow="Trusted By" title="Selected partners and institutions" description="We work with organizations that require trust, clarity, and dependable execution.">
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trustLogos.map((logo) => (
            <Card key={logo} className="flex items-center justify-center py-8 text-lg font-semibold uppercase tracking-[0.2em] text-slate-200">
              {logo}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Industries" title="Built for high-trust environments" description="We create platforms that support regulated operations, sensitive missions, and long-term growth.">
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <Card key={industry.title}>
              <h3 className="text-xl font-semibold text-white">{industry.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{industry.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Solutions" title="Enterprise systems that reduce friction and increase confidence" description="Every engagement is shaped around operational reality, scalability, and measurable business value.">
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {solutions.map((solution) => (
            <Card key={solution.title}>
              <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{solution.description}</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p><span className="font-semibold text-white">Business value:</span> {solution.benefits}</p>
                <p><span className="font-semibold text-white">Ideal clients:</span> {solution.ideal}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
        <Card className="overflow-hidden border-sky-400/20 bg-[linear-gradient(135deg,rgba(37,99,235,0.16),rgba(17,24,39,0.95))] p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Featured Case Study</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Building the Official Digital Platform for Ogun State So-Safe Corps</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">A secure, public-facing platform built to strengthen institutional presence and improve service engagement.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/case-study">Read Full Case Study</Button>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#070B14]/80 p-6">
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex justify-between border-b border-white/10 pb-3"><span>Problem</span><span className="text-white">Institutional modernization</span></div>
                <div className="flex justify-between border-b border-white/10 pb-3"><span>Solution</span><span className="text-white">Secure platform design</span></div>
                <div className="flex justify-between border-b border-white/10 pb-3"><span>Technology</span><span className="text-white">React + Node</span></div>
                <div className="flex justify-between"><span>Outcome</span><span className="text-white">Greater public confidence</span></div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <Section eyebrow="Why Codeferd" title="Reasoned delivery for organizations that value precision" description="We combine architecture, product thinking, and execution discipline to create systems that remain dependable over time.">
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {whyCodeferd.map((item) => (
            <Card key={item.title}>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Process" title="A disciplined path from discovery to support" description="Every engagement follows a structured approach that keeps stakeholders aligned and delivery predictable.">
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {processSteps.map((step, index) => (
            <Card key={step.title}>
              <p className="text-sm font-medium text-sky-400">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Technology" title="Modern tooling, carefully applied" description="We use proven technologies that suit the scale, security, and delivery requirements of each platform.">
        <div className="mt-12 flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
              {tech}
            </span>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Questions organizations commonly ask" description="Clear answers for teams evaluating a partner for secure digital transformation.">
        <div className="mt-12 space-y-4">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-white/10 bg-[#111827] p-6">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-white">
                {item.question}
                <span className="text-sky-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
        <Card className="border-sky-400/20 bg-[#111827] p-8 lg:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Start a conversation</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Let’s build something exceptional.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">Whether you need a public platform, secure system, or enterprise portal, we can help you move with confidence.</p>
            </div>
            <Button href="/contact" className="w-full justify-center lg:w-auto">Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
