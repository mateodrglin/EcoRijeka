import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
=======
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985

export default function Category() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();

<<<<<<< HEAD
=======
  // Map category values to full names
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  const categoryNames: Record<string, string> = {
    opasni: "Opasni Otpad",
    glomazni: "Glomazni Otpad",
    etpad: "E-otpad",
    gradjevinski: "Građevinski Otpad",
    automobilski: "Automobilski Dijelovi",
    medicinski: "Medicinski Otpad",
    biootpad: "Biootpad",
    ulja: "Otpadna Ulja",
  };

  const companies: Record<string, { id: string; name: string }[]> = {
    opasni: [
      { id: "kemis", name: "KEMIS-Termoclean" },
      { id: "metis", name: "METIS d.d" },
    ],
    glomazni: [
      { id: "company1", name: "Glomazni Company 1" },
      { id: "company2", name: "Glomazni Company 2" },
    ],
<<<<<<< HEAD
=======
    // Add other categories if needed
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  };

  const categoryName = categoryNames[category || ""] || category?.toUpperCase();

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      {/* Row for back button and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{categoryName}</Text>
      </View>
=======
      <Text style={styles.title}>{categoryName}</Text>
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
      {companies[category]?.map((company) => (
        <TouchableOpacity
          key={company.id}
          onPress={() =>
            router.push(`/UslugeOdvoza/${category}/${company.id}` as const)
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>{company.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
<<<<<<< HEAD
  header: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10, 
  },
  title: {
    textAlign: "center", 
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
=======
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
