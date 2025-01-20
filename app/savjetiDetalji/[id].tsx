import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router"; 

export default function SavjetiLista() {
  const { id, title, description } = useLocalSearchParams(); 
  const [loading, setLoading] = useState(true);
  const [descriptionText, setDescription] = useState(description || ""); 
  const router = useRouter(); 

  useEffect(() => {
    const fetchSubcollection = async () => {
      try {
        const db = getFirestore();
        const parentDocRef = doc(db, "savjeti", id); 
        const docSnap = await getDoc(parentDocRef);

        if (docSnap.exists()) {
          const descriptionText = docSnap.data()?.description || "";
          setDescription(descriptionText);
        } else {
          Alert.alert("Error", "Document not found!");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch the document.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcollection();
  }, [id]);

  const descriptionWithList = descriptionText
    ? descriptionText.split(/(?=\d+\.)/)
    : []; 

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Učitavanje...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}> 
      {/* Header with Back Button */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Display the description as a list */}
      {descriptionWithList.length > 0 ? (
        descriptionWithList.map((part, index) => (
          <Text key={index} style={styles.listItem}>
            {part.trim()}
          </Text>
        ))
      ) : (
        <Text style={styles.emptyMessage}>Trenutno nema detaljnog opisa!</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loadingText: {
    fontSize: 20,
    color: "#888888",
    textAlign: "center", 
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 15, 
  },
  backButton: {
    padding: 5, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 30, 
    color: "#000000",
    flex: 1, 
    textAlign: "center", 
  },
  listItem: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center", 
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#888888",
    marginTop: 20,
  },
});
