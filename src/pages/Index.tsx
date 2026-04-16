import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCardEnhanced from "@/components/shared/ProjectCardEnhanced";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import {
  ArrowRight,
  BadgeCheck,
  Layers3,
  MonitorSmartphone,
  Orbit,
  Sparkles,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useHeroAnimation } from "@/animations/gsap/useHeroAnimation";
import { useScrollAnimation } from "@/animations/gsap/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import Magnetic from "@/components/shared/Magnetic";

const featuredProjects = projects.slice(0, 3);
const HeroScene = lazy(() => import("@/components/ui/HeroScene"));

const capabilities = [
  {
    icon: Layers3,
    title: "Brand systems with depth",
    copy: "Structured identity systems that stay sharp across campaigns, decks, and digital touchpoints.",
  },
  {
    icon: Orbit,
    title: "Motion with intention",
    copy: "Framer and GSAP interactions that feel premium without overwhelming the content or device budget.",
  },
  {
    icon: MonitorSmartphone,
    title: "3D that earns its place",
    copy: "Three.js accents used selectively to add presence, hierarchy, and memorability to key moments.",
  },
];

const process = [
  {
    step: "01",
    title: "Narrative Direction",
    copy: "We shape the story, visual tone, and interaction priorities before the page starts moving.",
  },
  {
    step: "02",
    title: "Systemized Build",
    copy: "Sections are designed as reusable surfaces so the site can evolve without losing its edge.",
  },
  {
    step: "03",
    title: "Performance Polish",
    copy: "Motion, rendering, and loading behaviors are tuned for the modern web, not just the demo reel.",
  },
];

const Home = () => {
  const heroRef = useHeroAnimation();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [shouldRenderScene, setShouldRenderScene] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      setShouldRenderScene(false);
      return;
    }

    const idleCallback = window.requestIdleCallback?.(() => setShouldRenderScene(true));
    const timeout = window.setTimeout(() => setShouldRenderScene(true), 180);

    return () => {
      if (idleCallback) window.cancelIdleCallback?.(idleCallback);
      window.clearTimeout(timeout);
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <Layout>
      <section ref={heroRef} className="relative h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 h-full pt-12 md:pt-16">
          <div className="grid h-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center">
              <div className="hero-sub eyebrow mb-6">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Modern digital presence for design-led brands
              </div>

              <div className="space-y-5">
                <h1 className="hero-line balanced-text font-heading text-6xl font-bold leading-[0.85] text-foreground sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem]">
                  Sharper
                  <br />
                  storytelling,
                  <br />
                  <span className="text-gradient">modern motion.</span>
                </h1>
              </div>

              <p className="hero-sub mt-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl font-light">
                A refined digital direction focused on clarity, performance, and 
                high-end aesthetic precision.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Magnetic strength={0.1}>
                  <Button asChild size="lg" className="hero-btn h-14 rounded-full px-8">
                    <Link to="/portfolio">
                      Explore Work <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.1}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="hero-btn h-14 rounded-full px-8 border-white/5 bg-white/[0.02] text-white hover:bg-white hover:text-black"
                  >
                    <Link to="/contact">Start a Project</Link>
                  </Button>
                </Magnetic>
              </div>
            </div>

            <div className="hero-deco relative">
              <div className="glass-dark surface-border relative overflow-hidden rounded-[2rem] p-4 md:p-6">
                <div className="absolute inset-x-8 top-6 z-10 flex items-center justify-between">
                  <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-white/70 backdrop-blur-md">
                    Live direction
                  </div>
                  <div className="rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                    performance-minded
                  </div>
                </div>
                {shouldRenderScene ? (
                  <Suspense
                    fallback={<div className="h-[360px] rounded-[1.5rem] bg-gradient-to-br from-white/[0.06] to-transparent md:h-[520px]" />}
                  >
                    <HeroScene className="h-[360px] md:h-[520px]" />
                  </Suspense>
                ) : (
                  <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-white/[0.06] via-primary/[0.04] to-transparent md:h-[520px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,191,0,0.18),transparent_28%),radial-gradient(circle_at_60%_62%,rgba(93,168,222,0.12),transparent_22%)]" />
                    <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                    <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
                  </div>
                )}
                <div className="hero-card absolute bottom-6 left-6 max-w-[16rem] rounded-[1.5rem] border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.32em] text-white bg-white/10 px-2 py-1 rounded-md mb-3">
                    What changed
                  </span>
                  <p className="text-sm leading-relaxed text-white/70">
                    <span className="bg-white/5 px-1.5 py-0.5 rounded-sm">
                      Reduced heavy always-on effects, tightened animation timing, and gave the layout a
                      more current high-end studio feel.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-sub mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
            {["Brand systems", "Editorial layouts", "Web direction", "Motion design", "Immersive accents"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/65"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SectionWrapper className="reveal">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            title="Capabilities for a more current web presence"
            subtitle="The refreshed direction blends sharper art direction with a more disciplined frontend runtime."
          />
          <div className="glass rounded-[1.75rem] p-6 text-sm leading-relaxed text-muted-foreground">
            Strong modern sites do not just add animation. They sequence attention well, preserve contrast,
            make 3D feel intentional, and stay responsive on mid-range devices.
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="reveal glass-dark surface-border rounded-[2rem] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-8 font-heading text-2xl font-bold tracking-tighter text-foreground">
                {title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="reveal">
        <SectionHeading
          title="Featured Work"
          subtitle="A tighter presentation system for recent branding, print, and digital work."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredProjects.map((project) => (
            <ProjectCardEnhanced key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-32 text-center">
          <Button asChild variant="ghost" size="lg" className="font-heading text-xs font-bold uppercase tracking-[0.3em] transition-colors group hover:text-primary">
            <Link to="/portfolio" className="flex items-center">
              All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper className="reveal">
        <div className="grid gap-12 lg:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="border-t border-white/5 pt-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/50">
                Step {item.step}
              </p>
              <h3 className="mt-8 font-heading text-2xl font-bold tracking-tighter text-foreground">
                {item.title}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground font-light">{item.copy}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="relative overflow-hidden reveal">
        <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[3rem] px-8 py-24 md:px-12 md:py-32 border border-white/5 bg-white/[0.02]">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <div className="eyebrow">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                Premium web presence
              </div>
              <h2 className="mt-10 balanced-text font-heading text-5xl font-bold leading-[1.05] text-foreground md:text-7xl lg:text-8xl">
                Ready to elevate your digital narrative?
              </h2>
            </div>

            <Button asChild size="lg" className="hero-btn h-16 rounded-full px-12 font-heading text-xs font-bold uppercase tracking-[0.3em] bg-white text-black hover:bg-white/90">
              <Link to="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Home;
