import React, { useEffect, useState } from "react";
import {
  View,
  Text,
<<<<<<< HEAD
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Alert,
  ScrollView, 
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons"; 
=======
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth } from "../../../firebaseConfig";
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985

export default function EventDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    imageUrl: "",
<<<<<<< HEAD
    organizator: "",
  });
=======
  });
  const [role, setRole] = useState<string | null>(null);
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const db = getFirestore();
        const eventDoc = await getDoc(doc(db, "events", id as string));

        if (eventDoc.exists()) {
          setEventData(eventDoc.data() as typeof eventData);
        } else {
          Alert.alert("Error", "Event not found.");
          router.replace("/dogadjaji");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        Alert.alert("Error", "Unable to fetch event.");
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    fetchEvent();
  }, [id]);

  const openGoogleMaps = () => {
    const query = encodeURIComponent(eventData.location);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url).catch(() =>
=======
    const fetchUserRole = async () => {
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();
          setRole(userData?.role || "user");
        } catch (error) {
          console.error("Error fetching user role:", error);
          Alert.alert("Error", "Unable to fetch user role.");
        }
      }
    };

    fetchEvent();
    fetchUserRole();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "events", id as string), eventData);
      Alert.alert("Success", "Event updated successfully.");
      router.push("/dogadjaji");
    } catch (error) {
      console.error("Error updating event:", error);
      Alert.alert("Error", "Unable to update event.");
    }
  };

  const handleDelete = async () => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "events", id as string));
      Alert.alert("Success", "Event deleted successfully.");
      router.push("/dogadjaji");
    } catch (error) {
      console.error("Error deleting event:", error);
      Alert.alert("Error", "Unable to delete event.");
    }
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(eventData.location);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url).catch((err) =>
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
      Alert.alert("Error", "Unable to open Google Maps.")
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#66BB6A" />
      </View>
    );
  }

  return (
<<<<<<< HEAD
    <ScrollView style={styles.container}> 
      {/* Header Image */}
      <Image
        source={{ uri: eventData.imageUrl || "https://via.placeholder.com/150" }}
        style={styles.headerImage}
      />
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>

      {/* Event Details */}
      <View style={styles.card}>
        <Text style={styles.eventTitle}>{eventData.title}</Text>
        <Text style={styles.detailText}>{eventData.date}</Text>

        <TouchableOpacity onPress={openGoogleMaps} style={styles.detailContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={20} color="#000" />
          </View>
          <Text style={[styles.detailText, styles.link]}>
            {eventData.location}
          </Text>
        </TouchableOpacity>

        <Text style={styles.description}>{eventData.description}</Text>

       
        {eventData.organizator && (
  <View style={styles.iconTextContainer}>
    {/* Icon with grey square background */}
    <View style={styles.iconContainer}>
      <Ionicons name="person" size={20} color="#000" />
    </View>

    {/* Text on the right */}
    <View style={styles.textContainer}>
      <Text style={styles.organizerLabel}>Organizator</Text>
      <Text style={[styles.detailText, styles.organizerName]}>
        {eventData.organizator}
      </Text>
    </View>
  </View>
)}

      </View>

      <TouchableOpacity
  style={styles.signUpButton}
  onPress={() => router.push({ pathname: "/dogadajPrijava", params: { title: eventData.title } })}
>
  <Text style={styles.signUpButtonText}>Prijavi se</Text>
</TouchableOpacity>
    </ScrollView> 
=======
    <View style={styles.container}>
      <Text style={styles.title}>{eventData.title}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Datum:</Text>
        <Text style={styles.detailValue}>{eventData.date}</Text>
      </View>
      <View style={styles.detailContainer}>
  <Text style={styles.detailLabel}>Lokacija:</Text>
  <TouchableOpacity onPress={openGoogleMaps}>
    <Text style={[styles.detailValue, styles.link]}>{eventData.location}</Text>
  </TouchableOpacity>
</View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Opis:</Text>
        <Text style={styles.detailValue}>{eventData.description}</Text>
      </View>

      {/* Admin Features */}
      {role === "admin" && (
        <>
          <Text style={styles.sectionTitle}>Edit Event</Text>
          <TextInput
            placeholder="Title"
            value={eventData.title}
            onChangeText={(text) => setEventData((prev) => ({ ...prev, title: text }))}
            style={styles.input}
          />
          <TextInput
            placeholder="Date"
            value={eventData.date}
            onChangeText={(text) => setEventData((prev) => ({ ...prev, date: text }))}
            style={styles.input}
          />
          <TextInput
            placeholder="Location"
            value={eventData.location}
            onChangeText={(text) => setEventData((prev) => ({ ...prev, location: text }))}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={eventData.description}
            onChangeText={(text) => setEventData((prev) => ({ ...prev, description: text }))}
            style={styles.input}
            multiline
          />
          <TextInput
            placeholder="Image URL"
            value={eventData.imageUrl}
            onChangeText={(text) => setEventData((prev) => ({ ...prev, imageUrl: text }))}
            style={styles.input}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Event</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  iconTextContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 10, 
    marginTop: 10, 

  },
  icon: {
    marginRight: 10, 
  },
  textContainer: {
    flexDirection: "column",
  },
 
  organizerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  organizerName: {
    fontSize: 16,
    fontWeight: "normal", 
    color: "#666",
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerImage: {
    width: "100%",
    height: 300,
    marginTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 10,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
=======
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 10,
<<<<<<< HEAD
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
  iconContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5, 
    padding: 10, 
    marginRight: 10, 
=======
  },
  detailLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
  detailValue: {
    fontSize: 16,
    color: "#6e6e6e",
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  },
  link: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
<<<<<<< HEAD
  description: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  signUpButton: {
    backgroundColor: "#66BB6A",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
=======
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  saveButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteButtonText: {
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
