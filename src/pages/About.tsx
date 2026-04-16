import Layout from "@/components/layout/Layout";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";

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
  return (
    <Layout>
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="rounded-lg overflow-hidden bg-card aspect-[3/4]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Designer portrait"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            <p className="text-primary text-sm font-medium uppercase tracking-[0.2em] mb-4">
              About
            </p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Alex Moreau
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              I'm a graphic designer and art director based in Paris with over 8 years of
              experience creating visual identities and design systems for brands that value
              clarity, craft, and intention.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              My approach blends strong typographic foundations with modern aesthetics—working
              across print, digital, and packaging to deliver cohesive brand experiences.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper className="border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <SectionHeading title="Skills" subtitle="Core competencies honed over years of practice." />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading title="Tools" subtitle="The instruments behind the work." />
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default About;
