import { Link } from "react-router-dom";
import Icon from "../Icon";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Iconvibes",
    icon: "github"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ferdinard-ashonibare-3a3203369",
    icon: "linkedin"
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@codeferd",
    icon: "tiktok"
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-animate="fade-up" data-animate-distance="24" className="mt-12 lg:mt-16">
      <div className="section">
        <div className="mx-auto w-full max-w-6xl rounded-3xl border border-graphite/70 bg-primary/70 px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <p className="section-kicker">Codeferd Digital</p>
              <h3 className="text-2xl font-semibold">
                Engineering digital experiences that scale.
              </h3>
              <p className="text-sm text-myWhite/70">
                Founder-led studio combining strategy, design, and performance web engineering.
              </p>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                  Available for collaborations
                </p>
                <p className="text-sm text-myWhite/60">
                  Lagos, Nigeria. Working worldwide.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="section-kicker">Explore</p>
              <div className="grid gap-2 text-sm text-myWhite/70">
                <Link to="/">Home</Link>
                <Link to="/services">Services</Link>
                <Link to="/work">Work</Link>
                <Link to="/studio">Studio</Link>
                <Link to="/contact">Contact</Link>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary w-fit">
                  Start a project
                </Link>
                <Link to="/#pricing" className="btn-ghost w-fit">
                  View pricing
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <p className="section-kicker">Connect</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="social-links"
                  >
                    <Icon name={social.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <div className="space-y-2 text-sm text-myWhite/70">
                <a
                  href="mailto:ferdinardoluwajuwonlo@gmail.com"
                  className="inline-flex items-center gap-2"
                >
                  <Icon name="envelope" className="contact-icon h-5 w-5" />
                  ferdinardoluwajuwonlo@gmail.com
                </a>
                <a
                  href="https://wa.me/2349137360986"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Icon name="whatsapp" className="contact-icon h-5 w-5" />
                  WhatsApp: +234 913 736 0986
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-graphite/60 pt-6 text-xs uppercase tracking-[0.25em] text-myWhite/60 md:flex-row md:items-center md:justify-between">
            <span>(c) {currentYear} Codeferd Digital. All rights reserved.</span>
            <span>Design + Engineering Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
