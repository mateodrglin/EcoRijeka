import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Kalendar() {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Kalendar odvoza</Text>

      {/* Image */}
      <Image
        source={require("../assets/images/kalendar.png")} // Adjust the path to your image
        style={styles.image}
        resizeMode="contain" // Ensures the image scales properly
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
    height: 400, // Adjust height as needed
  },
  description: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
    marginTop: 10,
  },
});
