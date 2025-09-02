import { Badge } from "./badge";

interface AlertPillProps {
  severity: number;
  className?: string;
}

export function AlertPill({ severity, className = "" }: AlertPillProps) {
  const getSeverityConfig = (level: number) => {
    switch (level) {
      case 1:
        return { label: "Low", color: "bg-alert-low text-warning-foreground" };
      case 2:
        return { label: "Medium", color: "bg-alert-medium text-warning-foreground" };
      case 3:
        return { label: "High", color: "bg-alert-high text-destructive-foreground" };
      default:
        return { label: "Critical", color: "bg-alert-critical text-destructive-foreground" };
    }
  };

  const config = getSeverityConfig(severity);

  return (
    <Badge 
      variant="secondary" 
      className={`${config.color} ${className}`}
    >
      {config.label}
    </Badge>
  );
}