import { useEffect, useMemo, useState } from "react";
import { DiaryEntry } from "../context/DiaryContext";

export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [moodFilter, setMoodFilter] = useState(""); // Tambahan state mood

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredEntries = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return entries.filter((entry) => {
      // Cek apakah query cocok
      const matchQuery =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q);

      // Cek apakah mood cocok
      const matchMood = !moodFilter || entry.mood === moodFilter;

      // Harus cocok keduanya
      return matchQuery && matchMood;
    });
  }, [entries, debouncedQuery, moodFilter]); // Dependency ditambahkan

  return {
    query,
    setQuery,
    moodFilter,
    setMoodFilter,
    filteredEntries,
    resultCount: filteredEntries.length,
  };
}
