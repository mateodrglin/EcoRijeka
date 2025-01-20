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
<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";

=======

// Define the type for an event
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
interface Event {
  id: string;
  title: string;
  date: string;
<<<<<<< HEAD
  imageUrl?: string; 
=======
  imageUrl?: string; // imageUrl is optional
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
}

export default function Home() {
  const router = useRouter();
<<<<<<< HEAD
  const [events, setEvents] = useState<Event[]>([]); 
=======
  const [events, setEvents] = useState<Event[]>([]); // Specify the type of the events state
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const db = getFirestore();
        const eventsQuery = query(
          collection(db, "events"),
<<<<<<< HEAD
          orderBy("createdAt", "desc"), 
          limit(3) 
=======
          orderBy("createdAt", "desc"), // Sort by creation date
          limit(3) // Fetch only the last 3 events
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
        );
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
<<<<<<< HEAD
        })) as Event[]; 
=======
        })) as Event[]; // Type-cast to Event[]
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
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
<<<<<<< HEAD
        source={require("@/assets/images/Login.png")} 
=======
        source={require("@/assets/images/Login.png")} // Replace with your background image path
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
        style={styles.background}
      />

      {/* Foreground Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with EcoRijeka Logo */}
<<<<<<< HEAD
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
=======
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
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.horizontalScrollContainer} // Ensure proper spacing
  >
    {events.map((event) => (
      <TouchableOpacity
        key={event.id}
        style={styles.eventCard}
        onPress={() => router.push(`/dogadjaji/edit/${event.id}`)} // Redirect to event details
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
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
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
<<<<<<< HEAD
    position: "absolute",
=======
    position: "absolute", 
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
<<<<<<< HEAD
    zIndex: -1,
=======
    zIndex: -1, 
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  },
  scrollContainer: {
    flexGrow: 1,
  },
<<<<<<< HEAD
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
=======
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "rgba(245, 245, 245, 0.9)", 
  },
  logo: {
    width: 140,
    height: 140,
    marginRight: 10,
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
<<<<<<< HEAD
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
=======
  },
  content: {
    padding: 20,
  },
  box: {
    backgroundColor: "rgba(245, 245, 245, 0.9)", 
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  },
  boxContent: {
    alignItems: "center",
  },
  singleCalendarImage: {
<<<<<<< HEAD
    width: "100%",
=======
    width: "100%", 
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
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
<<<<<<< HEAD
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
=======
  horizontalScrollContainer: {
    paddingHorizontal: 10, 
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
<<<<<<< HEAD
    marginRight: 10,
    width: 160,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
=======
    marginRight: 10, 
    width: 160,
    overflow: "hidden",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)", 
  },
  
  
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
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
<<<<<<< HEAD
=======
  
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
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
<<<<<<< HEAD
=======
  
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
});
