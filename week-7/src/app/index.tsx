import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useApp } from "../data/store";

// Home - bottom pill fixed just above phone back button
export default function HomeScreen() {
  const { myToken, peopleAhead, nowServing } = useApp();
  const estTime = peopleAhead * 5 + 5;

  return (
    <View style={styles.screen}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <Text style={styles.logo}>QueueNepal</Text>
        <Text style={styles.welcome}>Welcome, Sita 👋</Text>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/queue")}>
          <Text style={styles.cardTitle}>🏛️ Kathmandu Ward Office</Text>
          <Text style={styles.cardSub}>Now serving: {nowServing} • Government Service</Text>
          <Text style={styles.label}>Your token</Text>
          <Text style={styles.token}>{myToken}</Text>
          <Text style={styles.badge}>● Turn approaching</Text>
          <View style={styles.row}>
            <View style={styles.miniCard}>
              <Text style={styles.miniLabel}>People ahead</Text>
              <Text style={styles.miniValue}>{peopleAhead}</Text>
            </View>
            <View style={styles.miniCard}>
              <Text style={styles.miniLabel}>Estimated time</Text>
              <Text style={styles.miniValue}>{estTime} min</Text>
            </View>
          </View>
          <Text style={styles.note}>You're almost next. Please be ready.</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Quick Services</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.qBtn} onPress={() => router.push("/book")}>
            <Text style={styles.qIcon}>📅</Text>
            <Text style={styles.qText}>Book token</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.qBtn} onPress={() => router.push("/services")}>
            <Text style={styles.qIcon}>📄</Text>
            <Text style={styles.qText}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.qBtn} onPress={() => router.push("/queue")}>
            <Text style={styles.qIcon}>👥</Text>
            <Text style={styles.qText}>Queue status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.qBtn} onPress={() => router.push("/records")}>
            <Text style={styles.qIcon}>📁</Text>
            <Text style={styles.qText}>My records</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bigBtn} onPress={() => router.push("/queue")}>
          <Text style={styles.bigBtnText}>View queue status ›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.helpCard}
          onPress={() => Alert.alert("Kathmandu Ward Office", "📍 Kathmandu Ward 12\n🕙 Sun–Fri • 10AM–5PM\n📞 Help: 01-4261690\nBring original + 1 copy of all docs", [{ text: "Got it" }])}
        >
          <Text style={styles.helpTitle}>🏛️ Ward open Sun–Fri • 10AM–5PM</Text>
          <Text style={styles.helpSub}>📞 Help: 01-4261690 • Tap for address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed just above phone back button, nothing below it */}
      <SafeAreaView edges={["bottom"]} style={styles.safeBottom}>
        <View style={styles.bottomPill}>
          <View style={styles.tabActive}>
            <Text style={styles.tabActiveText}>🏠 Home</Text>
          </View>
          <TouchableOpacity style={styles.tab} onPress={() => router.push("/profile")}>
            <Text style={styles.tabText}>👤 Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#102A4E" },
  content: { padding: 16, paddingTop: 8, paddingBottom: 8 },
  safeBottom: { backgroundColor: "#102A4E" },
  bottomPill: { flexDirection: "row", backgroundColor: "#1A3D62", borderRadius: 24, padding: 6, marginHorizontal: 16, marginTop: 6, marginBottom: 2 },
  tabActive: { flex: 1, backgroundColor: "#2A5A85", borderRadius: 18, padding: 10, alignItems: "center" },
  tabActiveText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
  tab: { flex: 1, padding: 10, alignItems: "center" },
  tabText: { color: "#9AB", fontSize: 13 },
  logo: { color: "#fff", fontSize: 28, fontWeight: "bold", marginTop: 4 },
  welcome: { color: "#ccc", fontSize: 16, marginBottom: 10 },
  card: { backgroundColor: "#1A3D62", borderRadius: 16, padding: 16 },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  cardSub: { color: "#9AB", fontSize: 12, marginBottom: 8 },
  label: { color: "#9AB", fontSize: 12 },
  token: { color: "#fff", fontSize: 42, fontWeight: "bold" },
  badge: { color: "#fff", backgroundColor: "#C84D5E", alignSelf: "flex-start", padding: 6, borderRadius: 12, marginVertical: 6 },
  row: { flexDirection: "row", gap: 10, marginTop: 8 },
  miniCard: { flex: 1, backgroundColor: "#102A4E", borderRadius: 12, padding: 10 },
  miniLabel: { color: "#9AB", fontSize: 11 },
  miniValue: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  note: { color: "#9AB", fontSize: 12, marginTop: 8 },
  section: { color: "#fff", fontSize: 16, fontWeight: "bold", marginTop: 14, marginBottom: 2 },
  qBtn: { flex: 1, backgroundColor: "#1A3D62", borderRadius: 12, padding: 10, alignItems: "center" },
  qIcon: { fontSize: 22 },
  qText: { color: "#fff", fontSize: 11, marginTop: 4, textAlign: "center" },
  bigBtn: { backgroundColor: "#C84D5E", borderRadius: 12, padding: 12, marginTop: 10, alignItems: "center" },
  bigBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  helpCard: { backgroundColor: "#1A3D62", borderRadius: 12, padding: 12, marginTop: 10 },
  helpTitle: { color: "#fff", fontSize: 13, fontWeight: "bold", textAlign: "center" },
  helpSub: { color: "#9AB", fontSize: 11, textAlign: "center", marginTop: 4 },
});
