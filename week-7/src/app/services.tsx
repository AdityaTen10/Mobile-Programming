import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { router } from "expo-router";
import { GOV_SERVICES } from "../data/services";

// PAGE: Services list - tap goes to NEW detail website-page
export default function ServicesScreen() {
  const [search, setSearch] = useState("");

  const filtered = GOV_SERVICES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search services"
        placeholderTextColor="#9AB"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push({ pathname: "/service-detail", params: { id: item.id } })}
          >
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
  search: { backgroundColor: "#1A3D62", color: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", backgroundColor: "#1A3D62", borderRadius: 12, padding: 14, marginBottom: 10 },
  icon: { fontSize: 22, marginRight: 12 },
  name: { flex: 1, color: "#fff", fontSize: 15 },
  arrow: { color: "#9AB", fontSize: 20 },
});
