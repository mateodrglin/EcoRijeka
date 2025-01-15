import React from "react";
import { useRouter } from "expo-router"; // Import useRouter
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function Register() {
  const router = useRouter(); // Initialize the router

  return (
    <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../assets/images/logo.png")} // Adjust the path to your logo
          style={styles.logo}
        />

      {/* Title */}
      <Text style={styles.title}>Registracija</Text>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Korisničko ime"
          placeholderTextColor="#A9A9A9"
          style={styles.input}
        />
        <TextInput placeholder="Ime" placeholderTextColor="#A9A9A9" style={styles.input} />
        <TextInput placeholder="Prezime" placeholderTextColor="#A9A9A9" style={styles.input} />
        <TextInput placeholder="Adresa" placeholderTextColor="#A9A9A9" style={styles.input} />
        <TextInput placeholder="Email" placeholderTextColor="#A9A9A9" style={styles.input} />
        <TextInput
          placeholder="Broj mobitela"
          placeholderTextColor="#A9A9A9"
          style={styles.input}
        />
        <TextInput
          placeholder="Lozinka"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Potvrda lozinke"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          style={styles.input}
        />

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Registracija</Text>
        </TouchableOpacity>

        {/* Continue with */}
        <Text style={styles.orText}>ili nastavi sa</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: "https://img.icons8.com/color/48/000000/google-logo.png" }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: "https://img.icons8.com/color/48/000000/facebook.png" }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Already Have an Account */}
        <TouchableOpacity onPress={() => router.push("/Login")}>
          <Text style={styles.loginText}>
            Već imaš račun? <Text style={styles.loginLink}>Prijava</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    paddingHorizontal: 20,
    position: "relative", // Ensure proper placement of the back button
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#000000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
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
  input: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    fontSize: 14,
    color: "#A9A9A9",
    marginVertical: 15,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    fontSize: 16,
  },
  loginText: {
    textAlign: "center",
    fontSize: 14,
    color: "#A9A9A9",
  },
  loginLink: {
    color: "#66BB6A",
    fontWeight: "bold",
  },
});
