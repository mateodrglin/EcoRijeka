import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prijava</Text>

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

      {/* Register Link */}
      <TouchableOpacity>
        <Text style={styles.registerText}>
          Nemate račun? <Text style={styles.registerLink}>Registriraj se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
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
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 10,
    fontSize: 14,
    color: "#A9A9A9",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
    color: "#A9A9A9",
  },
  registerLink: {
    color: "#66BB6A",
    fontWeight: "bold",
  },
});
