// import { useState } from "react";
// import { Shield, CheckCircle, XCircle, RefreshCw, AlertCircle } from "lucide-react";
// import { Layout } from "@/components/layout/layout";
// import { PageHeader } from "@/components/ui/page-header";
// import { ForensicCard } from "@/components/ui/forensic-card";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Badge } from "@/components/ui/badge";
// import { api } from "@/lib/apiClient";
// import { useToast } from "@/hooks/use-toast";

// export default function Ledger() {
//   const [verification, setVerification] = useState<{ ok: boolean; length: number } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { toast } = useToast();

//   const verifyLedger = async () => {
//     setLoading(true);
//     setError("");
    
//     try {
//       const result = await api<{ ok: boolean; length: number }>("/evidence/ledger/verify");
//       setVerification(result);
      
//       if (result.ok) {
//         toast({
//           title: "Ledger verification successful",
//           description: `All ${result.length} entries are valid`,
//         });
//       } else {
//         toast({
//           title: "Ledger verification failed",
//           description: "Chain integrity compromised",
//           variant: "destructive",
//         });
//       }
//     } catch (error: any) {
//       setError(error.message || "Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <PageHeader
//         title="Ledger Verification"
//         subtitle="Verify the integrity of the tamper-proof evidence chain"
//         actions={
//           <Button 
//             onClick={verifyLedger} 
//             disabled={loading}
//             className="bg-gradient-to-r from-primary to-primary-hover"
//           >
//             <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
//             {loading ? "Verifying..." : "Verify Ledger"}
//           </Button>
//         }
//       />

//       {/* Verification Status */}
//       {verification && (
//         <div className="mb-8">
//           {verification.ok ? (
//             <Alert className="border-success bg-success/10">
//               <CheckCircle className="h-4 w-4 text-success" />
//               <AlertDescription className="text-success">
//                 <strong>Ledger Integrity Verified</strong> - All {verification.length} entries in the evidence chain are valid and tamper-free.
//               </AlertDescription>
//             </Alert>
//           ) : (
//             <Alert variant="destructive">
//               <XCircle className="h-4 w-4" />
//               <AlertDescription>
//                 <strong>Ledger Integrity Compromised</strong> - Evidence chain verification failed. Immediate investigation required.
//               </AlertDescription>
//             </Alert>
//           )}
//         </div>
//       )}

//       {error && (
//         <Alert variant="destructive" className="mb-8">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>Action failed: {error}</AlertDescription>
//         </Alert>
//       )}

//       {/* Ledger Information */}
//       <div className="grid md:grid-cols-2 gap-6 mb-8">
//         <ForensicCard 
//           title="Chain Statistics" 
//           description="Current ledger state and metrics"
//         >
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <span className="text-muted-foreground">Total Entries:</span>
//               <Badge variant="outline" className="text-lg px-3 py-1">
//                 {verification?.length || "—"}
//               </Badge>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-muted-foreground">Chain Status:</span>
//               {verification ? (
//                 verification.ok ? (
//                   <Badge className="bg-success text-success-foreground">Valid</Badge>
//                 ) : (
//                   <Badge variant="destructive">Compromised</Badge>
//                 )
//               ) : (
//                 <Badge variant="secondary">Unverified</Badge>
//               )}
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-muted-foreground">Hash Algorithm:</span>
//               <span className="font-mono text-sm">SHA-256</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-muted-foreground">Last Verified:</span>
//               <span className="text-sm">{verification ? new Date().toLocaleString() : "Never"}</span>
//             </div>
//           </div>
//         </ForensicCard>

//         <ForensicCard 
//           title="Verification Process" 
//           description="How the ledger integrity is checked"
//         >
//           <div className="space-y-3">
//             <div className="flex items-start space-x-3">
//               <Badge variant="outline" className="mt-1">1</Badge>
//               <div className="text-sm">
//                 <p className="font-medium">Hash Validation</p>
//                 <p className="text-muted-foreground">Verify SHA-256 hashes of all evidence files</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-3">
//               <Badge variant="outline" className="mt-1">2</Badge>
//               <div className="text-sm">
//                 <p className="font-medium">Chain Linking</p>
//                 <p className="text-muted-foreground">Check cryptographic links between entries</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-3">
//               <Badge variant="outline" className="mt-1">3</Badge>
//               <div className="text-sm">
//                 <p className="font-medium">Timestamp Verification</p>
//                 <p className="text-muted-foreground">Ensure chronological order is maintained</p>
//               </div>
//             </div>
//           </div>
//         </ForensicCard>
//       </div>

//       {/* Security Information */}
//       <ForensicCard 
//         title="Tamper-Proof Ledger Technology" 
//         description="How Hopemeals Guardian ensures evidence integrity"
//       >
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <h4 className="font-semibold mb-3 flex items-center">
//               <Shield className="h-4 w-4 mr-2 text-primary" />
//               Cryptographic Protection
//             </h4>
//             <div className="space-y-2 text-sm text-muted-foreground">
//               <p>• SHA-256 hashing for all evidence files</p>
//               <p>• Immutable chain-of-custody records</p>
//               <p>• Cryptographic linking between entries</p>
//               <p>• Tamper detection through hash mismatches</p>
//             </div>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-3 flex items-center">
//               <CheckCircle className="h-4 w-4 mr-2 text-success" />
//               Verification Benefits
//             </h4>
//             <div className="space-y-2 text-sm text-muted-foreground">
//               <p>• Immediate tamper detection</p>
//               <p>• Audit trail for legal proceedings</p>
//               <p>• Confidence in evidence authenticity</p>
//               <p>• Compliance with forensic standards</p>
//             </div>
//           </div>
//         </div>
//       </ForensicCard>
//     </Layout>
//   );
// }

// Ledger.tsx
import { useEffect, useState } from "react";
import { Shield, CheckCircle, XCircle, RefreshCw, AlertCircle, Link2, Blocks, Hash } from "lucide-react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ForensicCard } from "@/components/ui/forensic-card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/apiClient";
import { useToast } from "@/hooks/use-toast";

type LedgerVerify = { ok: boolean; length: number };
type BCStatus =
  | { mode: "off"; note: string }
  | { mode: "local"; ok: boolean; height: number; tip_hash: string | null }
  | { mode: "eth"; configured: boolean };
type Block = {
  index: number;
  timestamp: string;
  prev_hash: string;
  data: string;
  nonce: number;
  hash: string;
};

export default function Ledger() {
  const [verification, setVerification] = useState<LedgerVerify | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  // blockchain
  const [bcStatus, setBcStatus] = useState<BCStatus | null>(null);
  const [bcBlocks, setBcBlocks] = useState<Block[]>([]);
  const [bcLoading, setBcLoading] = useState(false);
  const [anchorText, setAnchorText] = useState("");
  const [anchorResult, setAnchorResult] = useState<any>(null);

  const verifyLedger = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await api<LedgerVerify>("/evidence/ledger/verify");
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
    } catch (e: any) {
      setError(e.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchBcStatus = async () => {
    try {
      const st = await api<BCStatus>("/blockchain/status");
      setBcStatus(st);
    } catch (e: any) {
      toast({ title: "Blockchain status error", description: e.message, variant: "destructive" });
    }
  };

  const fetchBlocks = async (limit = 10) => {
    setBcLoading(true);
    try {
      const items = await api<Block[]>(`/blockchain/chain?limit=${limit}`);
      setBcBlocks(items);
    } catch (e: any) {
      toast({ title: "Failed to load blocks", description: e.message, variant: "destructive" });
    } finally {
      setBcLoading(false);
    }
  };

  const verifyBlockchain = async () => {
    try {
      const res = await api<{ ok: boolean; height: number }>("/blockchain/verify");
      toast({
        title: res.ok ? "Blockchain OK" : "Blockchain Verify Failed",
        description: `Height: ${res.height}`,
        variant: res.ok ? "default" : "destructive",
      });
    } catch (e: any) {
      toast({ title: "Blockchain verify error", description: e.message, variant: "destructive" });
    }
  };

  const manualAnchor = async () => {
    if (!anchorText.trim()) return;
    try {
      const out = await api<any>("/blockchain/anchor", {
        method: "POST",
        body: { text: anchorText.trim() },
      });
      setAnchorResult(out);
      toast({ title: "Anchored", description: out?.mode === "eth" ? `tx: ${out.tx_hash?.slice(0,12)}...` : `mode: ${out?.mode || "off"}` });
      await fetchBlocks(5);
    } catch (e: any) {
      toast({ title: "Anchor failed", description: e.message, variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchBcStatus();
    // pre-load recent blocks for local mode UX
    fetchBlocks(5);
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Ledger Verification"
        subtitle="Verify the integrity of the tamper-proof evidence chain"
        actions={
          <div className="flex gap-2">
            <Button onClick={verifyLedger} disabled={loading} className="bg-gradient-to-r from-primary to-primary-hover">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Verifying..." : "Verify Ledger"}
            </Button>
            <Button variant="outline" onClick={fetchBcStatus}>
              <Shield className="h-4 w-4 mr-2" />
              Blockchain Status
            </Button>
          </div>
        }
      />

      {/* Verification Status */}
      {verification && (
        <div className="mb-8">
          {verification.ok ? (
            <Alert className="border-success bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">
                <strong>Ledger Integrity Verified</strong> — All {verification.length} entries in the evidence chain are valid and tamper-free.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Ledger Integrity Compromised</strong> — Evidence chain verification failed. Immediate investigation required.
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
        <ForensicCard title="Chain Statistics" description="Current ledger state and metrics">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Ledger Entries</span>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {verification?.length ?? "—"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Ledger Status</span>
              {verification ? (
                verification.ok ? <Badge className="bg-success text-success-foreground">Valid</Badge> : <Badge variant="destructive">Compromised</Badge>
              ) : (
                <Badge variant="secondary">Unverified</Badge>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Hash Algorithm</span>
              <span className="font-mono text-sm">SHA-256</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Verified</span>
              <span className="text-sm">{verification ? new Date().toLocaleString() : "Never"}</span>
            </div>
          </div>
        </ForensicCard>

        {/* Blockchain Status */}
        <ForensicCard title="Blockchain Anchoring" description="Anchors ledger record hashes for external immutability">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Mode</span>
              <Badge>
                {bcStatus?.mode ? bcStatus.mode.toUpperCase() : "—"}
              </Badge>
            </div>

            {bcStatus?.mode === "local" && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Height</span>
                  <span className="font-mono text-sm">{(bcStatus as any).height}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tip Hash</span>
                  <span className="font-mono text-xs break-all">
                    {(bcStatus as any).tip_hash || "—"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => fetchBlocks(10)}>
                    <Blocks className={`h-4 w-4 mr-2 ${bcLoading ? "animate-spin" : ""}`} />
                    {bcLoading ? "Loading…" : "Load Last 10 Blocks"}
                  </Button>
                  <Button variant="outline" onClick={verifyBlockchain}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Verify Blockchain
                  </Button>
                </div>
              </>
            )}

            {bcStatus?.mode === "eth" && (
              <Alert variant={(bcStatus as any).configured ? "default" : "destructive"}>
                <Link2 className="h-4 w-4" />
                <AlertDescription>
                  {(bcStatus as any).configured ? "Ethereum anchoring configured" : "ETH not configured"}
                </AlertDescription>
              </Alert>
            )}

            {bcStatus?.mode === "off" && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>{(bcStatus as any).note || "Anchoring disabled"}</AlertDescription>
              </Alert>
            )}
          </div>
        </ForensicCard>
      </div>

      {/* Recent Blocks */}
      {bcBlocks.length > 0 && (
        <ForensicCard title="Recent Blocks" description="Latest blockchain blocks (local mode)">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2 pr-4">#</th>
                  <th className="py-2 pr-4">Timestamp</th>
                  <th className="py-2 pr-4">Hash</th>
                  <th className="py-2 pr-4">Prev</th>
                  <th className="py-2 pr-4">Data</th>
                  <th className="py-2 pr-4">Nonce</th>
                </tr>
              </thead>
              <tbody>
                {bcBlocks
                  .slice()
                  .reverse()
                  .map((b) => (
                    <tr key={`${b.index}-${b.hash}`} className="border-t">
                      <td className="py-2 pr-4 font-mono">{b.index}</td>
                      <td className="py-2 pr-4">{new Date(b.timestamp).toLocaleString()}</td>
                      <td className="py-2 pr-4 font-mono break-all">{b.hash}</td>
                      <td className="py-2 pr-4 font-mono break-all">{b.prev_hash}</td>
                      <td className="py-2 pr-4 font-mono break-all">{b.data}</td>
                      <td className="py-2 pr-4 font-mono">{b.nonce}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </ForensicCard>
      )}

      {/* Manual Anchor (optional) */}
      <ForensicCard title="Manual Anchor" description="Test anchoring any text or hash (optional; respects current mode)">
        <div className="grid md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-2">
            <Input
              placeholder="Paste any text or hash to anchor"
              value={anchorText}
              onChange={(e) => setAnchorText(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={manualAnchor}>
            <Hash className="h-4 w-4 mr-2" />
            Anchor
          </Button>
        </div>
        {anchorResult && (
          <div className="mt-3 text-xs text-muted-foreground break-all">
            <pre className="bg-muted p-3 rounded">{JSON.stringify(anchorResult, null, 2)}</pre>
          </div>
        )}
      </ForensicCard>
    </Layout>
  );
}
