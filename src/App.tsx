import { Suspense, lazy, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/ui/Loader";

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

  useEffect(() => {
    const handleModelReady = () => {
      setIsModelLoaded(true);
    };

    window.addEventListener("hero-model-ready", handleModelReady);
    return () => window.removeEventListener("hero-model-ready", handleModelReady);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence>
          {showLoader && (
            <Loader 
              key="loader" 
              onFinished={() => {
                // If model is already loaded, we can hide loader immediately
                // Otherwise, Loader component should ideally wait or we handle it here
                if (isModelLoaded) {
                  setShowLoader(false);
                }
              }} 
              // Pass the model loaded state to the loader so it can decide when to finish
              isReady={isModelLoaded}
            />
          )}
        </AnimatePresence>
        
        <div style={{ visibility: showLoader ? "hidden" : "visible" }}>
          <Toaster />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
