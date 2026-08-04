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
    <p className="eyebrow">// start a project</p>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="full-name" name="name" label="Full name" placeholder="Your name" required />
      <Field id="work-email" name="email" type="email" label="Email" placeholder="you@company.com" required />
    </div>
    <Field id="project-type" name="project-type" label="What are you looking for?" placeholder="e.g. Website, web app, full-time role" />
    <TextareaField
      id="project-details"
      name="message"
      label="Project details"
      placeholder="Tell me about the project, the audience, and the goal."
      required
    />
    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
      <Button type="submit" icon>
        Send message
      </Button>
      <p className="mono-label text-slate-500">no spam — ever</p>
    </div>
  </form>
);

export default ContactForm;
