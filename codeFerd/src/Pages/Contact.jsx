import ContactHead from "../components/ContactHead";
import Form from "../components/Form";

const Contact = () => {
  return(
    <section  className="flex flex-col lg:flex-row items-center justify-around w-[90%] mx-auto ">
        <ContactHead />
        <Form />
    </section>
  );
};

export default Contact;