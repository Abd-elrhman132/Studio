import { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/animations/framer/variants";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <motion.main 
      className="pt-20 md:pt-24"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  );
};

export default Layout;
