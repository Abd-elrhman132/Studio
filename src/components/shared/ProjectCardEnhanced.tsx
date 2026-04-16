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

interface ProjectCardEnhancedProps {
  project: Project;
}

const ProjectCardEnhanced = ({ project }: ProjectCardEnhancedProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!imageRef.current || prefersReducedMotion) return;

    const animation = gsap.to(imageRef.current, {
      yPercent: 12,
      ease: "none",
      paused: true,
      force3D: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: imageRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.4, // tighter scrub for performance
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
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      className="will-change-[transform,opacity]"
    >
      <Link to={`/portfolio/${project.id}`} className="group block">
        <motion.div
          variants={hoverScale}
          whileHover="hover"
          whileTap="tap"
          className="relative aspect-[3/2] overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/[0.05]"
        >
          <img
            ref={imageRef}
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute -top-[10%] h-[120%] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 will-change-transform"
          />
          <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between">
            <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.4em] text-white/90 backdrop-blur-md">
              {project.category}
            </div>
            <div className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/50">
              {project.year}
            </div>
          </div>
        </motion.div>

        <div className="mt-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-heading text-2xl font-bold tracking-tighter text-foreground leading-none">
                {project.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground max-w-sm line-clamp-2">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {project.client}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  /
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {project.role}
                </span>
              </div>
            </div>

            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] transition-all duration-500 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCardEnhanced;
