import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { GOV_SERVICES } from "../data/services";

// PAGE: Book a token - pick a service, then book.
// Only Birth has a working booking flow (/birth).
// Others show a "coming soon" alert for now.
export default function BookScreen() {
  const onBook = (id: string, name: string) => {
    if (id === "birth") {
      router.push("/birth");
    } else {
      Alert.alert(name, "Online booking for this service is coming soon. Please visit the office for now.");
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <FlatList
        data={GOV_SERVICES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                ⏱ {item.shortTime} • 📎 {item.shortDocs}
              </Text>
            </View>
            <TouchableOpacity style={styles.bookBtn} onPress={() => onBook(item.id, item.name)}>
              <Text style={styles.bookText}>Book</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#102A4E" },
  list: { padding: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A3D62",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  icon: { fontSize: 26, marginRight: 12 },
  info: { flex: 1 },
  name: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  meta: { color: "#9AB", fontSize: 12, marginTop: 4 },
  bookBtn: { backgroundColor: "#C84D5E", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 18 },
  bookText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
