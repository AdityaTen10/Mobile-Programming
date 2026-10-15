import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getService } from "../data/services";

// PAGE: Service detail - website-like info page.
// Opened from Services with ?id=birth etc. Info only: Back button, no booking here.
export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const svc = getService(id);

  // Unknown id (e.g. typed URL by hand) - show a safe fallback.
  if (!svc) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Service not found</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>{svc.icon}</Text>
      <Text style={styles.title}>{svc.name}</Text>

      <Text style={styles.label}>WHERE TO GO</Text>
      <Text style={styles.value}>{svc.office}</Text>

      <Text style={styles.label}>LAW</Text>
      <Text style={styles.value}>{svc.law}</Text>

      <Text style={styles.label}>FEE</Text>
      <Text style={styles.value}>{svc.fee}</Text>

      <Text style={styles.label}>TIME</Text>
      <Text style={styles.value}>{svc.time}</Text>

      <Text style={styles.label}>DOCUMENTS NEEDED</Text>
      {svc.docs.map((d, i) => (
        <Text key={i} style={styles.item}>
          {i + 1}. {d}
        </Text>
      ))}

      <Text style={styles.label}>STEPS</Text>
      {svc.steps.map((s, i) => (
        <Text key={i} style={styles.item}>
          {i + 1}. {s}
        </Text>
      ))}

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#102A4E" },
  content: { padding: 16, paddingBottom: 32 },
  center: { flex: 1, backgroundColor: "#102A4E", padding: 16, justifyContent: "center", alignItems: "center" },
  icon: { fontSize: 40 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginTop: 8, marginBottom: 16 },
  label: { color: "#9AB", fontSize: 12, fontWeight: "bold", marginTop: 16, marginBottom: 4 },
  value: { color: "#fff", fontSize: 15, lineHeight: 22 },
  item: { color: "#fff", fontSize: 14, lineHeight: 22, marginTop: 4 },
  backBtn: { backgroundColor: "#1A3D62", borderRadius: 14, padding: 16, alignItems: "center", marginTop: 24 },
  backText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
