import { Search, X } from "lucide-react";

interface SearchFormProps {
  searchIp: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  error?: string;
}

export function SearchForm({
  searchIp,
  onSearchChange,
  onSearchSubmit,
  onClear,
  error,
}: SearchFormProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-[#ddd] p-4 sm:p-6">
      <form onSubmit={onSearchSubmit} className="flex flex-col sm:flex-row gap-3 relative">
        <div className="relative flex-1">
          <input
            className="w-full h-[50px] pl-10 pr-4 bg-[var(--color-card-bg)] border border-[#ddd] rounded-lg text-base outline-none focus:border-[var(--color-primary)] transition-colors"
            type="text"
            placeholder="Search valid IPv4 or IPv6 address..."
            value={searchIp}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="h-[50px] px-6 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Search
          </button>

          <button
            type="button"
            onClick={onClear}
            className="h-[50px] px-4 w-[50px] bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-200"
            title="Clear to my IP"
          >
            <X size={20} />
          </button>
        </div>
      </form>

      {error && (
        <p className="text-red-500 mt-3 text-sm flex items-center">{error}</p>
      )}
    </section>
  );
}
