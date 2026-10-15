import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { router } from "expo-router";

// PAGE: Book Token - PICK a service to get a token for.
// Different from Services page: Services = browse info, Book = take action.
const BOOKABLE = [
  { id: "1", name: "Birth Certificate", desc: "30 mins • 4 docs + 2 photos", icon: "📄", goTo: "/birth" },
  { id: "2", name: "Citizenship", desc: "45 mins • form + photos", icon: "👥", goTo: null },
  { id: "3", name: "Passport", desc: "60 mins • citizenship + photo", icon: "🛂", goTo: null },
  { id: "4", name: "Business Registration", desc: "40 mins • PAN + form", icon: "💼", goTo: null },
  { id: "5", name: "Marriage Registration", desc: "35 mins • citizenship of both", icon: "💍", goTo: null },
  { id: "6", name: "Land Transfer", desc: "50 mins • lalpurja + citizenship", icon: "🏠", goTo: null },
];

export default function BookScreen() {
  function onBook(item: (typeof BOOKABLE)[0]) {
    if (item.goTo) {
      router.push(item.goTo as any); // only Birth is fully ready
    } else {
      Alert.alert(item.name, "Online booking for this service is coming soon. Try Birth Certificate demo.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose service to book</Text>
      <Text style={styles.sub}>Tap Book to get a token number</Text>

      <FlatList
        data={BOOKABLE}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
            {/* Red Book button - different action than Services list */}
            <TouchableOpacity style={styles.bookBtn} onPress={() => onBook(item)}>
              <Text style={styles.bookText}>Book</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#102A4E", padding: 16 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  sub: { color: "#9AB", fontSize: 13, marginBottom: 12 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#1A3D62", borderRadius: 12, padding: 12, marginBottom: 10 },
  icon: { fontSize: 24, marginRight: 12 },
  name: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  desc: { color: "#9AB", fontSize: 12, marginTop: 2 },
  bookBtn: { backgroundColor: "#C84D5E", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16 },
  bookText: { color: "#fff", fontWeight: "bold" },
});
