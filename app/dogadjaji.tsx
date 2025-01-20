import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons"; 
import { auth } from "../firebaseConfig"; 
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function Dogadjaji() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null); 
  const [events, setEvents] = useState<any[]>([]); 
=======
import { auth } from "../firebaseConfig"; // Firebase auth instance
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore"; // Firestore imports

export default function Dogadjaji() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null); // User role
  const [events, setEvents] = useState<any[]>([]); // Events from Firestore
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985

  useEffect(() => {
    const fetchRole = async () => {
      const db = getFirestore();
      const user = auth.currentUser;

<<<<<<< HEAD
    
=======
      // If no user is logged in, set role as null
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
      if (!user) {
        setRole(null);
        return;
      }

      try {
<<<<<<< HEAD
        const userDoc = await getDoc(doc(db, "users", user.uid)); 
        const userData = userDoc.data();
        setRole(userData?.role || "user"); 
=======
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Fetch Firestore document
        const userData = userDoc.data();
        setRole(userData?.role || "user"); // Default to "user"
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
      } catch (error) {
        console.error("Error fetching user role:", error);
        Alert.alert("Greška", "Ne mogu dohvatiti podatke korisnika.");
      }
    };

    const fetchEvents = async () => {
      const db = getFirestore();
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
<<<<<<< HEAD
        setEvents(eventsList); 
=======
        setEvents(eventsList); // Set fetched events
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
      } catch (error) {
        console.error("Error fetching events:", error);
        Alert.alert("Greška", "Ne mogu dohvatiti događaje.");
      }
    };

    fetchRole();
    fetchEvents();
  }, []);

  const handleEditEvent = (eventId: string) => {
    if (role !== "admin") {
      Alert.alert("Pristup odbijen", "Nemate ovlasti za uređivanje događaja.");
      return;
    }

<<<<<<< HEAD
    router.push(`/dogadjaji/edit/${eventId}`); 
=======
    router.push(`/dogadjaji/edit/${eventId}`); // Navigate to edit page
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  };

  const handleAddEvent = () => {
    if (role !== "admin") {
      Alert.alert("Pristup odbijen", "Nemate ovlasti za dodavanje događaja.");
      return;
    }

<<<<<<< HEAD
    router.push(`/dogadjaji/add`);
=======
    router.push(`/dogadjaji/add`); // Navigate to the "Add Event" page
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <View style={styles.header}>
        {/* Hamburger Button */}
        <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
                  <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
        {/* Title */}
        <Text style={styles.title}>Događaji</Text>
      </View>
=======
      <Text style={styles.title}>Događaji</Text>
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985

      {/* Add Event Button (Visible only to admins) */}
      {role === "admin" && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.addButtonText}>Dodaj Događaj</Text>
        </TouchableOpacity>
      )}

      <ScrollView>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
<<<<<<< HEAD
            onPress={() => router.push(`/dogadjaji/edit/${event.id}`)} 
=======
            onPress={() => router.push(`/dogadjaji/edit/${event.id}`)} // Navigate to event details
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
          >
            <Image
              source={{ uri: event.imageUrl || "https://via.placeholder.com/80" }}
              style={styles.eventImage}
            />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
            {role === "admin" && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={(e) => {
<<<<<<< HEAD
                  e.stopPropagation();
=======
                  e.stopPropagation(); // Prevent parent TouchableOpacity navigation
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
                  handleEditEvent(event.id);
                }}
              >
                <Text style={styles.editButtonText}>Uredi</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
<<<<<<< HEAD
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  hamburgerButton: {
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    flex: 1, 
=======
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
  },
  eventImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  eventInfo: {
    flex: 1,
    paddingHorizontal: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: "#6e6e6e",
  },
  editButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 5,
    padding: 8,
    margin: 10,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  addButton: {
    backgroundColor: "#FF6347",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
