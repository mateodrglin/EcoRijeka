import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function CompanyDetails() {
  const router = useRouter();
  const { companyId } = useLocalSearchParams<{ companyId: string }>(); // Type the params

  const companyDetails: Record<
    string,
    {
      name: string;
      description: string;
      website: string;
      phone: string;
      email: string;
    }
  > = {
    kemis: {
      name: "KEMIS-Termoclean d.o.o.",
      description:
        "Tvrtka s iskustvom u gospodarenju opasnim i neopasnim otpadom. Ima skladište u Novom Vinodolskom i nudi zbrinjavanje otpada poput industrijskih uljeva, onečišćenog tla, otpadnih ulja i masti.",
      website: "https://kemis-termoclean.hr/",
      phone: "051-256-123",
      email: "kemis@gmail.com",
    },
    metis: {
      name: "METIS d.d",
      description:
        "Tvrtka specijalizirana za upravljanje otpadom, uključujući recikliranje i odlaganje industrijskog otpada.",
      website: "https://metis.hr/",
      phone: "051-123-456",
      email: "metis@gmail.com",
    },
  };

  // Safely retrieve company details
  const details = companyDetails[companyId || ""] || null;

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Trenutno nema ni jedna dostupna kompanija!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{details.name}</Text>
      <Text style={styles.description}>{details.description}</Text>
      <Text style={styles.info}>Stranica: {details.website}</Text>
      <Text style={styles.info}>Telefon: {details.phone}</Text>
      <Text style={styles.info}>Email: {details.email}</Text>
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
  description: {
    fontSize: 16,
    color: "#6e6e6e",
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
