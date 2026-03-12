import { useSearchParams } from "react-router-dom";
import ContactHead from "../components/ContactHead";
import Form from "../components/Form";
import pricing from "../data/pricing";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("package");
  const selectedPackage = pricing.find(plan => plan.id === selectedId);
  return(
    <section className="section pt-28 md:pt-32 lg:pt-36">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <ContactHead />
          <Form selectedPackage={selectedPackage} />
        </div>
    </section>
  );
};

export default Contact;
