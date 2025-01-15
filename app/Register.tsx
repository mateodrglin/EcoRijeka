import React from "react";
import { useRouter } from "expo-router"; // Import useRouter
import {
  ScrollView,
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <TextInput
            placeholder="Prezime"
            placeholderTextColor="#A9A9A9"
            style={styles.input}
          />
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
                source={{
                  uri: "https://img.icons8.com/color/48/000000/google-logo.png",
                }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: "https://img.icons8.com/color/48/000000/facebook.png",
                }}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Center content vertically when no scrolling
    alignItems: "center", // Center content horizontally
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  container: {
    width: "100%",
    maxWidth: 400, // Optional: limits form container width for better visual
    alignItems: "center", // Center the logo and title
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)", // For web
    elevation: 5,
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
