import items from "../assets/project";
import ChromaGrid from "../components/Ui/ChromaGrid";
import { Link } from "react-router-dom";
const Projects = () => {
  
  return (
    <section className="section pt-28 md:pt-32 lg:pt-36">
      <div className="max-w-3xl space-y-4">
        <p className="section-kicker">Work</p>
        <h2 className="section-title">Selected projects and experiments.</h2>
        <p className="text-myWhite/70 text-lg">
          A mix of client work and concept builds focused on clean layout, strong messaging, and modern
          interactions.
        </p>
      </div>

      <div className="relative mt-10">
        <ChromaGrid
          items={items}
          radius={320}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>

      <div className="mt-12 flex justify-center">
        <Link to="/contact" className="btn-primary">
          Start a project
        </Link>
      </div>
    </section>
  );
};

export default Projects;
