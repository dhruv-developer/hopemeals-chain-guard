export type Alert = {
  alert_id: string;
  event_id: string;
  severity: number;
  reasons: string[];
  score: number;
  created_at: string;
  status: string;
};

export type EventDoc = {
  _id: string;
  donor_id: string;
  ngo_id: string;
  quantity: number;
  unit: string;
  gps: { lat: number; lon: number };
  timestamp: string;
  device_id: string;
  ip: string;
  beneficiary_ids: string[];
  status: string;
};

export type EvidenceMeta = {
  _id: string;
  event_id: string;
  type: "image" | "csv" | "json" | "note";
  path: string;
  sha256: string;
  created_at: string;
};

export type User = {
  email: string;
  role: "admin" | "investigator" | "field";
};