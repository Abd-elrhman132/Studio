import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useScrollAnimation } from "@/animations/gsap/useScrollAnimation";
import { motion } from "framer-motion";
import { fadeIn } from "@/animations/framer/variants";

const CaseStudy = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  useScrollAnimation();

  if (!project) {
    return (
      <Layout>
        <SectionWrapper>
          <div className="text-center py-20">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Project not found
            </h2>
            <Button asChild variant="outline">
              <Link to="/portfolio">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
              </Link>
            </Button>
          </div>
        </SectionWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <SectionWrapper>
        <motion.div variants={fadeIn} initial="initial" animate="animate">
          <Button asChild variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
            <Link to="/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
          </Button>

          <div className="max-w-4xl reveal">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-primary" />
              <p className="hidden text-primary text-xs font-bold uppercase tracking-[0.4em]">
                {project.category} — {project.year}
              </p>
            </div>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.4em]">
              {`${project.category} / ${project.year}`}
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[0.9]">
              {project.title}
            </h1>
            <p className="mt-8 text-muted-foreground text-xl font-light leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* Meta */}
          <div className="reveal mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-b border-white/5 py-12">
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-3">Client</p>
              <p className="text-lg text-foreground font-light">{project.client}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-3">Role</p>
              <p className="text-lg text-foreground font-light">{project.role}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-3">Year</p>
              <p className="text-lg text-foreground font-light">{project.year}</p>
            </div>
          </div>

          {/* Overview */}
          <div className="reveal mt-20 max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6 tracking-tight">Overview</h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-light">{project.overview}</p>
          </div>

          {/* Images */}
          <div className="mt-24 space-y-12 lg:space-y-20">
            {project.images.map((img, i) => (
              <div key={i} className="reveal rounded-2xl overflow-hidden bg-card shadow-2xl">
                <img
                  src={img}
                  alt={`${project.title} — image ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>
    </Layout>
  );
};

export default CaseStudy;
