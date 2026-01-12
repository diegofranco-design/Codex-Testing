import { cn } from "./ui/utils";

interface SectionHeaderProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionHeader({ number, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-baseline gap-3 mb-6 border-b border-border pb-4", className)}>
      <span className="font-mono text-xl md:text-2xl font-bold text-muted-foreground/30 select-none">
        {number}.
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
        {title}
      </h2>
    </div>
  );
}