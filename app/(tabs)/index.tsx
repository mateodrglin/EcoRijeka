import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";

// Define the type for an event
interface Event {
  id: string;
  title: string;
  date: string;
  imageUrl?: string; // imageUrl is optional
}

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]); // Specify the type of the events state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const db = getFirestore();
        const eventsQuery = query(
          collection(db, "events"),
          orderBy("createdAt", "desc"), // Sort by creation date
          limit(3) // Fetch only the last 3 events
        );
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[]; // Type-cast to Event[]
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("@/assets/images/Login.png")} // Replace with your background image path
        style={styles.background}
      />

      {/* Foreground Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with EcoRijeka Logo */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/logo.png")} // Replace with your logo path
            style={styles.logo}
          />
          <Text style={styles.appTitle}>Novosti</Text>
        </View>

        <View style={styles.content}>
          {/* First Box: Last 3 Events */}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Provjeri događaje</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => router.push(`/dogadjaji/edit/${event.id}`)}
                >
                  <Image
                    source={{ uri: event.imageUrl || "https://via.placeholder.com/120" }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDetails}>{event.date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Button to Show All Events */}
            <TouchableOpacity
              style={styles.showAllButton}
              onPress={() => router.push("/dogadjaji")}
            >
              <Text style={styles.showAllButtonText}>Prikaži sve događaje</Text>
            </TouchableOpacity>
          </View>

          {/* Second Box: Calendar */}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Kalendar</Text>
            <TouchableOpacity
              style={styles.boxContent}
              onPress={() => router.push("/Kalendar")}
            >
              <Image
                source={require("@/assets/images/kalendar.png")} // Replace with your calendar image
                style={styles.singleCalendarImage} // Ensures a single image is shown
              />
              <Text style={styles.boxText}>Provjerite raspored</Text>
            </TouchableOpacity>
          </View>

          {/* Third Box: Advice */}
          <TouchableOpacity
            style={styles.adviceButton}
            onPress={() => router.push("/SavjetiRecikliranja")}
          >
            <Text style={styles.adviceButtonText}>
              Kako pravilno reciklirati? Saznajte ovdje!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute", // Makes the background fixed and stationary
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: -1, // Ensures the background stays behind everything
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "rgba(245, 245, 245, 0.9)", // Optional semi-transparent header
  },
  logo: {
    width: 140,
    height: 140,
    marginRight: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  content: {
    padding: 20,
  },
  box: {
    backgroundColor: "rgba(245, 245, 245, 0.9)", // Optional semi-transparent box
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  boxContent: {
    alignItems: "center",
  },
  singleCalendarImage: {
    width: "100%", // Ensures full-width calendar
    height: 120,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 16,
    textAlign: "center",
    color: "#6e6e6e",
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginRight: 10,
    width: 160,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  eventImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    paddingHorizontal: 10,
  },
  eventDetails: {
    fontSize: 12,
    color: "#6e6e6e",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  showAllButton: {
    backgroundColor: "#66BB6A",
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  showAllButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  adviceButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  adviceButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
