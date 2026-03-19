export function GeoDetail({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="bg-[var(--color-card-bg)] p-3 rounded-lg border border-[#eee]">
      <p className="text-xs text-[#999] uppercase tracking-wider font-semibold mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-[#333] break-all">
        {value || "N/A"}
      </p>
    </div>
  );
}
