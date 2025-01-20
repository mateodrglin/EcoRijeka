import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function KalendarOdvoza() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAddresses = async () => {
      const db = getFirestore();
      try {
        const addressCollection = collection(db, "adresa"); 
        const snapshot = await getDocs(addressCollection);

        const filteredList = snapshot.docs
          .map((doc) => ({
            id: doc.id, 
            ...doc.data(), 
          }))
          .filter((item) => item.heart === true); 

        setAddresses(filteredList);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        Alert.alert("Greška", "Ne mogu dohvatiti adrese.");
      }
    };

    fetchAddresses();
  }, []);

  const handleOptionPress = (option: any) => {
    router.push({
        pathname: `/kalendarSadrzaj/[id]`,    
        params: {
            id: option.id, 
            slika: option.slika, 
      },
    });
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/explore")}
          style={styles.hamburgerButton}
        >
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Kalendar odvoza</Text>
      </View>

     
      <TextInput
        style={styles.searchBar}
        placeholder="Dodaj novu adresu"
        placeholderTextColor="#999"
      />

  
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  hamburgerButton: {
    padding: 10,
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    paddingRight: 40,
  },
  searchBar: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  addressList: {
    paddingVertical: 10,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 8, 
    backgroundColor: "#F0F0F0", 
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  addressContent: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  addressSchedule: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
});
