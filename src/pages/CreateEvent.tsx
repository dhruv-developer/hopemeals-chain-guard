import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin, Users, Package, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ForensicCard } from "@/components/ui/forensic-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api } from "@/lib/apiClient";
import { useToast } from "@/hooks/use-toast";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    donor_id: "",
    ngo_id: "",
    quantity: "",
    unit: "meals",
    gps_lat: "",
    gps_lon: "",
    timestamp: "",
    device_id: "",
    ip: "",
    beneficiary_ids: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        donor_id: formData.donor_id,
        ngo_id: formData.ngo_id,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        gps: {
          lat: parseFloat(formData.gps_lat),
          lon: parseFloat(formData.gps_lon)
        },
        timestamp: formData.timestamp || new Date().toISOString(),
        device_id: formData.device_id,
        ip: formData.ip,
        beneficiary_ids: formData.beneficiary_ids.split(",").map(id => id.trim()).filter(Boolean)
      };

      const response = await api<{ event_id: string; status: string }>("/events", {
        method: "POST",
        body: payload
      });

      setSuccess(`Event created successfully! ID: ${response.event_id}`);
      toast({
        title: "Event created",
        description: `Event ${response.event_id} has been recorded`,
      });

      // Store the event ID for quick access
      localStorage.setItem("lastEventId", response.event_id);
      
      setTimeout(() => {
        navigate(`/events/${response.event_id}`);
      }, 2000);

    } catch (error: any) {
      setError(error.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <PageHeader
        title="Create Event"
        subtitle="Record a new donation event with tracking metadata"
      />

      <div className="max-w-2xl mx-auto">
        <ForensicCard 
          title="Event Registration" 
          description="All fields are required for proper chain-of-custody tracking"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Action failed: {error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-success text-success">
                <Package className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Organization Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="donor_id">Donor ID</Label>
                <Input
                  id="donor_id"
                  value={formData.donor_id}
                  onChange={(e) => handleInputChange("donor_id", e.target.value)}
                  placeholder="e.g., d1, donor_abc"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ngo_id">NGO ID</Label>
                <Input
                  id="ngo_id"
                  value={formData.ngo_id}
                  onChange={(e) => handleInputChange("ngo_id", e.target.value)}
                  placeholder="e.g., n1, ngo_xyz"
                  required
                />
              </div>
            </div>

            {/* Donation Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="120"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => handleInputChange("unit", e.target.value)}
                  placeholder="meals, kg, packages"
                  required
                />
              </div>
            </div>

            {/* GPS Location */}
            <div className="space-y-4">
              <Label className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>GPS Coordinates</span>
              </Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gps_lat">Latitude</Label>
                  <Input
                    id="gps_lat"
                    type="number"
                    step="any"
                    value={formData.gps_lat}
                    onChange={(e) => handleInputChange("gps_lat", e.target.value)}
                    placeholder="28.61"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gps_lon">Longitude</Label>
                  <Input
                    id="gps_lon"
                    type="number"
                    step="any"
                    value={formData.gps_lon}
                    onChange={(e) => handleInputChange("gps_lon", e.target.value)}
                    placeholder="77.21"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="device_id">Device ID</Label>
                <Input
                  id="device_id"
                  value={formData.device_id}
                  onChange={(e) => handleInputChange("device_id", e.target.value)}
                  placeholder="dev_abc, mobile_001"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ip">IP Address</Label>
                <Input
                  id="ip"
                  value={formData.ip}
                  onChange={(e) => handleInputChange("ip", e.target.value)}
                  placeholder="203.0.113.7"
                  required
                />
              </div>
            </div>

            {/* Timestamp */}
            <div className="space-y-2">
              <Label htmlFor="timestamp">Timestamp (optional)</Label>
              <Input
                id="timestamp"
                type="datetime-local"
                value={formData.timestamp}
                onChange={(e) => handleInputChange("timestamp", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Leave empty to use current time
              </p>
            </div>

            {/* Beneficiaries */}
            <div className="space-y-2">
              <Label htmlFor="beneficiary_ids" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Beneficiary IDs</span>
              </Label>
              <Textarea
                id="beneficiary_ids"
                value={formData.beneficiary_ids}
                onChange={(e) => handleInputChange("beneficiary_ids", e.target.value)}
                placeholder="b101, b102, b103"
                rows={3}
              />
              <p className="text-sm text-muted-foreground">
                Comma-separated list of beneficiary identifiers
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary-hover"
              disabled={loading}
            >
              <Plus className="h-4 w-4 mr-2" />
              {loading ? "Creating Event..." : "Create Event"}
            </Button>
          </form>
        </ForensicCard>
      </div>
    </Layout>
  );
}