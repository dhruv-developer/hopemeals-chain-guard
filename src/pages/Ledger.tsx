import { useState } from "react";
import { Shield, CheckCircle, XCircle, RefreshCw, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ForensicCard } from "@/components/ui/forensic-card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/apiClient";
import { useToast } from "@/hooks/use-toast";

export default function Ledger() {
  const [verification, setVerification] = useState<{ ok: boolean; length: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const verifyLedger = async () => {
    setLoading(true);
    setError("");
    
    try {
      const result = await api<{ ok: boolean; length: number }>("/evidence/ledger/verify");
      setVerification(result);
      
      if (result.ok) {
        toast({
          title: "Ledger verification successful",
          description: `All ${result.length} entries are valid`,
        });
      } else {
        toast({
          title: "Ledger verification failed",
          description: "Chain integrity compromised",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setError(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Ledger Verification"
        subtitle="Verify the integrity of the tamper-proof evidence chain"
        actions={
          <Button 
            onClick={verifyLedger} 
            disabled={loading}
            className="bg-gradient-to-r from-primary to-primary-hover"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Verifying..." : "Verify Ledger"}
          </Button>
        }
      />

      {/* Verification Status */}
      {verification && (
        <div className="mb-8">
          {verification.ok ? (
            <Alert className="border-success bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">
                <strong>Ledger Integrity Verified</strong> - All {verification.length} entries in the evidence chain are valid and tamper-free.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Ledger Integrity Compromised</strong> - Evidence chain verification failed. Immediate investigation required.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Action failed: {error}</AlertDescription>
        </Alert>
      )}

      {/* Ledger Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ForensicCard 
          title="Chain Statistics" 
          description="Current ledger state and metrics"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Entries:</span>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {verification?.length || "—"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Chain Status:</span>
              {verification ? (
                verification.ok ? (
                  <Badge className="bg-success text-success-foreground">Valid</Badge>
                ) : (
                  <Badge variant="destructive">Compromised</Badge>
                )
              ) : (
                <Badge variant="secondary">Unverified</Badge>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Hash Algorithm:</span>
              <span className="font-mono text-sm">SHA-256</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Verified:</span>
              <span className="text-sm">{verification ? new Date().toLocaleString() : "Never"}</span>
            </div>
          </div>
        </ForensicCard>

        <ForensicCard 
          title="Verification Process" 
          description="How the ledger integrity is checked"
        >
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="mt-1">1</Badge>
              <div className="text-sm">
                <p className="font-medium">Hash Validation</p>
                <p className="text-muted-foreground">Verify SHA-256 hashes of all evidence files</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="mt-1">2</Badge>
              <div className="text-sm">
                <p className="font-medium">Chain Linking</p>
                <p className="text-muted-foreground">Check cryptographic links between entries</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="mt-1">3</Badge>
              <div className="text-sm">
                <p className="font-medium">Timestamp Verification</p>
                <p className="text-muted-foreground">Ensure chronological order is maintained</p>
              </div>
            </div>
          </div>
        </ForensicCard>
      </div>

      {/* Security Information */}
      <ForensicCard 
        title="Tamper-Proof Ledger Technology" 
        description="How Hopemeals Guardian ensures evidence integrity"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              Cryptographic Protection
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• SHA-256 hashing for all evidence files</p>
              <p>• Immutable chain-of-custody records</p>
              <p>• Cryptographic linking between entries</p>
              <p>• Tamper detection through hash mismatches</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-success" />
              Verification Benefits
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Immediate tamper detection</p>
              <p>• Audit trail for legal proceedings</p>
              <p>• Confidence in evidence authenticity</p>
              <p>• Compliance with forensic standards</p>
            </div>
          </div>
        </div>
      </ForensicCard>
    </Layout>
  );
}