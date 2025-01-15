import React from "react";
import { useRouter } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../assets/images/logo.png")} // Adjust the path to your logo
          style={styles.logo}
        />
        <Text style={styles.title}>Prijava</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            style={styles.input}
          />

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            style={styles.input}
          />

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Zaboravili lozinku?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Prijava</Text>
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

          {/* Register Link */}
          <TouchableOpacity onPress={() => router.push("/Register")}>
            <Text style={styles.registerText}>
              Nemate račun? <Text style={styles.registerLink}>Registriraj se</Text>
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
    justifyContent: "center", // Centers content vertically when there’s no overflow
    alignItems: "center", // Centers content horizontally
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  container: {
    width: "100%",
    maxWidth: 400, // Matches the width in Register screen
    alignItems: "center",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#000000",
  },
  loginButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
    color: "#A9A9A9",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
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
  registerText: {
    fontSize: 14,
    textAlign: "center",
    color: "#A9A9A9",
  },
  registerLink: {
    color: "#66BB6A",
    fontWeight: "bold",
  },
});
