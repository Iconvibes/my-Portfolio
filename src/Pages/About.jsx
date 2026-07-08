import PageShell from '../components/layout/PageShell';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import { industries } from '../constants/content';

const About = () => (
  <div className="bg-[#070B14] text-slate-100">
    <PageShell
      eyebrow="About"
      title="A serious delivery partner for institutions and organizations with high standards."
      intro="We help organizations modernize operations through secure digital platforms, disciplined architecture, and a delivery approach built for trust."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Mission</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Build secure digital platforms that modernize operations and strengthen public confidence.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">Our work is grounded in practical outcomes: dependable systems, strong governance, and clear value for the people who depend on them.</p>
        </Card>
        <Card>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Vision</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Create software that feels precise, resilient, and aligned with long-term institutional goals.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">We design systems that remain relevant as organizations grow, expand, and respond to changing requirements.</p>
        </Card>
      </div>
    </PageShell>

    <Section eyebrow="Approach" title="A structured method for complex software delivery" description="Our approach combines product strategy, architecture, and execution to keep every engagement focused and dependable.">
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Card>
          <h3 className="text-xl font-semibold text-white">Mission-led planning</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">We begin with the real operational context and the outcomes your organization needs to achieve.</p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold text-white">Architecture-first delivery</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">Every platform is structured to support security, maintainability, and future expansion.</p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold text-white">Partnership mindset</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">We stay engaged through launch and beyond, supporting updates, optimization, and evolution.</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Industries" title="Trusted across public and private organizations" description="We support teams working in regulated, sensitive, or high-accountability environments.">
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {industries.map((industry) => (
          <Card key={industry.title}>
            <h3 className="text-xl font-semibold text-white">{industry.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{industry.description}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section eyebrow="Why organizations trust us" title="Confidence comes from clarity, discipline, and execution" description="Organizations choose Codeferd Digital because our work is designed to be dependable, professional, and sustainable.">
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Leadership</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Senior-led delivery from concept to launch</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">Projects are guided by experienced leadership that understands both business priorities and technical implementation.</p>
        </Card>
        <Card>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Reliability</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Measured delivery with clear communication</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">We keep implementation focused, transparent, and aligned to the needs of stakeholders at every stage.</p>
        </Card>
      </div>
    </Section>
  </div>
);

export default About;
