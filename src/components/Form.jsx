const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = document.getElementById("contact-method").value;
    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const email = document.querySelector(
      'input[placeholder="Your Email"]'
    ).value;
    const message = document.querySelector(
      'textarea[placeholder="Your Message"]'
    ).value;

    let url = "";
    let msg = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

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
    <div className="mb-6 mt-16 lg:mt-24 w-full lg:w-[50%] border-2 border-amber-300/40 px-6 pb-6 rounded-2xl">
      <h5 class="text-gray-400 font-medium text-center text-xl font-roboto uppercase mt-6">Get in touch</h5>

      <form action="#" className="mt-6 flex flex-col gap-3 w-full">
        <label htmlFor="contact-method" className="inline-block self-start">
          Contact Method
        </label>
        <select
          id="contact-method"
          name="contact-method"
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary rounded-lg text-gray-300    focus:outline-none focus:border-secondary"
          required
        >
          <option value="" disabled selected>
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
          type="text"
          placeholder="Your Name"
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary rounded-lg text-gray-300 focus:outline-none focus:border-secondary"
          required
        ></input>

        <label htmlFor="email" className="inline-block self-start">
          Email
        </label>
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary rounded-lg text-gray-300 focus:outline-none focus:border-secondary"
        ></input>

        <label htmlFor="message" className="inline-block self-start">
          Message
        </label>
        <textarea
          placeholder="Your Message"
          className="p-3 mb-2 w-full bg-primary/40 border border-secondary rounded-lg text-gray-300 focus:outline-none focus:border-secondary h-32 resize-none"
          required
        ></textarea>

        <button
          onClick={handleSubmit}
          type="submit"
          className="p-3 bg-secondary text-myBlack font-bold text-lg border-2 border-myBlack rounded-lg hover:bg-secondary/60 hover:scale-110 hover:cursor-pointer w-full sm:w-auto lg:w-[50%] lg:mx-auto"
        >
          Send Message <i className="fa-solid fa-envelope ml-2"></i>
        </button>
      </form>
    </div>
  );
};

export default Form;
