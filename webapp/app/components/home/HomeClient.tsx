"use client";

import dynamic from "next/dynamic";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import { useGeoData } from "../../hooks/useGeoData";
import { logout } from "../../actions/auth";

import { Header } from "../layout/Header";
import { SearchForm } from "./SearchForm";
import { GeoInfoCard } from "./GeoInfoCard";
import { SearchHistorySidebar } from "./SearchHistorySidebar";

const MapWithNoSSR = dynamic(() => import("../LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-xl border border-[#ddd]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
    </div>
  ),
});

export function HomeClient({ user }: { user: any }) {

  const {
    history,
    selectedHistoryConfig,
    addToHistory,
    toggleHistorySelection,
    deleteSelectedHistory,
  } = useSearchHistory();

  const {
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
  } = useGeoData(addToHistory);

  const coords = getCoordinates();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      <Header userName={user?.name} onSignOut={() => logout()} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        <SearchForm
          searchIp={searchIp}
          onSearchChange={setSearchIp}
          onSearchSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchIp);
          }}
          onClear={handleClear}
          error={error}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <GeoInfoCard
              loading={loading}
              currentGeo={currentGeo}
              ownGeo={ownGeo}
            />

            <section className="bg-white rounded-xl shadow-sm border border-[#ddd] p-0 flex flex-col h-[500px]">
              <div className="px-6 py-4 bg-gray-50 border-b border-[#ddd]">
                <h2 className="text-lg font-bold text-[#333]">Location Map</h2>
              </div>
              <div className="flex-1 p-4">
                {coords ? (
                  <MapWithNoSSR
                    lat={coords.lat}
                    lng={coords.lng}
                    popupText={`${
                      currentGeo?.city ? currentGeo.city + ", " : ""
                    }${currentGeo?.country || ""} (${currentGeo?.ip})`}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">
                      Map unavailable for this location
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6">
            <SearchHistorySidebar
              history={history}
              selectedHistoryConfig={selectedHistoryConfig}
              currentGeoIp={currentGeo?.ip}
              onToggleSelection={toggleHistorySelection}
              onDeleteSelected={deleteSelectedHistory}
              onHistoryClick={(item) => setFromHistory(item.data, item.ip)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
