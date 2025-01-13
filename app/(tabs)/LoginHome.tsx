import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import Login from "../../components/Login"; // Correct import path
import Register from "../../components/Register"; // Correct import path

export default function LoginHome() {
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register
  const [showForm, setShowForm] = useState(false); // Control visibility of the form

  return (
    <ImageBackground
      source={require("../../assets/images/Login.png")} // Correct background image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Always Display the Logo */}
        <Image
          source={require("../../assets/images/logo.png")} // Correct path to logo
          style={styles.logo}
        />
        <Text style={styles.title}>EcoRijeka</Text>

        {/* Show the form when the user clicks one of the buttons */}
        {showForm && (
          <View style={styles.formContainer}>
            {isRegister ? <Register /> : <Login />}
          </View>
        )}

        {/* Toggle Buttons for Login and Register */}
        {!showForm && (
          <>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => {
                setIsRegister(false); // Ensure it's set to Login when "Prijava" is clicked
                setShowForm(true); // Show the Login form
              }}
            >
              <Text style={styles.buttonText}>Prijava</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => {
                setIsRegister(true); // Ensure it's set to Register when "Registracija" is clicked
                setShowForm(true); // Show the Register form
              }}
            >
              <Text style={styles.buttonSecondaryText}>Registracija</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000000",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400, // Optional: limits form container width for better visual
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  buttonPrimary: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#66BB6A",
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondaryText: {
    color: "#66BB6A",
    fontSize: 16,
    fontWeight: "bold",
  },
});
