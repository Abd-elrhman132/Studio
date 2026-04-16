import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCardEnhanced from "@/components/shared/ProjectCardEnhanced";
import { projects, categories } from "@/data/projects";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/animations/framer/variants";
import { useScrollAnimation } from "@/animations/gsap/useScrollAnimation";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  useScrollAnimation();

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <SectionWrapper>
        <SectionHeading
          title="Portfolio"
          subtitle="A curated collection of design work across branding, print, digital, and packaging."
        />

        {/* Filter tabs */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-wrap gap-4 mb-24 md:mb-32"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={fadeIn}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-500 border ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          layout
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {filtered.map((project) => (
            <ProjectCardEnhanced key={project.id} project={project} />
          ))}
        </motion.div>
      </SectionWrapper>
    </Layout>
  );
};

export default Portfolio;
