import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

interface ForensicCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ForensicCard({ title, description, children, className = "", onClick }: ForensicCardProps) {
  return (
    <Card 
      className={`bg-gradient-to-br from-card to-accent/50 border-border shadow-[var(--shadow-card)] ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-card-foreground">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}