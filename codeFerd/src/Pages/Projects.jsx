const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "Description of project 1",
      technologies: ["React", "Tailwind CSS", "Node.js"],
      githubLink: "https://github.com/yourusername/project1",
      liveLink: "https://project1.com"
    },
    // Add more projects here
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
            <p className="mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-opacity-20 rounded text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" 
                 className="text-blue-400 hover:text-blue-300">
                GitHub
              </a>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" 
                 className="text-green-400 hover:text-green-300">
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;