import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Explore() {
  const [activeItem, setActiveItem] = useState("Početna"); // To track the selected menu item

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
    setActiveItem(item);
    console.log(`Navigating to ${item}`);
    // Add navigation logic if needed
  };

  return (
    <View style={styles.container}>
      {/* Navigation Menu */}
      <ScrollView style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              activeItem === item.name && styles.activeMenuItem,
            ]}
            onPress={() => handlePress(item.name)}
          >
            <Icon
              name={item.icon}
              size={24}
              color={activeItem === item.name ? "#000" : "#6e6e6e"}
            />
            <Text
              style={[
                styles.menuText,
                activeItem === item.name && styles.activeMenuText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Logout Option */}
        <TouchableOpacity style={styles.logoutItem} onPress={() => console.log("Logging out")}>
          <Icon name="logout" size={24} color="#66BB6A" />
          <Text style={[styles.menuText, styles.logoutText]}>Odjava</Text>
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
  activeMenuItem: {
    backgroundColor: "#F5F5F5", // Highlight background for active item
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#6e6e6e",
  },
  activeMenuText: {
    color: "#000000", // Highlight text for active item
    fontWeight: "bold",
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
