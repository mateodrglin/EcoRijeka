import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Login from "../../components/Login";
import Register from "../../components/Register";

export default function LoginHome() {
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoRijeka</Text>

      {/* Toggle between Login and Register */}
      {isRegister ? <Register /> : <Login />}

      {/* Toggle Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsRegister(!isRegister)}
      >
        <Text style={styles.toggleText}>
          {isRegister ? "Natrag na Prijava" : "Idi na Registracija"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  toggleButton: {
    marginTop: 20,
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
