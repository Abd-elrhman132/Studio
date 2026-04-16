import { Suspense, lazy, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Loader from "./components/ui/Loader";
import Navbar from "./components/layout/Navbar";
import FooterModern from "./components/layout/FooterModern";
import CustomCursor from "./components/ui/CustomCursor";
import { useIsMobile } from "@/hooks/use-mobile";
import { pageTransition } from "@/animations/framer/variants";

const queryClient = new QueryClient();
const Index = lazy(() => import("./pages/Index"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const enableInteractiveFx = !isMobile && !prefersReducedMotion;

  useEffect(() => {
    if (!isHomePage) {
      setIsModelLoaded(true);
      return;
    }

    const handleModelReady = () => {
      setIsModelLoaded(true);
    };

    window.addEventListener("hero-model-ready", handleModelReady);
    
    const safetyTimeout = setTimeout(() => {
      setIsModelLoaded(true);
    }, 3000);

    return () => {
      window.removeEventListener("hero-model-ready", handleModelReady);
      clearTimeout(safetyTimeout);
    };
  }, [isHomePage]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence>
          {showLoader && (
            <Loader 
              key="loader" 
              onFinished={() => setShowLoader(false)} 
              isReady={isModelLoaded}
            />
          )}
        </AnimatePresence>
        
        <div 
          className={`min-h-screen flex flex-col ${enableInteractiveFx ? "cursor-none" : ""}`}
          style={{ visibility: showLoader ? "hidden" : "visible" }}
        >
          {enableInteractiveFx && <CustomCursor />}
          <Navbar />
          
          <div className="flex-1">
            <AnimatedRoutes />
          </div>

          <FooterModern />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
