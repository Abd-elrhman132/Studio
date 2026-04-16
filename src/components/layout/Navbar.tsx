import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import Magnetic from "../shared/Magnetic";
import ThemeToggle from "../shared/ThemeToggle";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldHide = currentScrollY > lastScrollYRef.current && currentScrollY > 120;
      setHidden((current) => (current === shouldHide ? current : shouldHide));
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/[0.05] bg-background/50 backdrop-blur-xl"
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between h-20 md:h-24 px-6 md:px-12">
        <Magnetic strength={0.1}>
          <Link to="/" className="font-heading text-2xl font-bold tracking-tighter text-foreground uppercase">
            Studio
          </Link>
        </Magnetic>

        <div className="flex items-center gap-6 md:gap-8">
          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = item.path === "/" 
                ? location.pathname === "/" 
                : location.pathname.startsWith(item.path);

              return (
                <li key={item.path}>
                  <Magnetic strength={0.2}>
                    <Link
                      to={item.path}
                      className={`relative block px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-300 ${
                        isActive 
                          ? "text-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <motion.span 
                          layoutId="nav-pill"
                          transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                          className="absolute inset-0 rounded-full bg-foreground/[0.05]" 
                        />
                      )}
                    </Link>
                  </Magnetic>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Mobile toggle */}
            <button
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-slate-950/95"
          >
            <ul className="container py-6 flex flex-col gap-3">
              {navItems.map((item, index) => {
                const isActive = item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

                return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-sm font-bold uppercase tracking-[0.25em] transition-colors ${
                      isActive
                        ? "border-primary/30 bg-primary/10 text-foreground"
                        : "border-white/10 bg-white/[0.03] text-muted-foreground"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-primary">{`0${index + 1}`}</span>
                  </Link>
                </li>
              )})}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
