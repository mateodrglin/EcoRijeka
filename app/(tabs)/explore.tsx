import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Explore() {
  const menuItems = [
    { name: "Početna", icon: "home-outline" },
    { name: "Kalendar", icon: "calendar-month-outline" },
    { name: "Savjeti recikliranja", icon: "lightbulb-outline" },
    { name: "Događaji", icon: "account-outline" },
    { name: "Usluge odvoza", icon: "truck-outline" },
    { name: "Poruke", icon: "message-outline" },
    { name: "Obavijesti", icon: "bell-outline" },
    { name: "Postavke", icon: "cog-outline" },
  ];

  const handlePress = (item: string) => {
    console.log(`Navigating to ${item}`);
    // Add navigation logic here if needed
  };

  return (
    <View style={styles.container}>
      {/* Render Navigation Menu */}
      <ScrollView style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handlePress(item.name)}
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
    paddingVertical: 20,
  },
  menu: {
    flex: 1,
    paddingHorizontal: 10,
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
