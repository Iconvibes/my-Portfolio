const Form = ({ selectedPackage }) => {
  const packageMessage = selectedPackage
    ? `I'm interested in the ${selectedPackage.name} package (${selectedPackage.price}).`
    : '';
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const method = data.get("contact-method");
    const name = data.get("name");
    const email = data.get("email");
    const company = data.get("company");
    const projectType = data.get("project-type");
    const message = data.get("message");

    const packageLine = selectedPackage
      ? `Package: ${selectedPackage.name} (${selectedPackage.price})${selectedPackage.duration ? ` - ${selectedPackage.duration}` : ''}`
      : "Package: Not selected";
    let url = "";
    let msg = `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nProject: ${projectType || "N/A"}\n${packageLine}\nMessage: ${message}`;

    switch (method) {
      case "whatsapp":
        url = `https://wa.me/2349137360986?text=${encodeURIComponent(msg)}`;
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = url;
          return;
        } else {
          window.open(url, "_blank");
          setTimeout(() => {
            alert(
              "If WhatsApp did not open, please try on your mobile device or check your browser settings."
            );
          }, 1000);
          return;
        }
      case "email":
        url = `mailto:ferdinardoluwajuwonlo@gmail.com?subject=Portfolio Contact&body=${encodeURIComponent(
          msg
        )}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/in/ferdinard-ashonibare-3a3203369`;
        alert("Please send your message via LinkedIn after connecting!");
        break;
      case "facebook":
        url = `https://www.facebook.com/your-facebook-username/`;
        alert("Please send your message via Facebook after connecting!");
        break;
      case "tiktok":
        url = `https://www.tiktok.com/@codeferd`;
        alert("Please send your message via TikTok after connecting!");
        break;
      default:
        alert("Please select a contact method.");
        return;
    }

    window.open(url, "_blank");
  };

  return (
    <div id="contact-form" className="card w-full lg:w-[95%]">
      <h5 className="text-secondary font-medium text-center text-xs uppercase tracking-[0.3em]">Project brief</h5>

      <form key={selectedPackage?.id || 'default'} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 w-full">
        {selectedPackage && (
          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-4 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">Selected package</p>
              <h3 className="text-lg">{selectedPackage.name}</h3>
              <p className="text-2xl font-semibold text-secondary">{selectedPackage.price}</p>
              {selectedPackage.duration && (
                <p className="text-sm text-myWhite/70">{selectedPackage.duration}</p>
              )}
            </div>
            <p className="text-sm text-myWhite/70">{selectedPackage.description}</p>
            <ul className="list-disc list-inside text-sm text-myWhite/70 space-y-1">
              {selectedPackage.includes.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <label htmlFor="contact-method" className="inline-block self-start">
          Preferred contact method
        </label>
        <select
          id="contact-method"
          name="contact-method"
          defaultValue=""
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary/40 rounded-lg text-myWhite/80 focus:outline-none focus:border-secondary"
          required
        >
          <option value="" disabled>
            Select a method
          </option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="linkedin">LinkedIn</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">TikTok</option>
        </select>

        <label htmlFor="name" className="inline-block self-start">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary/40 rounded-lg text-myWhite/80 focus:outline-none focus:border-secondary"
          required
        ></input>

        <label htmlFor="email" className="inline-block self-start">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your Email"
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary/40 rounded-lg text-myWhite/80 focus:outline-none focus:border-secondary"
          required
        ></input>

        <label htmlFor="company" className="inline-block self-start">
          Company or Brand
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Company Name"
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary/40 rounded-lg text-myWhite/80 focus:outline-none focus:border-secondary"
        ></input>

        <label htmlFor="project-type" className="inline-block self-start">
          Project Type
        </label>
        <select
          id="project-type"
          name="project-type"
          defaultValue={selectedPackage?.projectType || ""}
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary/40 rounded-lg text-myWhite/80 focus:outline-none focus:border-secondary"
        >
          <option value="" disabled>
            Select a project type
          </option>
          <option value="one-page">One-page website</option>
          <option value="ecommerce-whatsapp">Ecommerce (WhatsApp)</option>
          <option value="full-ecommerce">Full ecommerce platform</option>
          <option value="custom-website">Custom website</option>
          <option value="training">Frontend training</option>
        </select>

        <label htmlFor="message" className="inline-block self-start">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          defaultValue={packageMessage}
          placeholder="Share your goals, timeline, and scope"
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary/40 rounded-lg text-myWhite/80 focus:outline-none focus:border-secondary h-32 resize-none"
          required
        ></textarea>

        <button
          type="submit"
          className="btn-primary w-full sm:w-auto lg:w-[60%] lg:mx-auto"
        >
          Send Message <i className="fa-solid fa-envelope ml-2"></i>
        </button>
      </form>
    </div>
  );
};

export default Form;
