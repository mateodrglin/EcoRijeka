import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Category() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();

  const companies: Record<string, { id: string; name: string }[]> = {
    opasni: [
      { id: "kemis", name: "KEMIS-Termoclean" },
      { id: "metis", name: "METIS d.d" },
    ],
    glomazni: [
      { id: "company1", name: "Glomazni 1" },
      { id: "company2", name: "Glomazni 2" },
    ],

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category?.toUpperCase()}</Text>
      {companies[category]?.map((company: { id: string; name: string }) => (
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
