import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Image, 
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
        pathname: "/kalendarSadrzaj/[id]",      
        params: {
            id: option.id, 
            slika: option.slika, 
      },
    });
  };

  // Conditional image for no addresses with heart === true
  const noAddressImage = require("@/assets/images/adresa_nema.png"); 

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

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
      <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
      <TextInput
        style={styles.searchBar}
        placeholder="Dodaj novu adresu"
        placeholderTextColor="#999"
      />
    </View>

      {/* Address List */}
      <ScrollView contentContainerStyle={styles.addressList}>
        {addresses.length > 0 ? (
          addresses.map((item) => (
            <View key={item.id} style={styles.addressCard}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => handleOptionPress(item)} 
              >
                <View style={styles.iconWrapper}>
                  <Icon name="home-outline" size={30} color="black" />
                </View>
                <View style={styles.addressContent}>
                  <Text style={styles.addressTitle}>{item.naziv}</Text>
                  <Text style={styles.addressSchedule}>
                    Ovaj tjedan: {item.odvoz}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.noAddressContainer}>
            <Image source={noAddressImage} style={styles.noAddressImage} />
            <Text style={styles.noAddressText}>Nema još dodanit adresa</Text>
            <Text style={styles.noAddressText2}>Unesite adresu kako biste saznali o danu odvoza ai više.</Text>

          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#f0f0f0",
    borderRadius: 8, 
    paddingHorizontal: 10,
    paddingVertical: 8, 
    marginVertical: 10, 
  },
  searchIcon: {
    marginRight: 8, 
  },
  searchBar: {
    flex: 1, 
    fontSize: 16, 
    color: "#333",
  },
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
  noAddressContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  noAddressImage: {
    width: 350,  
    height: 200,
    resizeMode: "contain",
  },
  noAddressText: {
    fontSize: 18,
    color: "#000000",
    marginTop: 10,
    fontWeight: "bold" ,
  },
  noAddressText2: {
    fontSize: 18,
    color: "#666666",
    marginTop: 10,
    textAlign: "center",
  },
});
