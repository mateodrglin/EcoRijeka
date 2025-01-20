import React, { useEffect, useState } from "react";
import {
  View,
  Text,
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

export default function EventDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    imageUrl: "",
    organizator: "",
  });
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

    fetchEvent();
  }, [id]);

  const openGoogleMaps = () => {
    const query = encodeURIComponent(eventData.location);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url).catch(() =>
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
  );
}

const styles = StyleSheet.create({
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
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 10,
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
  },
  link: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
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
