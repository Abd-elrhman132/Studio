import { useState, FormEvent } from "react";
import Layout from "@/components/layout/Layout";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <Layout>
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-primary text-sm font-medium uppercase tracking-[0.2em] mb-4">
              Contact
            </p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Let's create
              <br />
              something great.
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Whether you have a project in mind or just want to say hello,
              I'd love to hear from you.
            </p>

            <div className="mt-10 space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">Email</p>
                <p className="text-sm text-foreground">hello@studio.design</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">Based in</p>
                <p className="text-sm text-foreground">Paris, France</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <Input id="name" name="name" required placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input id="email" name="email" type="email" required placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="Tell me about your project..."
                rows={6}
              />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="font-heading font-medium tracking-wide w-full sm:w-auto">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Contact;
