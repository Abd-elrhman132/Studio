import { useRef, useState, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

const Magnetic = ({ children, strength = 0.5 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const enableMagnetism = !isMobile && !prefersReducedMotion;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableMagnetism || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={enableMagnetism ? handleMouseMove : undefined}
      onMouseLeave={enableMagnetism ? handleMouseLeave : undefined}
      animate={enableMagnetism ? { x: position.x, y: position.y } : { x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
