import { GeoData } from "../../types/geo";
import { GeoDetail } from "../ui/GeoDetail";

interface GeoInfoCardProps {
  loading: boolean;
  currentGeo: GeoData | null;
  ownGeo: GeoData | null;
}

export function GeoInfoCard({ loading, currentGeo, ownGeo }: GeoInfoCardProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-[#ddd] p-0 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-[#ddd]">
        <h2 className="text-lg font-bold text-[#333]">Geolocation Details</h2>
        {currentGeo && ownGeo && currentGeo.ip === ownGeo.ip && (
          <span className="text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded-md mt-1 inline-block">
            Your Current IP
          </span>
        )}
      </div>

      {loading && !currentGeo ? (
        <div className="p-8 flex justify-center text-[var(--color-primary)]">
          Loading geo data...
        </div>
      ) : currentGeo ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-4">
          <GeoDetail label="IP Address" value={currentGeo.ip} />
          <GeoDetail label="City" value={currentGeo.city} />
          <GeoDetail label="Region" value={currentGeo.region} />
          <GeoDetail label="Country" value={currentGeo.country} />
          <GeoDetail label="Timezone" value={currentGeo.timezone} />
          <GeoDetail label="Coordinates" value={currentGeo.loc} />
          <div className="sm:col-span-2 md:col-span-3">
            <GeoDetail label="ISP / Organization" value={currentGeo.org} />
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">No data available</div>
      )}
    </section>
  );
}
