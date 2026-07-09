import { Button } from '../ui/Button';
import { Field, TextareaField } from '../ui/Field';

const ContactForm = () => (
  <form name="contact" method="POST" data-netlify="true" netlify-honeypot="company-url" className="space-y-5">
    <input type="hidden" name="form-name" value="contact" />
    <p className="hidden">
      <label>
        Do not fill this out: <input name="company-url" tabIndex="-1" autoComplete="off" />
      </label>
    </p>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="full-name" name="name" label="Full name" placeholder="Your name" required />
      <Field id="work-email" name="email" type="email" label="Work email" placeholder="you@organization.com" required />
    </div>
    <Field id="organization" name="organization" label="Organization" placeholder="Institution or company" />
    <TextareaField
      id="project-details"
      name="message"
      label="Project details"
      placeholder="Tell us about the platform, audience, and goals."
      required
    />
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <Button type="submit">Send Inquiry</Button>
      <Button href="/case-study" variant="secondary">
        View Case Study
      </Button>
    </div>
  </form>
);

export default ContactForm;
