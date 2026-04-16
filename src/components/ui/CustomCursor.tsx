import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState<
    "default" | "pointer" | "project"
  >("default");
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("a, button, [role='button']")) {
        setCursorState("pointer");
      } else if (target.closest(".group")) {
        // Project cards use .group
        setCursorState("project");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  const variants = {
    default: {
      height: 14,
      width: 14,
      backgroundColor: "hsl(var(--primary))",
      border: "0px solid transparent",
    },
    pointer: {
      height: 64,
      width: 64,
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
      border: isDark ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(0,0,0,0.1)",
    },
    project: {
      height: 96,
      width: 96,
      backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
    },
  };

  return (
    <>
      {/* Background Glow Follower (Spotlight) */}
      <motion.div
        className={`fixed top-0 left-0 h-[400px] w-[400px] rounded-full pointer-events-none z-[5] blur-[120px] transition-colors duration-700 ${
          isDark ? "bg-orange-500/15" : "bg-blue-400/20"
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* The trailing follower */}
      <motion.div
        className="fixed top-0 left-0 hidden items-center justify-center overflow-hidden rounded-full pointer-events-none z-[9999] md:flex"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={variants}
        animate={cursorState}
        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
      >
        {cursorState === "project" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground"
          >
            Explore
          </motion.span>
        )}
      </motion.div>

      {/* Architectural Crosshair */}
      <motion.div
        className="fixed top-0 left-0 hidden pointer-events-none z-[10000] md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          rotate: cursorState === "pointer" ? 45 : 0,
          scale: cursorState === "project" ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-1/2 h-[1px] w-4 -translate-x-1/2 -translate-y-1/2 bg-foreground/50" />
        {/* Vertical Line */}
        <div className="absolute top-1/2 left-1/2 h-4 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-foreground/50" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
