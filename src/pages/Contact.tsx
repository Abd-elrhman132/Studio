import { useState, FormEvent } from "react";
import Layout from "@/components/layout/Layout";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/animations/gsap/useScrollAnimation";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  useScrollAnimation();

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          <div className="reveal">
            <div className="inline-flex items-center gap-3 mb-10">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">
                Contact
              </p>
            </div>
            <h1 className="font-heading text-6xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tighter text-foreground leading-[0.85]">
              Let's create
              <br />
              something
              <br />
              <span className="text-gradient">new.</span>
            </h1>
            <p className="mt-12 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-md font-light">
              Whether you have a vision in mind or just want to start a conversation.
            </p>

            <div className="mt-20 space-y-12">
              <div className="group cursor-pointer">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4 transition-all group-hover:text-white/40">Email</p>
                <p className="text-3xl font-heading text-foreground tracking-tighter border-b border-white/5 pb-4 transition-all group-hover:border-white">hello@studio.design</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4 transition-all group-hover:text-white/40">Based in</p>
                <p className="text-3xl font-heading text-foreground tracking-tighter border-b border-white/5 pb-4 transition-all group-hover:border-white">Paris, France</p>
              </div>
            </div>
          </div>

          <div className="reveal p-8 md:p-16 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div>
                <label htmlFor="name" className="block text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-6">
                  Full Name
                </label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="John Doe" 
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-all text-xl py-8 placeholder:text-white/10"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-6">
                  Email Address
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="john@example.com" 
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-all text-xl py-8 placeholder:text-white/10"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-6">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-all text-xl py-4 resize-none placeholder:text-white/10"
                />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="w-full h-20 rounded-full font-heading font-bold tracking-[0.3em] uppercase text-xs transition-all duration-500 bg-white text-black hover:bg-white/90 active:scale-95 mt-8">
                {loading ? "Sending..." : "Send Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Contact;
