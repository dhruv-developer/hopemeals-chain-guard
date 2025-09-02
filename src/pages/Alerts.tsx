import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Search, RefreshCw, Eye } from "lucide-react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ForensicCard } from "@/components/ui/forensic-card";
import { AlertPill } from "@/components/ui/alert-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api } from "@/lib/apiClient";
import { Alert as AlertType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function Alerts() {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const data = await api<AlertType[]>("/analyze/alerts");
      setAlerts(data);
    } catch (error: any) {
      toast({
        title: "Error loading alerts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      await api("/analyze/run", { method: "POST", body: { limit: 200 } });
      await loadAlerts();
      toast({
        title: "Analysis complete",
        description: "New alerts have been generated",
      });
    } catch (error: any) {
      toast({
        title: "Analysis failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = !searchTerm || 
      alert.event_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.reasons.some(reason => reason.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSeverity = severityFilter === null || alert.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <Layout>
      <PageHeader
        title="Security Alerts"
        subtitle="Monitor anomalies and suspicious activities in the donation chain"
        actions={
          <div className="flex gap-3">
            <Button onClick={runAnalysis} disabled={analyzing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${analyzing ? 'animate-spin' : ''}`} />
              {analyzing ? "Analyzing..." : "Run Analysis"}
            </Button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by event ID or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={severityFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSeverityFilter(null)}
          >
            All
          </Button>
          {[1, 2, 3].map((severity) => (
            <Button
              key={severity}
              variant={severityFilter === severity ? "default" : "outline"}
              size="sm"
              onClick={() => setSeverityFilter(severity)}
            >
              <AlertPill severity={severity} />
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <ForensicCard title="Total Alerts" description="All time">
          <div className="text-3xl font-bold text-primary">{alerts.length}</div>
        </ForensicCard>
        <ForensicCard title="High Severity" description="Requires immediate attention">
          <div className="text-3xl font-bold text-alert-high">
            {alerts.filter(a => a.severity >= 3).length}
          </div>
        </ForensicCard>
        <ForensicCard title="Active" description="Under investigation">
          <div className="text-3xl font-bold text-warning">
            {alerts.filter(a => a.status === "active").length}
          </div>
        </ForensicCard>
        <ForensicCard title="Resolved" description="Investigation complete">
          <div className="text-3xl font-bold text-success">
            {alerts.filter(a => a.status === "resolved").length}
          </div>
        </ForensicCard>
      </div>

      {/* Alerts List */}
      {loading ? (
        <ForensicCard title="Loading" description="Fetching alerts...">
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </ForensicCard>
      ) : filteredAlerts.length === 0 ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {alerts.length === 0 
              ? "No alerts found. Run analysis to generate new alerts." 
              : "No alerts match your current filters."}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <ForensicCard
              key={alert.alert_id}
              title={`Alert ${alert.alert_id.slice(-8)}`}
              description={`Event: ${alert.event_id} • ${new Date(alert.created_at).toLocaleString()}`}
              className="cursor-pointer hover:shadow-[var(--shadow-elevated)] transition-all duration-200"
              onClick={() => navigate(`/events/${alert.event_id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertPill severity={alert.severity} />
                    <Badge variant="outline">Score: {alert.score.toFixed(2)}</Badge>
                    <Badge variant={alert.status === "active" ? "default" : "secondary"}>
                      {alert.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {alert.reasons.map((reason, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </ForensicCard>
          ))}
        </div>
      )}
    </Layout>
  );
}