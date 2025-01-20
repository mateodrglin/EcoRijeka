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
import { Ionicons } from "@expo/vector-icons";

interface Event {
  id: string;
  title: string;
  date: string;
  imageUrl?: string; 
}

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const db = getFirestore();
        const eventsQuery = query(
          collection(db, "events"),
          orderBy("createdAt", "desc"), 
          limit(3) 
        );
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[]; 
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
        source={require("@/assets/images/Login.png")} 
        style={styles.background}
      />

      {/* Foreground Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with EcoRijeka Logo */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
            <Ionicons name="menu" size={30} color="black" />
          </TouchableOpacity>

          <View style={styles.rightHeader}>
            <Text style={styles.appTitle}>EcoRijeka</Text>
            <Image
              source={require("@/assets/images/logo.png")} 
              style={styles.logo}
            />
          </View>
        </View>

        {/* Next Collection Card */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Sljedeća kolekcija</Text>
          <View style={styles.cardContentRow}>
            <Image
              source={require("@/assets/images/green-bin.png")}
              style={styles.binIcon}
            />
            <Image
              source={require("@/assets/images/yellow-bin.png")}
              style={styles.binIcon}
            />
            <View style={styles.cardTextWrapper}>
              <Text style={styles.cardTextBold}>Petak, 10.12.</Text>
              <Text style={styles.cardText}>Radmila Matejčića 5</Text>
            </View>
          </View>
        </View>

        {/* Event Section */}
        <View style={styles.boxContainer}>
          <Text style={styles.sectionTitle}>Provjeri događaje</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
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

          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => router.push("/dogadjaji")}
          >
            <Text style={styles.showAllButtonText}>Prikaži sve događaje</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Section */}
        <View style={styles.boxContainer}>
          <Text style={styles.sectionTitle}>Kalendar</Text>
          <TouchableOpacity
            style={styles.boxContent}
            onPress={() => router.push("/kalendarPopis")}
          >
            <Image
              source={require("@/assets/images/kalendar.png")}
              style={styles.singleCalendarImage}
            />
            <Text style={styles.boxText}>Provjerite raspored</Text>
          </TouchableOpacity>
        </View>


        {/* Recycling Tips */}
        <View style={styles.boxContainer}>
          <Text style={styles.sectionTitle}>Kako pravilno reciklirati?</Text>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => router.push("/savjeti")}
          >
            <Text style={styles.showAllButtonText}>Saznaj više</Text>
          </TouchableOpacity>
        </View>
        

        {/* Report Illegal Waste Section */}
        <View style={styles.boxContainer}>
          <Text style={styles.sectionTitle}>Prijavi ilegalno odloženo smeće</Text>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => router.push("/prijavaSmeca")}
          >
            <Text style={styles.showAllButtonText}>Prijavi smeće</Text>
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
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: -1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  hamburgerButton: {
    padding: 5,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  boxContent: {
    alignItems: "center",
  },
  singleCalendarImage: {
    width: "100%",
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
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6e6e6e",
  },
  cardContentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  binIcon: {
    width: 30,
    height: 40,
    marginRight: 10,
  },
  cardTextWrapper: {
    flex: 1,
  },
  cardTextBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  cardText: {
    fontSize: 14,
    color: "#6e6e6e",
    marginTop: 5,
  },
  boxContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalScrollContainer: {
    paddingHorizontal: 10,
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginRight: 10,
    width: 160,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
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
