import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default function EventDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    imageUrl: "",
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#66BB6A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Event</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
