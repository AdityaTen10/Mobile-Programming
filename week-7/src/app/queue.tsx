import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useApp } from "../data/store";

function Row({ token, initial, service, tag, myToken, nowServing }: any) {
  const isMe = token === myToken;
  const isServing = token === nowServing;
  return (
    <View style={[styles.row, isMe && styles.meRow, isServing && styles.servingRow]}>
      {/* Circle with initial letter */}
      <View style={[styles.circle, isMe && styles.meCircle]}>
        <Text style={styles.circleText}>{initial}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.token}>{token} {isMe ? "(You)" : ""}</Text>
        <Text style={styles.service}>{service}</Text>
      </View>
      <Text style={styles.tag}>{tag}</Text>
    </View>
  );
}

// PAGE: Queue Status - who is ahead / behind me?
// We show INITIAL only (R, K, S...) for privacy, not full names.
export default function QueueScreen() {
  const { queue, myToken, nowServing, peopleAhead } = useApp();

  const myIndex = queue.findIndex((q) => q.token === myToken);
  const ahead = queue.slice(0, myIndex); // everyone before me
  const behind = queue.slice(myIndex + 1); // everyone after me

  return (
    <View style={styles.container}>
      {/* Now serving banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>NOW SERVING</Text>
        <Text style={styles.bannerToken}>{nowServing}</Text>
        <Text style={styles.bannerSub}>{peopleAhead} ahead of you • ~{peopleAhead * 5 + 5} min wait</Text>
      </View>

      <Text style={styles.head}>Ahead of you ({ahead.length})</Text>
      <FlatList
        data={ahead}
        keyExtractor={(i) => i.token}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Row {...item} myToken={myToken} nowServing={nowServing} tag={item.token === nowServing ? "🟢 Serving" : "⏳ Waiting"} />
        )}
      />

      <Text style={styles.head}>Your turn</Text>
      <Row token={myToken} initial="S" service="Your token" tag="🔵 You" myToken={myToken} nowServing={nowServing} />

      <Text style={styles.head}>Behind you ({behind.length})</Text>
      {behind.map((p) => (
        <Row key={p.token} {...p} myToken={myToken} nowServing={nowServing} tag="🕒 After you" />
      ))}

      <TouchableOpacity style={styles.tip}>
        <Text style={styles.tipText}>Names hidden for privacy — only first initial shown.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#102A4E", padding: 16 },
  banner: { backgroundColor: "#1A3D62", borderRadius: 16, padding: 18, alignItems: "center", marginBottom: 14 },
  bannerLabel: { color: "#BBD6FF", fontSize: 12, fontWeight: "bold" },
  bannerToken: { color: "#fff", fontSize: 44, fontWeight: "bold" },
  bannerSub: { color: "#fff", fontSize: 13, marginTop: 4 },
  head: { color: "#fff", fontWeight: "bold", fontSize: 15, marginTop: 12, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", backgroundColor: "#1A3D62", borderRadius: 12, padding: 12, marginBottom: 8 },
  meRow: { borderWidth: 2, borderColor: "#C84D5E" },
  servingRow: { borderWidth: 1, borderColor: "#4ADE80" },
  circle: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#102A4E", justifyContent: "center", alignItems: "center", marginRight: 12 },
  meCircle: { backgroundColor: "#C84D5E" },
  circleText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  token: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  service: { color: "#9AB", fontSize: 12 },
  tag: { color: "#fff", fontSize: 12 },
  tip: { marginTop: 12, padding: 10 },
  tipText: { color: "#9AB", fontSize: 12, textAlign: "center" },
});
