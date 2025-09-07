import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={`w-full max-w-[1800px] mx-auto px-4 ${className ?? ""}`}>
      {children}
    </div>
  );
}
