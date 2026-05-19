import { useSearchParams } from "react-router-dom";
import ContactHead from "../components/ContactHead";
import Form from "../components/Form";
import Seo from "../components/Seo";
import pricing from "../data/pricing";
import trainingPrograms from "../data/training";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("package");
  const selectedPackage = [...pricing, ...trainingPrograms].find(plan => plan.id === selectedId);
  return(
    <section data-animate="fade-up" className="section pt-28 md:pt-32 lg:pt-36">
        <Seo path="/contact" />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <ContactHead />
          <Form selectedPackage={selectedPackage} />
        </div>
    </section>
  );
};

export default Contact;
