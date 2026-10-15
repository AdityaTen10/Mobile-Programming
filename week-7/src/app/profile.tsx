import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { useApp } from "../data/store";

// PAGE: Profile - good looking version
export default function ProfileScreen() {
  const { myToken, records, peopleAhead } = useApp();

  return (
    <ScrollView style={styles.container}>
      {/* Cover header */}
      <View style={styles.cover}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
        </View>
        <Text style={styles.name}>Sita Sharma</Text>
        <Text style={styles.sub}>📍 Kathmandu Ward 12 • Verified ✅</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => Alert.alert("Edit", "Edit profile coming soon.")}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats: 3 boxes */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{myToken}</Text>
          <Text style={styles.statLabel}>Active token</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{records.length}</Text>
          <Text style={styles.statLabel}>Documents</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{peopleAhead}</Text>
          <Text style={styles.statLabel}>Ahead</Text>
        </View>
      </View>

      {/* Menu - each row is touchable */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.item} onPress={() => router.push("/records")}>
          <Text style={styles.icon}>📁</Text>
          <Text style={styles.itemText}>My records</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => router.push("/queue")}>
          <Text style={styles.icon}>👥</Text>
          <Text style={styles.itemText}>Queue status</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => router.push("/services")}>
          <Text style={styles.icon}>📄</Text>
          <Text style={styles.itemText}>All services</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => Alert.alert("Settings", "Language: Nepali / English")}>
          <Text style={styles.icon}>⚙️</Text>
          <Text style={styles.itemText}>Settings</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item, styles.logout]} onPress={() => Alert.alert("Logout", "Demo only, no logout.")}>
          <Text style={styles.icon}>🚪</Text>
          <Text style={[styles.itemText, { color: "#FF7A7A" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#102A4E" },
  cover: { backgroundColor: "#1A3D62", padding: 24, alignItems: "center", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#C84D5E", justifyContent: "center", alignItems: "center", marginTop: 10, borderWidth: 3, borderColor: "#fff" },
  avatarText: { color: "#fff", fontSize: 36, fontWeight: "bold" },
  name: { color: "#fff", fontSize: 22, fontWeight: "bold", marginTop: 10 },
  sub: { color: "#9AB", fontSize: 13, marginTop: 4 },
  editBtn: { backgroundColor: "#102A4E", borderRadius: 20, paddingVertical: 8, paddingHorizontal: 20, marginTop: 12 },
  editText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
  stats: { flexDirection: "row", gap: 10, padding: 16 },
  stat: { flex: 1, backgroundColor: "#1A3D62", borderRadius: 14, padding: 14, alignItems: "center" },
  statNum: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  statLabel: { color: "#9AB", fontSize: 11, marginTop: 4 },
  menu: { padding: 16, gap: 8 },
  item: { flexDirection: "row", alignItems: "center", backgroundColor: "#1A3D62", borderRadius: 12, padding: 14 },
  logout: { marginTop: 8 },
  icon: { fontSize: 20, marginRight: 12 },
  itemText: { flex: 1, color: "#fff", fontSize: 15 },
  arrow: { color: "#9AB", fontSize: 20 },
});
