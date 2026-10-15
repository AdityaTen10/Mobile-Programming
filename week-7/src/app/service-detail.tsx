import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { GOV_SERVICES } from "../data/services";

// NEW PAGE: Service detail like a mini-website.
// Opened from Services list with id, e.g. /service-detail?id=1
export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = GOV_SERVICES.find((s) => s.id === id);

  if (!service) {
    return (
      <View style={styles.center}>
        <Text style={styles.name}>Service not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.icon}>{service.icon}</Text>
      <Text style={styles.title}>{service.name}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📍 WHERE TO GO</Text>
        <Text style={styles.text}>{service.office}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📜 LAW</Text>
        <Text style={styles.text}>{service.law}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.mini}>
          <Text style={styles.label}>💰 FEE</Text>
          <Text style={styles.text}>{service.fee}</Text>
        </View>
        <View style={styles.mini}>
          <Text style={styles.label}>⏱ TIME</Text>
          <Text style={styles.text}>{service.time}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📄 REQUIRED DOCUMENTS</Text>
        {service.docs.map((d) => (
          <Text key={d} style={styles.bullet}>✓ {d}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>👣 STEPS</Text>
        {service.steps.map((s, i) => (
          <View key={s} style={styles.stepRow}>
            <Text style={styles.num}>{i + 1}</Text>
            <Text style={styles.text}>{s}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Back to services</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#102A4E", padding: 16 },
  center: { flex: 1, backgroundColor: "#102A4E", justifyContent: "center", alignItems: "center" },
  icon: { fontSize: 48, textAlign: "center", marginTop: 8 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  card: { backgroundColor: "#1A3D62", borderRadius: 14, padding: 14, marginBottom: 12 },
  row: { flexDirection: "row", gap: 10, marginBottom: 12 },
  mini: { flex: 1, backgroundColor: "#1A3D62", borderRadius: 14, padding: 14 },
  label: { color: "#9AB", fontSize: 12, fontWeight: "bold", marginBottom: 6 },
  text: { color: "#fff", fontSize: 14, flex: 1 },
  bullet: { color: "#fff", fontSize: 14, marginTop: 4 },
  stepRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 10 },
  num: { color: "#fff", backgroundColor: "#C84D5E", width: 24, height: 24, textAlign: "center", borderRadius: 12 },
  name: { color: "#fff", fontSize: 16 },
  backBtn: { padding: 16, alignItems: "center" },
  backText: { color: "#9AB", fontSize: 14 },
});
