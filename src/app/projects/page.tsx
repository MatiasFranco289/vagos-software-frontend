import ProjectCard from "@/components/ProjectCard/ProjectCard";

export default function Projects() {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="bg-dark-300 w-5/6 mt-[100px] p-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Proyectos</h1>

          <input type="text" />
        </div>

        <div className="flex flex-wrap justify-around mt-12">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}
