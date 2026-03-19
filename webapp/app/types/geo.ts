export interface GeoData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

export interface HistoryItem {
  id: string;
  ip: string;
  data: GeoData;
  timestamp: number;
}
