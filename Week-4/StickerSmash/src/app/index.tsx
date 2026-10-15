import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>

      {/* ================= HEADER ================= */}

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 18,
          },
        ]}
      >
        <View>
          <Text style={styles.logo}>QueueNepal</Text>

          <Text style={styles.welcome}>
            Welcome 👋
          </Text>
        </View>

        <TouchableOpacity style={styles.notification}>
          <Text style={styles.bell}>🔔</Text>
        </TouchableOpacity>
      </View>


      {/* ================= MAIN CONTENT ================= */}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}

        >

        {/* Current Queue */}

        <Text style={styles.title}>
          My Current Queue
        </Text>

        <View style={styles.queueCard}>

          <Text style={styles.office}>
            Kathmandu Metropolitan Ward Office
          </Text>

          <View style={styles.token}>

            <Text style={styles.small}>
              Your Token
            </Text>

            <Text style={styles.tokenNumber}>
              A-025
            </Text>

          </View>


          <View style={styles.queueInfo}>

            <View style={styles.info}>

              <Text style={styles.number}>
                8
              </Text>

              <Text style={styles.label}>
                People Ahead
              </Text>

            </View>


            <View style={styles.info}>

              <Text style={styles.number}>
                25 min
              </Text>

              <Text style={styles.label}>
                Estimated Wait
              </Text>

            </View>

          </View>


          <View style={styles.status}>

            <Text style={styles.statusText}>
              ● Your turn is approaching
            </Text>

          </View>


          <TouchableOpacity style={styles.button}>

            <Text style={styles.buttonText}>
              View Queue Status
            </Text>

          </TouchableOpacity>

        </View>


        {/* Quick Services */}

        <Text style={styles.title}>
          Quick Services
        </Text>


        <View style={styles.grid}>

          <TouchableOpacity style={styles.service}>

            <Text style={styles.icon}>
              🎟️
            </Text>

            <Text style={styles.serviceTitle}>
              Book Token
            </Text>

            <Text style={styles.serviceText}>
              Reserve your queue
            </Text>

          </TouchableOpacity>


          <TouchableOpacity style={styles.service}>

            <Text style={styles.icon}>
              📋
            </Text>

            <Text style={styles.serviceTitle}>
              Services
            </Text>

            <Text style={styles.serviceText}>
              View requirements
            </Text>

          </TouchableOpacity>


          <TouchableOpacity style={styles.service}>

            <Text style={styles.icon}>
              ⏱️
            </Text>

            <Text style={styles.serviceTitle}>
              Queue Status
            </Text>

            <Text style={styles.serviceText}>
              Track your token
            </Text>

          </TouchableOpacity>


          <TouchableOpacity style={styles.service}>

            <Text style={styles.icon}>
              📄
            </Text>

            <Text style={styles.serviceTitle}>
              My Records
            </Text>

            <Text style={styles.serviceText}>
              Service history
            </Text>

          </TouchableOpacity>

        </View>


        {/* Government Services */}

        <Text style={styles.title}>
          Government Services
        </Text>


        <TouchableOpacity style={styles.serviceCard}>

          <Text style={styles.serviceHeading}>
            🏠 Birth Registration
          </Text>

          <Text style={styles.description}>
            Check required documents and application procedures.
          </Text>

        </TouchableOpacity>


        <TouchableOpacity style={styles.serviceCard}>

          <Text style={styles.serviceHeading}>
            🪪 Citizenship Recommendation
          </Text>

          <Text style={styles.description}>
            View required documents and service information.
          </Text>

        </TouchableOpacity>


        <TouchableOpacity style={styles.serviceCard}>

          <Text style={styles.serviceHeading}>
            🏢 Business Registration
          </Text>

          <Text style={styles.description}>
            Check documents, fees and processing information.
          </Text>

        </TouchableOpacity>


        {/* Space at bottom */}

        <View style={styles.bottomSpace} />

      </ScrollView>


      {/* ================= BOTTOM NAVIGATION ================= */}

      <View
        style={[
          styles.bottomNav,
          {
            paddingBottom: insets.bottom,
            height: 65 + insets.bottom,
          },
        ]}
      >

        {/* HOME */}

        <TouchableOpacity style={styles.navItem}>

          <Text style={styles.navIcon}>
            🏠
          </Text>

          <Text style={styles.activeText}>
            Home
          </Text>

        </TouchableOpacity>


        {/* PROFILE */}

        <TouchableOpacity style={styles.navItem}>

          <Text style={styles.navIcon}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  /* ================= CONTAINER ================= */

  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },


  /* ================= HEADER ================= */

  header: {
    backgroundColor: "#1769AA",

    paddingHorizontal: 20,
    paddingBottom: 22,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },


  logo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },


  welcome: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 5,
  },


  notification: {
    backgroundColor: "#FFFFFF",

    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",
  },


  bell: {
    fontSize: 20,
  },


  /* ================= SCROLL ================= */

  scrollView: {
    flex: 1,
  },


  scrollContent: {
    paddingBottom: 20,
  },


  /* ================= TITLES ================= */

  title: {
    fontSize: 19,
    fontWeight: "bold",

    marginTop: 20,
    marginBottom: 12,
    marginHorizontal: 20,

    color: "#222",
  },


  /* ================= QUEUE CARD ================= */

  queueCard: {
    backgroundColor: "#FFFFFF",

    marginHorizontal: 20,
    padding: 20,

    borderRadius: 18,

    elevation: 3,
  },


  office: {
    color: "#666",
    fontSize: 14,
  },


  token: {
    alignItems: "center",
    marginVertical: 15,
  },


  small: {
    color: "#777",
    fontSize: 13,
  },


  tokenNumber: {
    color: "#1769AA",

    fontSize: 42,
    fontWeight: "bold",

    marginTop: 4,
  },


  queueInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
  },


  info: {
    alignItems: "center",
  },


  number: {
    fontSize: 20,
    fontWeight: "bold",

    color: "#222",
  },


  label: {
    color: "#777",

    fontSize: 12,

    marginTop: 4,
  },


  /* ================= STATUS ================= */

  status: {
    backgroundColor: "#E7F7ED",

    padding: 10,

    borderRadius: 10,

    marginTop: 15,

    alignItems: "center",
  },


  statusText: {
    color: "#168344",
    fontSize: 13,
  },


  /* ================= BUTTON ================= */

  button: {
    backgroundColor: "#1769AA",

    padding: 14,

    borderRadius: 10,

    marginTop: 15,

    alignItems: "center",
  },


  buttonText: {
    color: "#FFFFFF",

    fontSize: 15,
    fontWeight: "bold",
  },


  /* ================= QUICK SERVICES ================= */

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "space-between",

    marginHorizontal: 20,
  },


  service: {
    backgroundColor: "#FFFFFF",

    width: "48%",

    padding: 18,

    borderRadius: 15,

    marginBottom: 12,

    alignItems: "center",

    elevation: 2,
  },


  icon: {
    fontSize: 28,
  },


  serviceTitle: {
    fontSize: 14,

    fontWeight: "bold",

    marginTop: 8,
  },


  serviceText: {
    color: "#777",

    fontSize: 11,

    marginTop: 5,

    textAlign: "center",
  },


  /* ================= GOVERNMENT SERVICES ================= */

  serviceCard: {
    backgroundColor: "#FFFFFF",

    marginHorizontal: 20,

    marginBottom: 10,

    padding: 16,

    borderRadius: 14,

    elevation: 2,
  },


  serviceHeading: {
    fontSize: 15,

    fontWeight: "bold",

    color: "#222",
  },


  description: {
    color: "#666",

    fontSize: 13,

    marginTop: 7,

    lineHeight: 19,
  },


  bottomSpace: {
    height: 25,
  },


  /* ================= BOTTOM NAV ================= */

  bottomNav: {
    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#DDD",

    flexDirection: "row",

    justifyContent: "space-evenly",
    alignItems: "flex-start",

    paddingTop: 8,
  },


  navItem: {
    width: 120,

    alignItems: "center",
    justifyContent: "flex-start",
  },


  navIcon: {
    fontSize: 21,
  },


  navText: {
    color: "#777",

    fontSize: 11,

    marginTop: 3,
  },


  activeText: {
    color: "#1769AA",

    fontSize: 11,

    fontWeight: "bold",

    marginTop: 3,
  },

});