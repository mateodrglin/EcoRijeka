import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

export default function SavjetiLista() {
  const { id, title } = useLocalSearchParams(); 
  const [subcollectionItems, setSubcollectionItems] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 
  const router = useRouter(); 
  
  useEffect(() => {
    const fetchSubcollection = async () => {
      try { 
        const db = getFirestore();
        const parentDocRef = doc(db, "savjeti", id);
        console.log('Parent Document Reference:', parentDocRef.path);

        const subcollectionRef = collection(parentDocRef, "plastika");

        const snapshot = await getDocs(subcollectionRef);

        const subcollectionList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSubcollectionItems(subcollectionList);
      } catch (error) {
        Alert.alert("Greška", "Ne mogu dohvatiti dokumente subkolekcije.");
      } finally {
        setLoading(false); 
      }
    };

    fetchSubcollection();
  }, [id]);

  const handleOptionPress = (item: any) => {
    router.push({
        pathname: `/savjetiDetalji/[id]`,    
        params: {
            id: item.id,
            title: item.primjer, 
            description: item.description,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Subcollection List */}
      <ScrollView style={styles.subcollectionContainer}>
        {subcollectionItems.length === 0 ? (
          <Text style={styles.emptyMessage}>Trenutno nema primjera!</Text>
        ) : (
          subcollectionItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.item} onPress={() => handleOptionPress(item)}>
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>{item.primjer || "No Title"}</Text>
                <Text style={styles.arrow}>{">"}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 20, 
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginRight:30,
    color: "#000000",
    flex: 1, 
  },
  subcollectionContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center", 
  },
  itemContent: {
    flexDirection: "row", 
    justifyContent: "space-between",
    width: "100%", 
    alignItems: "center", 
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000", 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    fontSize: 20,
    color: "#888888",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#888888",
    marginTop: 20,
  },
});
