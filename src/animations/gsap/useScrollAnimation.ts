import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
        
        // Batch set will-change for performance
        gsap.set(reveals, { willChange: "transform, opacity" });

        reveals.forEach((element) => {
          gsap.fromTo(
            element,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              force3D: true,
              lazy: true,
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
                once: true,
                // performance boost: don't track when off-screen
                fastScrollEnd: true,
              },
            },
          );
        });

        const parallaxes = gsap.utils.toArray<HTMLElement>(".parallax");
        gsap.set(parallaxes, { willChange: "transform" });

        parallaxes.forEach((element) => {
          const speed = Number(element.dataset.speed ?? 0.05);
          gsap.to(element, {
            yPercent: speed * -100,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".reveal", { clearProps: "all", opacity: 1, y: 0 });
        gsap.set(".parallax", { clearProps: "all", yPercent: 0 });
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);
};
