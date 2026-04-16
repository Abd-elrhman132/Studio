import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="font-heading text-xl font-semibold tracking-tight text-foreground">
              studio<span className="text-primary">.</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Crafting visual experiences with precision and purpose.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">
              Navigation
            </h4>
            <ul className="space-y-2">
              {["Home", "Portfolio", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">
              Connect
            </h4>
            <ul className="space-y-2">
              {["Dribbble", "Behance", "LinkedIn", "Instagram"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
