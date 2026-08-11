import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: Props) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/40" />
      <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary/70">
        {children}
      </span>
      <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  );
}
