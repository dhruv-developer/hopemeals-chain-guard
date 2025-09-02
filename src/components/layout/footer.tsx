import { Badge } from "@/components/ui/badge";
import { API_BASE_URL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">API Base URL:</span> 
            <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">{API_BASE_URL}</code>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Dev Environment
            </Badge>
            <span className="text-xs text-muted-foreground">
              Hopemeals Guardian v1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}