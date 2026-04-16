import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onFinished, isReady }: { onFinished: () => void; isReady: boolean }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slower at the end to wait for actual ready state
        const increment = prevProgress > 80 ? Math.random() * 2 : Math.random() * 15;
        return Math.min(prevProgress + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Only finish if progress is 100 AND isReady is true
    if (progress >= 100 && isReady) {
      const timeout = setTimeout(() => {
        onFinished();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, isReady, onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative w-full max-w-md px-10">
        <div className="flex justify-between items-end mb-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-2xl font-bold tracking-tighter text-foreground uppercase"
          >
            Studio
          </motion.div>
          <div className="font-heading text-4xl font-light tracking-tighter text-foreground/20">
            {Math.round(progress)}%
          </div>
        </div>
        
        <div className="h-[1px] w-full bg-foreground/5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-foreground"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-6 text-[10px] uppercase tracking-[0.4em] text-foreground/40 text-center"
        >
          {isReady && progress >= 100 ? "Ready to Explore" : "Loading Creative Content"}
        </motion.p>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-foreground/5 to-transparent opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-foreground/5 to-transparent opacity-20 pointer-events-none" />
    </motion.div>
  );
};

export default Loader;
