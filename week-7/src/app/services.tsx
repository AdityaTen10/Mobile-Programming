import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { router } from "expo-router";
import { GOV_SERVICES } from "../data/services";

// PAGE 2: Government services - info only, no booking here.
// Tap a service to open its detail page (/service-detail?id=...).
// Booking lives on the separate Book page.
export default function ServicesScreen() {
  // search = what user typed. setSearch changes it and screen updates.
  const [search, setSearch] = useState("");

  // Keep only services that match search text (case-insensitive)
  const filtered = GOV_SERVICES.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      {/* Search box */}
      <TextInput
        style={styles.search}
        placeholder="Search services"
        placeholderTextColor="#9AB"
        value={search}
        onChangeText={setSearch} // every letter updates list
      />

      {/* The list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // Whole row opens the info detail page for that service
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push({ pathname: "/service-detail", params: { id: item.id } })}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.office}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#102A4E", padding: 16 },
  search: {
    backgroundColor: "#1A3D62",
    color: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A3D62",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  icon: { fontSize: 22, marginRight: 12 },
  info: { flex: 1 },
  name: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  sub: { color: "#9AB", fontSize: 12, marginTop: 2 },
  arrow: { color: "#9AB", fontSize: 20 },
});
