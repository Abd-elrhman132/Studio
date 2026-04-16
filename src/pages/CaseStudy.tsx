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
            <div className="inline-flex items-center gap-3 mb-10">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">
                {project.category} / {project.year}
              </p>
            </div>
            <h1 className="font-heading text-6xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tighter text-foreground leading-[0.85]">
              {project.title}
            </h1>
            <p className="mt-12 text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* Meta */}
          <div className="reveal mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-white/5 py-16">
            <div>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4">Client</p>
              <p className="text-xl text-foreground font-light">{project.client}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4">Role</p>
              <p className="text-xl text-foreground font-light">{project.role}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4">Year</p>
              <p className="text-xl text-foreground font-light">{project.year}</p>
            </div>
          </div>

          {/* Overview */}
          <div className="reveal mt-24 max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 tracking-tighter uppercase">Overview</h2>
            <p className="text-muted-foreground text-xl leading-relaxed font-light">{project.overview}</p>
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
