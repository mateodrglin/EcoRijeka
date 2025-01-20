import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons"; 
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function KalendarSadrzaj() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter(); 

  const [address, setAddress] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  const [dayBeforeEnabled, setDayBeforeEnabled] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchAddressDetails = async () => {
        const db = getFirestore();
        try {
          console.log("Fetching document with ID:", id); 
          const addressDocRef = doc(db, "adresa", id as string);
          const addressDoc = await getDoc(addressDocRef);

          if (addressDoc.exists()) {
            console.log("Document data:", addressDoc.data()); 
            setAddress(addressDoc.data());
          } else {
            console.log("No such document!");
            setAddress(null); 
          }
        } catch (error) {
          console.error("Error fetching address details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAddressDetails();
    }
  }, [id]);

  const handleDeleteAddress = async () => {
    const db = getFirestore();
    try {
      console.log("Updating 'heart' field to false for address with ID:", id); 
      
      const addressDocRef = doc(db, "adresa", id as string);
  
      await updateDoc(addressDocRef, {
        heart: false,
      });
  
      console.log("Address 'heart' field updated to false");
  
      router.push('/kalendarPopis');    } catch (error) {
      console.error("Error updating 'heart' field:", error);
    }
  };
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!address) {
    return (
      <View style={styles.container}>
        <Text>No such document!</Text> 
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{address.naziv}</Text>
      </View>

      {/* Display images */}
      {address.slika && (
        <Image
          source={{ uri: address.slika }}
          style={styles.image}
        />
      )}

      {/* Notification Setting */}
      <View style={styles.settingRow}>
  <View style={styles.iconAndText}>
    <Icon name="calendar-outline" size={30} color="black" style={styles.icon} />
    <Text style={styles.settingLabel}>Obavijesti</Text>
  </View>
  <Switch
    value={dayBeforeEnabled}
    onValueChange={(value) => setDayBeforeEnabled(value)}
  />
</View>

<View style={styles.settingRow}>
  <View style={styles.iconAndText}>
    <Icon name="trash-can" size={30} color="red" style={styles.icon} />
    <TouchableOpacity onPress={handleDeleteAddress}>
      <Text style={[styles.settingLabel, styles.deleteText]}>Ukloni adresu</Text>
    </TouchableOpacity>
  </View>
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  iconAndText: {
    flexDirection: "row", 
    alignItems: "center", 
  },
  icon: {
    marginRight: 10, 
  },
  settingLabel: {
    fontSize: 16,
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
 Container: {
    width: 30,
    height: 30,
    backgroundColor: "#ccc", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5, 
    marginRight: 10,
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
});
