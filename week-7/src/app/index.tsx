import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useApp } from "../data/store";

// PAGE 1: Home - now shows LIVE token from store
export default function HomeScreen() {
  const { myToken, peopleAhead, nowServing } = useApp();
  const estTime = peopleAhead * 5 + 5; // ~5 min per person

  // Ward help card - info only, shows address/hours (does NOT go to /queue).
  const onHelp = () => {
    Alert.alert("Kathmandu Ward Office", "Open: Sun–Fri, 10 AM – 5 PM (public holidays closed).\nHelp line: 01-4261690\n\nVisit the ward counter with your documents.", [
      { text: "Got it" },
    ]);
  };

  return (
    <View style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.logo}>QueueNepal</Text>
        <Text style={styles.welcome}>Welcome, Sita 👋</Text>

        {/* Live token card - tap to see queue */}
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
          <Text style={styles.note}>You&apos;re almost next. Please be ready.</Text>
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

        {/* Ward help card - tap shows address/hours, goes nowhere */}
        <TouchableOpacity style={styles.helpCard} onPress={onHelp}>
          <Text style={styles.helpTitle}>🏢 Ward open Sun–Fri 10AM–5PM</Text>
          <Text style={styles.helpSub}>Help 01-4261690 — tap for address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pinned bottom pill - fixed just above the phone system buttons */}
      <SafeAreaView edges={["bottom"]}>
        <View style={styles.pillWrap}>
          <View style={styles.pill}>
            <TouchableOpacity style={styles.pillActive}>
              <Text style={styles.pillText}>🏠 Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pillBtn} onPress={() => router.push("/profile")}>
              <Text style={styles.pillText}>👤 Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#102A4E" },
  container: { flex: 1, backgroundColor: "#102A4E" },
  content: { flexGrow: 1, padding: 16, paddingBottom: 12 },
  logo: { color: "#fff", fontSize: 28, fontWeight: "bold", marginTop: 4 },
  welcome: { color: "#ccc", fontSize: 16, marginBottom: 8 },
  card: { backgroundColor: "#1A3D62", borderRadius: 16, padding: 16 },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  cardSub: { color: "#9AB", fontSize: 12, marginBottom: 8 },
  label: { color: "#9AB", fontSize: 12 },
  token: { color: "#fff", fontSize: 42, fontWeight: "bold" },
  badge: { color: "#fff", backgroundColor: "#C84D5E", alignSelf: "flex-start", padding: 6, borderRadius: 12, marginVertical: 6 },
  row: { flexDirection: "row", gap: 10, marginTop: 10 },
  miniCard: { flex: 1, backgroundColor: "#102A4E", borderRadius: 12, padding: 10 },
  miniLabel: { color: "#9AB", fontSize: 11 },
  miniValue: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  note: { color: "#9AB", fontSize: 12, marginTop: 8 },
  section: { color: "#fff", fontSize: 16, fontWeight: "bold", marginTop: 14, marginBottom: 6 },
  qBtn: { flex: 1, backgroundColor: "#1A3D62", borderRadius: 12, padding: 10, alignItems: "center" },
  qIcon: { fontSize: 22 },
  qText: { color: "#fff", fontSize: 11, marginTop: 4, textAlign: "center" },
  bigBtn: { backgroundColor: "#C84D5E", borderRadius: 14, padding: 16, marginTop: 12, alignItems: "center" },
  bigBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  helpCard: { backgroundColor: "#1A3D62", borderRadius: 14, padding: 14, marginTop: 12 },
  helpTitle: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  helpSub: { color: "#9AB", fontSize: 12, marginTop: 4 },
  pillWrap: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: "#102A4E" },
  pill: { flexDirection: "row", backgroundColor: "#1A3D62", borderRadius: 24, padding: 6, gap: 6 },
  pillBtn: { flex: 1, padding: 10, alignItems: "center", borderRadius: 18 },
  pillActive: { flex: 1, padding: 10, alignItems: "center", borderRadius: 18, backgroundColor: "#102A4E" },
  pillText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
});
