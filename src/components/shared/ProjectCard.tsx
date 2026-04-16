import { Link } from "react-router-dom";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link to={`/portfolio/${project.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-card aspect-[4/3]">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">
              {project.category}
            </p>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {project.title}
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">
          {project.category}
        </p>
        <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
