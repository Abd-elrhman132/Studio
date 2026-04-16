import { Link } from "react-router-dom";

export const FooterModern = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.05] bg-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 md:py-48">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="font-heading text-3xl font-bold uppercase tracking-tighter text-foreground">
              Studio
            </Link>
            <p className="mt-8 max-w-sm text-lg leading-relaxed text-muted-foreground font-light">
              Crafting refined digital experiences focused on clarity, performance, and aesthetic precision.
            </p>
          </div>

          <div>
            <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Home", "Portfolio", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="inline-block text-sm text-muted-foreground transition-colors duration-300 hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              Connect
            </h4>
            <ul className="space-y-4">
              {["Dribbble", "Behance", "LinkedIn", "Instagram"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="inline-block text-sm text-muted-foreground transition-colors duration-300 hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-32 flex flex-col gap-8 border-t border-white/[0.05] pt-12 text-[10px] uppercase tracking-[0.3em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} Studio. All rights reserved.`}</p>
          <div className="flex gap-8">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterModern;
