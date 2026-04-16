import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/data/projects";
import { fadeIn, hoverScale } from "@/animations/framer/variants";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!imageRef.current || prefersReducedMotion) return;

    const animation = gsap.to(imageRef.current, {
      yPercent: 12,
      ease: "none",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: imageRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      animation,
    });

    return () => {
      trigger.kill();
      animation.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <Link to={`/portfolio/${project.id}`} className="group block">
        <motion.div
          variants={hoverScale}
          whileHover="hover"
          whileTap="tap"
          className="glass-dark surface-border relative aspect-[4/5] overflow-hidden rounded-[2rem]"
        >
          <img
            ref={imageRef}
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="absolute -top-[8%] h-[116%] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/20 to-transparent" />
          <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between rounded-full border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">
              {project.category}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
              {project.year}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 p-8">
            <div className="translate-y-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                Selected project
              </p>
              <h3 className="font-heading text-3xl font-bold tracking-tighter text-white">
                {project.title}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                {project.description}
              </p>
            </div>
          </div>
        </motion.div>
        <div className="mt-8 px-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Magnetic strength={0.1}>
                <h3 className="inline-block font-heading text-2xl font-bold tracking-tighter text-foreground transition-colors duration-300 group-hover:text-primary">
                  {project.title}
                </h3>
              </Magnetic>
              <p className="mt-3 max-w-[90%] text-sm font-light leading-relaxed text-muted-foreground">
                {project.client} / {project.role}
              </p>
            </div>
            <Magnetic strength={0.4}>
              <span className="flex h-12 w-12 -translate-x-2 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] opacity-70 transition-all duration-300 group-hover:translate-x-0 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:opacity-100">
                →
              </span>
            </Magnetic>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
