import { Stack } from "expo-router";
import { TokenProvider } from "../data/store";

// Every file inside src/app/ becomes a page.
// We wrap everything in TokenProvider so all pages share tokens/queue/records.
export default function RootLayout() {
  return (
    <TokenProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#102A4E" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: "#102A4E" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "QueueNepal", headerShown: false }} />
        <Stack.Screen name="services" options={{ title: "Government Services" }} />
        <Stack.Screen name="service-detail" options={{ title: "Service Info" }} />
        <Stack.Screen name="book" options={{ title: "Book Token" }} />
        <Stack.Screen name="birth" options={{ title: "Birth Registration" }} />
        <Stack.Screen name="queue" options={{ title: "Queue Status" }} />
        <Stack.Screen name="records" options={{ title: "My Records" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
      </Stack>
    </TokenProvider>
  );
}
