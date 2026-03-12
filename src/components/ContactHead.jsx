const ContactHead = () => {
  return (
    <div data-animate="fade-up" className="space-y-6">
      <div className="space-y-3">
        <p className="section-kicker">Contact</p>
        <h2 className="section-title">Start a project.</h2>
        <p className="text-myWhite/70 text-lg">
          Tell us about your goals, timeline, and scope. We will reply with a focused plan and next steps.
        </p>
      </div>

      <div className="card space-y-4">
        <p className="text-myWhite/80 text-lg">
          Have an awesome project in mind?{" "}
          <a href="#contact-form" className="text-secondary underline underline-offset-4">
            Let us discuss
          </a>
        </p>

        <div className="flex items-center gap-3">
          <i className="fa-solid fa-envelope contact-icon"></i>
          <p className="text-myWhite/70">ferdinardoluwajuwonlo@gmail.com</p>
        </div>
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-phone contact-icon"></i>
          <p className="text-myWhite/70">+2349137360986</p>
        </div>
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-location-dot contact-icon"></i>
          <p className="text-myWhite/70">Lagos, Nigeria. Working worldwide.</p>
        </div>
      </div>
    </div>
  )
}

export default ContactHead
