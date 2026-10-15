import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import { router } from "expo-router";

// PAGE 2: List of government services (middle photo)
// FlatList = shows a scrolling list. Much better than copy-paste 10 times.
const ALL_SERVICES = [
  { id: "1", name: "Birth Certificate Registration", icon: "📄", goTo: "/birth" },
  { id: "2", name: "Citizenship Registration", icon: "👥", goTo: null },
  { id: "3", name: "Passport Registration", icon: "🛂", goTo: null },
  { id: "4", name: "Business Registration", icon: "💼", goTo: null },
  { id: "5", name: "Marriage Registration", icon: "💍", goTo: null },
  { id: "6", name: "Land Ownership Transfer", icon: "🏠", goTo: null },
];

export default function ServicesScreen() {
  // search = what user typed. setSearch changes it and screen updates.
  const [search, setSearch] = useState("");

  // Keep only services that match search text (case-insensitive)
  const filtered = ALL_SERVICES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // What happens when you tap a service
  const onTap = (item: (typeof ALL_SERVICES)[0]) => {
    if (item.goTo) {
      router.push(item.goTo as any); // go to Birth page (working demo)
    } else {
      Alert.alert(item.name, "This demo only opens Birth Registration.");
    }
  };

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
          // TouchableOpacity makes the whole row clickable
          <TouchableOpacity style={styles.row} onPress={() => onTap(item)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.name}>{item.name}</Text>
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
  name: { flex: 1, color: "#fff", fontSize: 15 },
  arrow: { color: "#9AB", fontSize: 20 },
});
