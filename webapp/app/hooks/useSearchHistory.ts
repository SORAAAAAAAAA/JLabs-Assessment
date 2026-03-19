import { useState, useEffect } from "react";
import { HistoryItem, GeoData } from "../types/geo";

export function useSearchHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedHistoryConfig, setSelectedHistoryConfig] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const savedHistory = localStorage.getItem("ip_search_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
      }
    }
  }, []);

  const addToHistory = (ip: string, data: GeoData) => {
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      ip,
      data,
      timestamp: Date.now(),
    };

    const newHistory = [
      newHistoryItem,
      ...history.filter((h) => h.ip !== ip),
    ].slice(0, 20);

    setHistory(newHistory);
    localStorage.setItem("ip_search_history", JSON.stringify(newHistory));
  };

  const toggleHistorySelection = (id: string) => {
    const newSelected = new Set(selectedHistoryConfig);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedHistoryConfig(newSelected);
  };

  const deleteSelectedHistory = () => {
    const newHistory = history.filter((h) => !selectedHistoryConfig.has(h.id));
    setHistory(newHistory);
    localStorage.setItem("ip_search_history", JSON.stringify(newHistory));
    setSelectedHistoryConfig(new Set());
  };

  return {
    history,
    selectedHistoryConfig,
    addToHistory,
    toggleHistorySelection,
    deleteSelectedHistory,
  };
}
