import items from "../assets/project";
import ChromaGrid from "../components/Ui/ChromaGrid";
const Projects = () => {
  
  return (
    <div className="relative mt-20">
      <ChromaGrid
        items={items}
        radius={300}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
      />
    </div>
  );
};

export default Projects;
