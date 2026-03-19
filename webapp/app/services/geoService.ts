import { GeoData } from "../types/geo";

export const geoService = {
  fetchOwnGeo: async (): Promise<GeoData> => {
    const res = await fetch("https://ipinfo.io//geo");
    if (!res.ok) throw new Error("Failed to fetch own IP geo data");
    return res.json();
  },

  fetchIpGeo: async (ip: string): Promise<GeoData> => {
    const res = await fetch(`https://ipinfo.io/${ip}/geo`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message || "Invalid IP or IP not found");
    }
    return data;
  },
};
