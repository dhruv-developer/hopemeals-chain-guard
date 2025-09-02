import { Shield, Lock, Search, Zap, Database, Eye } from "lucide-react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ForensicCard } from "@/components/ui/forensic-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/config";

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Fraud Detection",
      description: "Advanced AI algorithms detect suspicious patterns, impossible routes, and quantity anomalies in donation supply chains.",
      color: "text-primary"
    },
    {
      icon: Lock,
      title: "Tamper-Proof Ledger",
      description: "All evidence is cryptographically hashed with SHA-256 and stored in an immutable chain-of-custody ledger.",
      color: "text-success"
    },
    {
      icon: Eye,
      title: "Image Forensics",
      description: "Error Level Analysis (ELA) detects digital image tampering and manipulation attempts in submitted evidence.",
      color: "text-warning"
    },
    {
      icon: Search,
      title: "NLP Analysis",
      description: "Natural Language Processing extracts entities, summarizes text evidence, and identifies key information patterns.",
      color: "text-accent-foreground"
    },
    {
      icon: Zap,
      title: "Real-Time Alerts",
      description: "Instant notifications for high-severity anomalies requiring immediate investigator attention.",
      color: "text-alert-high"
    },
    {
      icon: Database,
      title: "Chain Verification",
      description: "Verify the integrity of the entire evidence ledger to ensure no tampering or data corruption.",
      color: "text-muted-foreground"
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="About Hopemeals Guardian"
        subtitle="Comprehensive cyber-forensics toolkit for donation transparency"
      />

      {/* Overview */}
      <ForensicCard 
        title="Mission Statement" 
        description="Ensuring food donations reach real beneficiaries through advanced forensic technology"
        className="mb-8"
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Hopemeals Guardian is an AI-powered cyber-forensics platform designed to combat fraud 
            in food donation ecosystems. By combining blockchain-style ledger technology, advanced 
            anomaly detection, and forensic analysis tools, we provide NGOs and donors with the 
            confidence that their contributions reach genuine beneficiaries.
          </p>
        </div>
      </ForensicCard>

      {/* Features Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Core Capabilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ForensicCard 
              key={index}
              title={feature.title}
              description={feature.description}
            >
              <div className="flex justify-center mb-4">
                <feature.icon className={`h-12 w-12 ${feature.color}`} />
              </div>
            </ForensicCard>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <ForensicCard 
        title="How It Works" 
        description="A three-stage process for comprehensive fraud prevention"
        className="mb-8"
      >
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Badge className="mt-1 bg-primary">1</Badge>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Data Collection</h4>
              <p className="text-muted-foreground">
                Events are recorded with GPS coordinates, timestamps, device IDs, and beneficiary information. 
                All evidence is cryptographically hashed and stored in the tamper-proof ledger.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Badge className="mt-1 bg-primary">2</Badge>
            <div>
              <h4 className="font-semibold text-foreground mb-2">AI Analysis</h4>
              <p className="text-muted-foreground">
                Machine learning algorithms analyze patterns to detect anomalies such as impossible travel routes, 
                quantity surges, duplicate beneficiaries, and timing inconsistencies.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Badge className="mt-1 bg-primary">3</Badge>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Investigation & Verification</h4>
              <p className="text-muted-foreground">
                Investigators review alerts, perform forensic analysis on evidence, and verify the chain-of-custody 
                to confirm or refute potential fraud cases.
              </p>
            </div>
          </div>
        </div>
      </ForensicCard>

      {/* Technical Details */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ForensicCard title="System Architecture" description="Built for security and scalability">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frontend:</span>
              <span className="font-medium">React + TypeScript</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Backend API:</span>
              <span className="font-medium">FastAPI + Python</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Database:</span>
              <span className="font-medium">MongoDB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cryptography:</span>
              <span className="font-medium">SHA-256 Hashing</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">AI/ML:</span>
              <span className="font-medium">scikit-learn + spaCy</span>
            </div>
          </div>
        </ForensicCard>

        <ForensicCard title="Current Environment" description="Development configuration">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">API Base URL:</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">{API_BASE_URL}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Environment:</span>
              <Badge variant="outline">Development</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version:</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="pt-4">
              <Button variant="outline" size="sm" className="w-full">
                <a href={`${API_BASE_URL}/docs`} target="_blank" rel="noopener noreferrer">
                  View API Documentation
                </a>
              </Button>
            </div>
          </div>
        </ForensicCard>
      </div>

      {/* Contact & Links */}
      <ForensicCard 
        title="Get Started" 
        description="Ready to secure your donation supply chain?"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-primary to-primary-hover">
            Contact Support
          </Button>
          <Button variant="outline">
            Documentation
          </Button>
          <Button variant="outline">
            Training Materials
          </Button>
        </div>
      </ForensicCard>
    </Layout>
  );
}