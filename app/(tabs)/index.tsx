import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["😌", "🎯", "🥳", "🤩"]; // Tambahkan array mood

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const {
    query,
    setQuery,
    moodFilter,
    setMoodFilter,
    filteredEntries,
    resultCount,
  } = useDiarySearch(entries);
  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback(
    (id: number) => {
      router.push({ pathname: "/detail/[id]", params: { id: String(id) } });
    },
    [router],
  );

  // Fungsi Reset digabungkan
  const resetFilter = useCallback(() => {
    setQuery("");
    setMoodFilter("");
    searchRef.current?.focus();
  }, [setQuery, setMoodFilter]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary..."
          style={styles.search}
        />
        <Pressable onPress={resetFilter} style={styles.clearButton}>
          <Text>Reset</Text>
        </Pressable>
      </View>

      {/* Filter Mood UI */}
      <View style={styles.moodContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moodScroll}
        >
          {MOODS.map((m) => (
            <Pressable
              key={m}
              onPress={() => setMoodFilter(m === moodFilter ? "" : m)}
              style={[
                styles.moodBadge,
                moodFilter === m && styles.moodBadgeActive,
              ]}
            >
              <Text style={styles.moodText}>{m}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Diary tidak ditemukan.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  searchRow: { flexDirection: "row", gap: SPACE.s },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  clearButton: {
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  moodContainer: { marginTop: SPACE.m },
  moodScroll: { gap: SPACE.s },
  moodBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
  },
  moodBadgeActive: { borderColor: COLORS.accent, backgroundColor: "#EFF6FF" },
  moodText: { fontSize: 20 },
  counter: { color: COLORS.muted, marginVertical: SPACE.s },
  list: { gap: SPACE.m, paddingBottom: SPACE.xl },
  empty: { textAlign: "center", color: COLORS.muted, paddingTop: 40 },
});
