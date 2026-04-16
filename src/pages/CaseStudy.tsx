import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CaseStudy = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

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
        <Button asChild variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
          <Link to="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>

        <div className="max-w-4xl">
          <p className="text-primary text-sm font-medium uppercase tracking-[0.2em] mb-3">
            {project.category} — {project.year}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-b border-border py-8">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">Client</p>
            <p className="text-sm text-foreground font-medium">{project.client}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">Role</p>
            <p className="text-sm text-foreground font-medium">{project.role}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">Year</p>
            <p className="text-sm text-foreground font-medium">{project.year}</p>
          </div>
        </div>

        {/* Overview */}
        <div className="mt-12 max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
        </div>

        {/* Images */}
        <div className="mt-12 space-y-6">
          {project.images.map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden bg-card">
              <img
                src={img}
                alt={`${project.title} — image ${i + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default CaseStudy;
