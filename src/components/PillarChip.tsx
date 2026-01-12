import { Badge } from "./ui/badge";

interface PillarChipProps {
  pillar: string;
}

export function PillarChip({ pillar }: PillarChipProps) {
  const colorMap: Record<string, string> = {
    "Security": "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
    "Safety": "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200",
    "Transparency": "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
    "Reliability": "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200"
  };

  const className = colorMap[pillar] || "bg-muted text-muted-foreground hover:bg-muted/80 border-border";

  return (
    <Badge 
      variant="outline" 
      className={`font-normal border ${className} transition-colors`}
    >
      {pillar}
    </Badge>
  );
}