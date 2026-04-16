import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper = ({ children, className = "", id }: SectionWrapperProps) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
};

export default SectionWrapper;
