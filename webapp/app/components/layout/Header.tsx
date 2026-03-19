import { LogOut } from "lucide-react";

interface HeaderProps {
  userName?: string;
  onSignOut: () => void;
}

export function Header({ userName, onSignOut }: HeaderProps) {
  return (
    <header className="bg-white border-b border-[#eee] px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">
          IP Tracker
        </h1>
        <p className="text-sm text-[#666]">
          Welcome back, {userName || "User"}
        </p>
      </div>
      <button
        onClick={onSignOut}
        className="p-2 text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2 rounded-md hover:bg-gray-100"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline font-medium text-sm">Sign Out</span>
      </button>
    </header>
  );
}
