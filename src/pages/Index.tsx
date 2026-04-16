import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

const featuredProjects = projects.slice(0, 3);

const Home = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-medium uppercase tracking-[0.2em] mb-6 animate-fade-in">
              Graphic Designer & Art Director
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] animate-fade-in [animation-delay:100ms]">
              Crafting visual
              <br />
              stories with
              <br />
              <span className="text-gradient">intention.</span>
            </h1>
            <p className="mt-6 md:mt-8 text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed animate-fade-in [animation-delay:200ms]">
              I design brand identities, editorial layouts, and digital experiences
              that resonate with clarity and purpose.
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap gap-4 animate-fade-in [animation-delay:300ms]">
              <Button asChild size="lg" className="font-heading font-medium tracking-wide">
                <Link to="/portfolio">
                  View Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-heading font-medium tracking-wide">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <SectionWrapper>
        <SectionHeading
          title="Featured Work"
          subtitle="A selection of recent projects spanning branding, print, and digital design."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="font-heading font-medium tracking-wide">
            <Link to="/portfolio">
              All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="border-t border-border">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            I'm always open to discussing new opportunities and creative collaborations.
          </p>
          <Button asChild size="lg" className="mt-8 font-heading font-medium tracking-wide">
            <Link to="/contact">
              Let's Talk <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Home;
