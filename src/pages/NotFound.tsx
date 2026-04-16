import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-[8rem] md:text-[12rem] font-bold tracking-tighter text-foreground/5 leading-none absolute select-none pointer-events-none">
          404
        </h1>
        <div className="relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
            Page not found
          </h2>
          <p className="mb-12 text-lg text-muted-foreground max-w-md mx-auto font-light">
            The link you followed may be broken, or the page may have been removed.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
