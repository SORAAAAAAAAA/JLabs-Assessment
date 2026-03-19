import { useState, useEffect, useCallback } from "react";
import { GeoData } from "../types/geo";
import { geoService } from "../services/geoService";
import { isValidIp } from "../utils/validators";

export function useGeoData(addToHistory: (ip: string, data: GeoData) => void) {
  const [ownGeo, setOwnGeo] = useState<GeoData | null>(null);
  const [currentGeo, setCurrentGeo] = useState<GeoData | null>(null);
  const [searchIp, setSearchIp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    geoService
      .fetchOwnGeo()
      .then((data) => {
        setOwnGeo(data);
        setCurrentGeo(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = useCallback(
    async (ipToSearch: string) => {
      setError("");

      if (!ipToSearch.trim()) {
        setError("Please enter an IP address");
        return;
      }

      if (!isValidIp(ipToSearch)) {
        setError("Please enter a valid IPv4 or IPv6 address");
        return;
      }

      setLoading(true);
      try {
        const data = await geoService.fetchIpGeo(ipToSearch);
        setCurrentGeo(data);
        addToHistory(data.ip, data);
        setSearchIp(data.ip);
      } catch (err: any) {
        setError(err.message || "Failed to fetch geolocation data");
      } finally {
        setLoading(false);
      }
    },
    [addToHistory]
  );

  const handleClear = useCallback(() => {
    setSearchIp("");
    setError("");
    setCurrentGeo(ownGeo);
  }, [ownGeo]);

  const setFromHistory = useCallback((data: GeoData, ip: string) => {
    setCurrentGeo(data);
    setSearchIp(ip);
    setError("");
  }, []);

  const getCoordinates = () => {
    if (currentGeo?.loc) {
      const [lat, lng] = currentGeo.loc.split(",");
      return { lat: parseFloat(lat), lng: parseFloat(lng) };
    }
    return null;
  };

  return {
    ownGeo,
    currentGeo,
    searchIp,
    setSearchIp,
    error,
    loading,
    handleSearch,
    handleClear,
    setFromHistory,
    getCoordinates,
  };
}
