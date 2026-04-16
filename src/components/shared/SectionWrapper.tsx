import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper = ({ children, className = "", id }: SectionWrapperProps) => {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
};

export default SectionWrapper;
