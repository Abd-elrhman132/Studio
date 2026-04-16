interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ title, subtitle, align = "left" }: SectionHeadingProps) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}>
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
