import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

export default function Explore() {
  const router = useRouter();

  const menuItems: { name: string; icon: string; route?: "/Kalendar" | "/Register" | "/Login" | "/" | "SavjetiRecikliranja" | "UslugeOdvoza" | "dogadjaji" }[] = [
    { name: "Početna", icon: "home-outline", route: "/" },
    { name: "Kalendar", icon: "calendar-month-outline", route: "/Kalendar" },
    { name: "Savjeti recikliranja", icon: "lightbulb-outline", route: "/SavjetiRecikliranja" },
    { name: "Događaji", icon: "account-outline", route: "/dogadjaji"},
    { name: "Usluge odvoza", icon: "truck-outline", route: "/UslugeOdvoza" },
    { name: "Poruke", icon: "message-outline" },
    { name: "Obavijesti", icon: "bell-outline" },
    { name: "Postavke", icon: "cog-outline" },
  ];

  const handlePress = (item: { name: string; route?: string }) => {
    if (item.route) {
      router.push(item.route);
    } else {
      console.log(`Navigating to ${item.name}`);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/EcoRijeka.png")}
        style={styles.headerImage}
        resizeMode="cover"
      />

      {/* Render Navigation Menu */}
      <ScrollView contentContainerStyle={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handlePress(item)}
          >
            <Icon name={item.icon} size={24} color="#6e6e6e" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Option */}
        <TouchableOpacity style={styles.logoutItem}>
          <Icon name="logout" size={24} color="#66BB6A" />
          <Text style={styles.logoutText}>Odjava</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerImage: {
    width: "100%",
    height: 200,
    marginBottom: 10, 
  },
  menu: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: -10, 
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#6e6e6e",
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#66BB6A",
    fontWeight: "bold",
  },
});
