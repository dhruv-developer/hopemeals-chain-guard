import { useState, useEffect } from "react";
import { Upload, File, Image, FileText, Database, Eye, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ForensicCard } from "@/components/ui/forensic-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/apiClient";
import { useToast } from "@/hooks/use-toast";

export default function UploadEvidence() {
  const [eventId, setEventId] = useState("");
  const [evidenceType, setEvidenceType] = useState<"image" | "csv" | "json" | "note">("image");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Pre-fill with last used event ID
    const lastEventId = localStorage.getItem("lastEventId");
    if (lastEventId) {
      setEventId(lastEventId);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId || !file) {
      setError("Please provide both event ID and file");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("event_id", eventId);
      formData.append("type", evidenceType);
      formData.append("blob", file);

      const response = await api("/evidence/upload", {
        method: "POST",
        formData
      });

      setResult(response);
      localStorage.setItem("lastEventId", eventId);
      toast({
        title: "Evidence uploaded",
        description: `File processed successfully with hash ${response.sha256?.slice(0, 16)}...`,
      });
    } catch (error: any) {
      setError(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const runELA = async () => {
    if (!result?.evidence_id) return;
    
    try {
      const elaResult = await api("/forensics/ela", {
        method: "POST",
        body: { evidence_id: result.evidence_id }
      });
      
      setResult(prev => ({ ...prev, ela: elaResult }));
      toast({
        title: "ELA analysis complete",
        description: `Suspicion level: ${elaResult.suspicion?.toFixed(2) || 'Unknown'}`,
      });
    } catch (error: any) {
      toast({
        title: "ELA analysis failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />;
      case "csv": return <Database className="h-4 w-4" />;
      case "json": return <FileText className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Upload Evidence"
        subtitle="Submit files for forensic analysis and tamper-proof storage"
      />

      <div className="max-w-2xl mx-auto space-y-8">
        <ForensicCard 
          title="Evidence Submission" 
          description="All uploads are hashed and stored in the tamper-proof ledger"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Action failed: {error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="event_id">Event ID</Label>
              <Input
                id="event_id"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                placeholder="Enter the event ID this evidence relates to"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence_type">Evidence Type</Label>
              <Select value={evidenceType} onValueChange={(value: any) => setEvidenceType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">
                    <div className="flex items-center space-x-2">
                      <Image className="h-4 w-4" />
                      <span>Image</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4" />
                      <span>CSV Data</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="json">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>JSON Document</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="note">
                    <div className="flex items-center space-x-2">
                      <File className="h-4 w-4" />
                      <span>Text Note</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept={evidenceType === "image" ? "image/*" : evidenceType === "csv" ? ".csv" : "*"}
                required
              />
              {file && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {getTypeIcon(evidenceType)}
                  <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary-hover"
              disabled={loading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {loading ? "Processing..." : "Upload Evidence"}
            </Button>
          </form>
        </ForensicCard>

        {result && (
          <ForensicCard 
            title="Upload Results" 
            description="Evidence successfully processed and stored"
          >
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Evidence ID</Label>
                  <code className="block text-sm bg-muted p-2 rounded">{result.evidence_id}</code>
                </div>
                <div>
                  <Label className="text-sm font-medium">SHA-256 Hash</Label>
                  <code className="block text-sm bg-muted p-2 rounded break-all">{result.sha256}</code>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Ledger Index</Label>
                <Badge variant="outline" className="ml-2">{result.ledger_index}</Badge>
              </div>

              {evidenceType === "image" && (
                <div className="flex gap-3">
                  <Button onClick={runELA} variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Run ELA Analysis
                  </Button>
                </div>
              )}

              {result.ela && (
                <div className="border border-border rounded-lg p-4 bg-accent/50">
                  <h4 className="font-semibold mb-2">ELA Analysis Results</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Suspicion Level: </span>
                      <Badge 
                        variant={result.ela.suspicion > 0.7 ? "destructive" : result.ela.suspicion > 0.4 ? "secondary" : "outline"}
                      >
                        {result.ela.suspicion?.toFixed(2) || 'Unknown'}
                      </Badge>
                    </div>
                    {result.ela.ela_path && (
                      <div>
                        <Label className="text-sm font-medium">ELA Image</Label>
                        <img 
                          src={`${result.ela.ela_path}`} 
                          alt="ELA Analysis Result"
                          className="mt-2 max-w-full h-auto rounded border"
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      High suspicion suggests potential tampering but is not conclusive. 
                      Corroborate with other evidence.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ForensicCard>
        )}
      </div>
    </Layout>
  );
}