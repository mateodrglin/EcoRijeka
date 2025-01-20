import React from "react";
<<<<<<< HEAD
import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

export default function Kalendar() {
    const router = useRouter(); 
  return (
    
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
=======
import { View, Text, Image, StyleSheet } from "react-native";

export default function Kalendar() {
  return (
    <View style={styles.container}>
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
      {/* Title */}
      <Text style={styles.title}>Kalendar odvoza</Text>

      {/* Image */}
      <Image
<<<<<<< HEAD
        source={require("../assets/images/kalendar.png")} ge
        style={styles.image}
        resizeMode="contain" 
=======
        source={require("../assets/images/kalendar.png")} // Adjust the path to your image
        style={styles.image}
        resizeMode="contain" // Ensures the image scales properly
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
      />
       {/* Title */}
       <Text style={styles.description}>Na dan pražnjenja kanta se postavlja uz rub javne površine tako da ne ometa promet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    maxWidth: 800,
<<<<<<< HEAD
    height: 400, 
=======
    height: 400, // Adjust height as needed
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  },
  description: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
    marginTop: 10,
  },
<<<<<<< HEAD
  hamburgerButton: {
    padding: 10,
    marginTop:10,
  },
=======
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
});
