import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useApp } from "../data/store";

// PAGE 3: Birth Registration + photo upload + REAL token booking
export default function BirthScreen() {
  const [myPhoto, setMyPhoto] = useState<string | null>(null);
  const [parentPhoto, setParentPhoto] = useState<string | null>(null);
  const { bookToken } = useApp(); // magic function that creates A-026, A-027...

  async function pickPhoto(which: "mine" | "parent") {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Need permission", "Allow photo access to upload.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (which === "mine") setMyPhoto(uri);
      else setParentPhoto(uri);
    }
  }

  function PhotoBox({ uri, onPick, label }: { uri: string | null; onPick: () => void; label: string }) {
    return (
      <TouchableOpacity style={styles.photoBox} onPress={onPick}>
        {uri ? (
          <Image source={{ uri }} style={styles.photo} />
        ) : (
          <Text style={styles.uploadText}>📷 Tap to upload{"\n"}{label}</Text>
        )}
      </TouchableOpacity>
    );
  }

  // When Book is pressed: make token + save records + go to Queue
  function onBook() {
    if (!myPhoto || !parentPhoto) {
      Alert.alert("Missing photos", "Please upload both passport photos first.");
      return;
    }
    // bookToken returns like "A-026" and adds you to queue + records
    // We also send the 2 photo uris, so Records page can show them later
    const newToken = bookToken(
      "Birth Certificate",
      ["Birth certificate", "Parent citizenship", "Application form"],
      [myPhoto, parentPhoto] // <-- THIS is the fix: save photos, not just names
    );
    Alert.alert("Success 🎉", `Your token is ${newToken}.`, [
      { text: "See my photos", onPress: () => router.push("/records") },
      { text: "See queue", onPress: () => router.push("/queue") },
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Birth Registration</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Required documents</Text>
        {["Birth certificate", "Parent's citizenship", "Application form"].map((d) => (
          <View key={d} style={styles.docRow}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.docText}>{d}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upload passport size photos</Text>
        <Text style={styles.label}>Your passport size photo</Text>
        <PhotoBox uri={myPhoto} onPick={() => pickPhoto("mine")} label="Your photo" />
        <Text style={styles.label}>Parent passport size photo</Text>
        <PhotoBox uri={parentPhoto} onPick={() => pickPhoto("parent")} label="Parent photo" />
        {myPhoto && parentPhoto && <Text style={styles.ok}>✅ Both photos ready!</Text>}
      </View>

      <Text style={styles.time}>⏱ Estimated time: 30 mins</Text>
      <TouchableOpacity style={styles.bookBtn} onPress={onBook}>
        <Text style={styles.bookText}>Book token</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#102A4E", padding: 16 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  card: { backgroundColor: "#1A3D62", borderRadius: 14, padding: 14, marginBottom: 14 },
  cardTitle: { color: "#9AB", fontSize: 13, marginBottom: 10 },
  docRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  check: { color: "#fff", backgroundColor: "#C84D5E", width: 24, height: 24, textAlign: "center", borderRadius: 12, marginRight: 10 },
  docText: { flex: 1, color: "#fff", fontSize: 14 },
  label: { color: "#fff", fontSize: 13, marginTop: 10, marginBottom: 6 },
  photoBox: { backgroundColor: "#102A4E", borderRadius: 12, height: 140, justifyContent: "center", alignItems: "center" },
  uploadText: { color: "#9AB", textAlign: "center" },
  photo: { width: "100%", height: 140, borderRadius: 12 },
  ok: { color: "#4ADE80", marginTop: 10 },
  time: { color: "#fff", fontSize: 15, fontWeight: "bold", marginBottom: 12 },
  bookBtn: { backgroundColor: "#C84D5E", borderRadius: 14, padding: 16, alignItems: "center", marginBottom: 30 },
  bookText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
