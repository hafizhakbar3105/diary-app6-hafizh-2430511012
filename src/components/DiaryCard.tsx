import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SPACE, TYPO } from "../styles/tokens";

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleLike: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleLike,
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.main}>
        <View style={styles.moodContainer}>
          <Text style={styles.mood}>{mood}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={onToggleLike} style={styles.likeButton}>
        <Text style={styles.like}>{liked ? "❤️" : "🤍"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    marginBottom: SPACE.s,
    // Menghilangkan border kaku dan menggantinya dengan shadow
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 4, // Efek bayangan untuk Android
      },
    }),
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACE.l,
    gap: SPACE.l,
  },
  moodContainer: {
    backgroundColor: COLORS.background, // Memberi alas melingkar pada emoji
    padding: SPACE.m,
    borderRadius: RADIUS.badge,
  },
  mood: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: "800", // Ditebalkan sedikit
    color: COLORS.text,
    marginBottom: 2,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: 6,
    fontWeight: "500",
  },
  preview: {
    fontSize: TYPO.body,
    color: COLORS.text,
    lineHeight: 20, // Jarak antar baris agar lebih mudah dibaca
  },
  likeButton: {
    padding: SPACE.l,
    justifyContent: "center",
    alignItems: "center",
  },
  like: {
    fontSize: 24,
  },
});
