interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ title, subtitle, align = "left" }: SectionHeadingProps) => {
  return (
    <div className={`mb-24 md:mb-32 ${align === "center" ? "text-center mx-auto" : ""}`}>
      <div className={`flex flex-col ${align === "center" ? "items-center" : "items-start"}`}>
        <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.05]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-8 text-muted-foreground text-xl md:text-2xl max-w-3xl leading-relaxed font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeading;
