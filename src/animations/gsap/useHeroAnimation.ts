import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useHeroAnimation = () => {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ 
          defaults: { 
            ease: "power3.out", 
            duration: 1, 
            force3D: true // Enable hardware acceleration
          } 
        });

        // Set initial will-change to hint browser for paint optimization
        gsap.set([".hero-line", ".hero-sub", ".hero-btn", ".hero-card", ".hero-deco"], { 
          willChange: "transform, opacity" 
        });

        tl.from(".hero-line", {
          y: 60,
          opacity: 0,
          stagger: 0.1,
        })
          .from(
            ".hero-sub",
            {
              opacity: 0,
              y: 15,
              stagger: 0.05,
            },
            "-=0.8",
          )
          .from(
            ".hero-btn",
            {
              opacity: 0,
              y: 20,
              stagger: 0.05,
            },
            "-=0.8",
          )
          .from(
            ".hero-card",
            {
              opacity: 0,
              y: 30,
              stagger: 0.05,
            },
            "-=0.8",
          )
          .from(
            ".hero-deco",
            {
              opacity: 0,
              scale: 0.96,
              duration: 1.2,
            },
            "-=0.9",
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".hero-line", ".hero-sub", ".hero-btn", ".hero-card", ".hero-deco"], { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          clearProps: "all" 
        });
      });
    }, scopeRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return scopeRef;
};

