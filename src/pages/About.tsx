import Layout from "@/components/layout/Layout";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import { useScrollAnimation } from "@/animations/gsap/useScrollAnimation";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/animations/framer/variants";

const skills = [
  "Brand Identity",
  "Typography",
  "Editorial Design",
  "Packaging",
  "UI/UX Design",
  "Art Direction",
  "Illustration",
  "Motion Graphics",
];

const tools = [
  "Figma",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Adobe InDesign",
  "After Effects",
  "Blender",
  "Procreate",
  "Webflow",
];

const About = () => {
  useScrollAnimation();

  return (
    <Layout>
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="reveal rounded-2xl overflow-hidden bg-card aspect-[3/4] shadow-2xl relative group">
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Designer portrait"
              loading="lazy"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
            />
          </div>

          {/* Bio */}
          <div className="reveal flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 mb-10">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">
                The Designer
              </p>
            </div>
            <h1 className="font-heading text-6xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tighter text-foreground leading-[0.85]">
              Alex
              <br />
              Moreau
            </h1>
            <p className="mt-12 text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-xl">
              I'm a graphic designer and art director based in Paris with over 8 years of
              experience creating visual identities and design systems for brands that value
              clarity, craft, and intention.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Skills & Tools */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          <div className="reveal border-t border-white/5 pt-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-12">Expertise</h3>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={fadeIn}
                  className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-white/5 bg-white/[0.02] text-foreground transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="reveal border-t border-white/5 pt-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-12">Arsenal</h3>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {tools.map((tool) => (
                <motion.span
                  key={tool}
                  variants={fadeIn}
                  className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-white/5 bg-white/[0.02] text-foreground transition-all duration-300 cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default About;
