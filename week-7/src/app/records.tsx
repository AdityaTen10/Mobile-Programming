import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from "react-native";
import { router } from "expo-router";
import { useApp } from "../data/store";

// PAGE: My Records - now SHOWS the photos you sent.
// Tap a photo = full screen view. Tap X = close.
export default function RecordsScreen() {
  const { records } = useApp();
  const [bigPhoto, setBigPhoto] = useState<string | null>(null); // which photo is zoomed?

  if (records.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emoji}>📁</Text>
        <Text style={styles.emptyText}>No records yet. Book a token first.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push("/services")}>
          <Text style={styles.btnText}>Book now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={styles.container}
        data={records}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.service}>{item.service}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
            <Text style={styles.meta}>🎫 Token {item.token} • 📅 {item.date}</Text>

            <Text style={styles.docsLabel}>Documents given:</Text>
            {item.docs.map((d) => (
              <Text key={d} style={styles.doc}>✓ {d}</Text>
            ))}

            {/* PHOTOS YOU SENT */}
            <Text style={styles.docsLabel}>Photos you sent:</Text>
            {item.photos.length === 0 ? (
              <Text style={styles.noPhoto}>No photos in this old record.</Text>
            ) : (
              <View style={styles.photoRow}>
                {item.photos.map((uri, idx) => (
                  <TouchableOpacity key={idx} onPress={() => setBigPhoto(uri)}>
                    <Image source={{ uri }} style={styles.thumb} />
                    <Text style={styles.thumbLabel}>{idx === 0 ? "You" : "Parent"}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />

      {/* Full-screen photo viewer */}
      <Modal visible={bigPhoto !== null} transparent={true}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} onPress={() => setBigPhoto(null)}>
            <Text style={styles.closeText}>✕ Close</Text>
          </TouchableOpacity>
          {bigPhoto && <Image source={{ uri: bigPhoto }} style={styles.big} resizeMode="contain" />}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#102A4E", padding: 16 },
  empty: { flex: 1, backgroundColor: "#102A4E", justifyContent: "center", alignItems: "center", padding: 20 },
  emoji: { fontSize: 50 },
  emptyText: { color: "#fff", marginVertical: 12 },
  btn: { backgroundColor: "#C84D5E", borderRadius: 12, padding: 14, width: "80%", alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
  card: { backgroundColor: "#1A3D62", borderRadius: 14, padding: 14, marginBottom: 12 },
  topRow: { flexDirection: "row", justifyContent: "space-between" },
  service: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  status: { color: "#4ADE80", fontSize: 12 },
  meta: { color: "#9AB", fontSize: 12, marginVertical: 6 },
  docsLabel: { color: "#fff", fontSize: 13, marginTop: 8, fontWeight: "bold" },
  doc: { color: "#BBD6FF", fontSize: 13, marginTop: 2 },
  noPhoto: { color: "#9AB", fontSize: 12 },
  photoRow: { flexDirection: "row", gap: 10, marginTop: 8 },
  thumb: { width: 100, height: 120, borderRadius: 10 },
  thumbLabel: { color: "#9AB", fontSize: 11, textAlign: "center", marginTop: 4 },
  modal: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center" },
  close: { position: "absolute", top: 50, right: 20, padding: 12 },
  closeText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  big: { width: "90%", height: "70%" },
});
