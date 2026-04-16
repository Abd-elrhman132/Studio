import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background relative overflow-hidden">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="font-heading text-3xl font-bold tracking-tighter text-foreground group">
              studio<span className="text-primary group-hover:animate-pulse">.</span>
            </Link>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-sm font-light">
              Crafting visual experiences that resonate with clarity, precision and purpose.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold text-foreground mb-8 tracking-[0.3em] uppercase">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Home", "Portfolio", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold text-foreground mb-8 tracking-[0.3em] uppercase">
              Connect
            </h4>
            <ul className="space-y-4">
              {["Dribbble", "Behance", "LinkedIn", "Instagram"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
          <div className="flex gap-8">
             <p className="text-xs text-muted-foreground tracking-widest uppercase">
              Privacy Policy
            </p>
            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              Terms of Service
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
