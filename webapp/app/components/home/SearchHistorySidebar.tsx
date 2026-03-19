import { Trash2 } from "lucide-react";
import { HistoryItem, GeoData } from "../../types/geo";

interface SearchHistorySidebarProps {
  history: HistoryItem[];
  selectedHistoryConfig: Set<string>;
  currentGeoIp?: string;
  onToggleSelection: (id: string) => void;
  onDeleteSelected: () => void;
  onHistoryClick: (item: HistoryItem) => void;
}

export function SearchHistorySidebar({
  history,
  selectedHistoryConfig,
  currentGeoIp,
  onToggleSelection,
  onDeleteSelected,
  onHistoryClick,
}: SearchHistorySidebarProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-[#ddd] flex flex-col h-[600px] lg:h-auto lg:flex-1">
      <div className="px-6 py-4 bg-gray-50 border-b border-[#ddd] flex justify-between items-center">
        <h2 className="text-lg font-bold text-[#333]">Search History</h2>
        {selectedHistoryConfig.size > 0 && (
          <button
            onClick={onDeleteSelected}
            className="flex items-center gap-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
          >
            <Trash2 size={14} /> Delete ({selectedHistoryConfig.size})
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {history.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm">
            No search history yet.
          </div>
        ) : (
          <ul className="space-y-1">
            {history.map((item) => (
              <li
                key={item.id}
                className={`flex items-center p-2 rounded-lg transition-colors border-l-2
                  ${
                    currentGeoIp === item.ip
                      ? "bg-blue-50 border-[var(--color-primary)]"
                      : "hover:bg-gray-50 border-transparent"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selectedHistoryConfig.has(item.id)}
                  onChange={() => onToggleSelection(item.id)}
                  className="mr-3 h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <button
                  onClick={() => onHistoryClick(item)}
                  className="flex-1 text-left flex flex-col"
                >
                  <span className="font-semibold text-[#333] tracking-tight">
                    {item.ip}
                  </span>
                  <span className="text-xs text-gray-500 truncate mt-0.5">
                    {item.data.city ? `${item.data.city}, ` : ""}
                    {item.data.country || "Unknown"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
