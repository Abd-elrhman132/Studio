import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { FooterModern } from "./FooterModern";
import { motion, useReducedMotion } from "framer-motion";
import { pageTransition } from "@/animations/framer/variants";
import CustomCursor from "../ui/CustomCursor";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const enableInteractiveFx = !isMobile && !prefersReducedMotion;

  return (
    <div className={`min-h-screen flex flex-col ${enableInteractiveFx ? "cursor-none" : ""}`}>
      {!prefersReducedMotion && <div className="grain-overlay" />}
      {!isMobile && !prefersReducedMotion && <div className="light-ray" />}
      {!prefersReducedMotion && <div className="light-pane pane-1" />}
      {!prefersReducedMotion && <div className="light-pane pane-2" />}
      {!isMobile && <div className="horizon-line" />}
      {enableInteractiveFx && <CustomCursor />}
      <Navbar />
      <motion.main 
        className="flex-1 pt-20 md:pt-24"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
      <FooterModern />
    </div>
  );
};

export default Layout;
