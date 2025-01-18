import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function CompanyDetails() {
  const router = useRouter();
  const { companyId } = useLocalSearchParams<{ companyId: string }>();

  const companyDetails: Record<
    string,
    {
      name: string;
      description: string;
      website: string;
      phone: string;
      email: string;
      logo: any; // Updated to allow both local and remote images
    }
  > = {
    kemis: {
      name: "KEMIS-Termoclean d.o.o.",
      description:
        "Tvrtka s iskustvom u gospodarenju opasnim i neopasnim otpadom. Ima skladište u Novom Vinodolskom i nudi zbrinjavanje otpada poput industrijskih uljeva, onečišćenog tla, otpadnih ulja i masti.",
      website: "https://kemis-termoclean.hr/",
      phone: "051-256-123",
      email: "kemis@gmail.com",
      logo: require('@/assets/images/kemis.jpg'), // Local image
    },
    metis: {
      name: "METIS d.d",
      description:
        "Tvrtka specijalizirana za upravljanje otpadom, uključujući recikliranje i odlaganje industrijskog otpada.",
      website: "https://metis.hr/",
      phone: "051-123-456",
      email: "metis@gmail.com",
      logo: require('@/assets/images/metis.jpg'), // Local image
    },
  };

  const details = companyDetails[companyId || ""] || null;

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Trenutno nema ni jedna dostupna kompanija!</Text>
      </View>
    );
  }

  const handleLinkPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Greška", "URL nije podržan: " + url);
      }
    } catch (error) {
      const message = (error as Error)?.message || "Došlo je do greške.";
      Alert.alert("Greška", "Ne mogu otvoriti link: " + message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={details.logo} // Dynamically use the logo
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Company Name */}
      <Text style={styles.title}>{details.name}</Text>

      {/* Description */}
      <Text style={styles.sectionTitle}>O industriji</Text>
      <Text style={styles.description}>{details.description}</Text>

      {/* Information Block */}
      <Text style={styles.info}>
        <Text style={styles.infoLabel}>Website: </Text>
        <Text style={styles.link} onPress={() => handleLinkPress(details.website)}>
          {details.website}
        </Text>
      </Text>
      <Text style={styles.info}>
        <Text style={styles.infoLabel}>Telefon: </Text>
        {details.phone}
      </Text>
      <Text style={styles.info}>
        <Text style={styles.infoLabel}>Email: </Text>
        {details.email}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
  infoLabel: {
    fontWeight: "bold",
  },
  link: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  messageButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  messageButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
