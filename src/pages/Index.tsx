import { Link } from "react-router-dom";
import { Shield, AlertTriangle, Upload, Search, Database, Eye, FileText, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/layout";
import { ForensicCard } from "@/components/ui/forensic-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: "Alerts Dashboard",
      description: "Monitor suspicious activities and anomalies in real-time",
      href: "/alerts",
      color: "text-alert-medium"
    },
    {
      icon: Upload,
      title: "Create Event",
      description: "Record new donation events with GPS tracking and metadata",
      href: "/events/new",
      color: "text-primary"
    },
    {
      icon: FileText,
      title: "Upload Evidence",
      description: "Submit photos, documents, and data for forensic analysis",
      href: "/evidence/upload",
      color: "text-success"
    },
    {
      icon: Database,
      title: "Verify Ledger",
      description: "Check blockchain integrity and tamper-proof evidence chain",
      href: "/ledger",
      color: "text-primary"
    },
    {
      icon: Eye,
      title: "ELA Analysis",
      description: "Detect image tampering using Error Level Analysis",
      href: "/tools/ela",
      color: "text-warning"
    },
    {
      icon: Search,
      title: "NLP Summary",
      description: "Extract insights and entities from text evidence",
      href: "/tools/nlp",
      color: "text-accent-foreground"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-primary to-primary-hover rounded-full shadow-[var(--shadow-glow)]">
            <Shield className="h-16 w-16 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Hopemeals Guardian
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
          Tamper-proof evidence, smart anomaly detection, and rapid forensic investigations 
          for food donation supply chains.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-hover">
              Start Investigation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature) => (
          <Link key={feature.href} to={feature.href} className="group">
            <ForensicCard 
              title={feature.title} 
              description={feature.description}
              className="h-full transition-all duration-200 group-hover:shadow-[var(--shadow-elevated)] group-hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </ForensicCard>
          </Link>
        ))}
      </div>

      {/* What is Hopemeals Guardian */}
      <ForensicCard 
        title="What is Hopemeals Guardian?"
        description="A comprehensive cyber-forensics toolkit for donation transparency"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Badge variant="secondary" className="mt-1">1</Badge>
            <div>
              <h4 className="font-semibold text-foreground">Fraud Detection</h4>
              <p className="text-muted-foreground">Automatically detects suspicious patterns in food donation supply chains using AI-powered anomaly detection.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Badge variant="secondary" className="mt-1">2</Badge>
            <div>
              <h4 className="font-semibold text-foreground">Tamper-Proof Evidence</h4>
              <p className="text-muted-foreground">Maintains a cryptographic ledger of all evidence with SHA-256 hashes to ensure data integrity.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Badge variant="secondary" className="mt-1">3</Badge>
            <div>
              <h4 className="font-semibold text-foreground">Forensic Analysis</h4>
              <p className="text-muted-foreground">Provides advanced tools like Error Level Analysis for images and NLP summaries for rapid investigation.</p>
            </div>
          </div>
        </div>
      </ForensicCard>
    </Layout>
  );
};

export default Index;
