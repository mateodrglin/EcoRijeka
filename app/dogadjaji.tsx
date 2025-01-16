import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function Dogadjaji() {
  const router = useRouter();

  const events = [
    {
      id: 1,
      title: "Čišćenje smeća",
      date: "Pon, 10 sij - 10h",
      image: require("@/assets/images/smece.jpg"),
      description: "Ovaj događaj uključuje čišćenje smeća u lokalnoj zajednici.",
    },
    {
      id: 2,
      title: "Odlaganje smeća",
      date: "Pon, 12 velj - 18h",
      image: require("@/assets/images/smece2.jpg"),
      description: "Saznajte kako pravilno odložiti otpad uz našu pomoć.",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Događaji</Text>
      <ScrollView>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() =>
              router.push({
                pathname: `/dogadjaji/${event.id}`,
                params: { title: event.title, description: event.description },
              })
            }
          >
            <Image source={event.image} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", 
  },
  
  eventImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  eventInfo: {
    flex: 1,
    paddingHorizontal: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: "#6e6e6e",
  },
});
