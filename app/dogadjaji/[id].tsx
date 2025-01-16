import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EventDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const events: Record<
    string,
    {
      title: string;
      date: string;
      image: any;
      description: string;
      location: {
        name: string;
        address: string;
        latitude: number;
        longitude: number;
      };
      organizer: string;
    }
  > = {
    "1": {
      title: "Čišćenje smeća",
      date: "Pon, 10 sij - 10h",
      image: require("@/assets/images/smece.jpg"),
      description:
        "Pridruži nam se na akciji čišćenja smeća i učini nešto dobro za okoliš! Upoznaj nove ljude i sudjeluj u održavanju prirode.",
      location: {
        name: "Park Mlaka",
        address: "Mlaka 12, 51000, Rijeka",
        latitude: 45.3345,
        longitude: 14.4352,
      },
      organizer: "Zelena Rijeka",
    },
    "2": {
      title: "Odlaganje smeća",
      date: "Pon, 12 velj - 18h",
      image: require("@/assets/images/smece2.jpg"),
      description:
        "Saznaj kako pravilno odlagati otpad i pridruži nam se na edukativnoj radionici u tvojoj lokalnoj zajednici.",
      location: {
        name: "Gradski trg",
        address: "Trg Republike, 51000, Rijeka",
        latitude: 45.3271,
        longitude: 14.4426,
      },
      organizer: "Eco Rijeka",
    },
  };

  const event = events[id || ""];

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Događaj nije pronađen!</Text>
      </View>
    );
  }

  const handleOpenMaps = () => {
    const { latitude, longitude } = event.location;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Greška", "Ne mogu otvoriti Google Maps.");
        }
      })
      .catch((err) => Alert.alert("Greška", err.message));
  };

  return (
    <View style={styles.container}>
      {/* Event Image */}
      <Image source={event.image} style={styles.image} />

      {/* Event Title */}
      <Text style={styles.title}>{event.title}</Text>

      {/* Event Date */}
      <Text style={styles.date}>{event.date}</Text>

      {/* Location Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>📍 {event.location.name}</Text>
        <Text style={styles.infoText}>{event.location.address}</Text>
        <TouchableOpacity onPress={handleOpenMaps}>
          <Text style={styles.mapLink}>Otvori lokaciju u Google Maps</Text>
        </TouchableOpacity>
      </View>

      {/* Event Description */}
      <Text style={styles.description}>{event.description}</Text>

      {/* Organizer Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>👤 Organizator</Text>
        <Text style={styles.infoText}>{event.organizer}</Text>
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Prijavi se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#6e6e6e",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#6e6e6e",
  },
  mapLink: {
    fontSize: 14,
    color: "#1E90FF",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#6e6e6e",
    marginBottom: 20,
    lineHeight: 24,
  },
  signupButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  signupButtonText: {
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
