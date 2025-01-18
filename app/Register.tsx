import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig"; // Import Firebase auth instance
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase method for registration
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore methods

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { username, firstName, lastName, address, email, phone, password, confirmPassword } = formData;

    // Validation: Ensure passwords match
    if (password !== confirmPassword) {
      Alert.alert("Greška", "Lozinke se ne podudaraju!");
      return;
    }

    // Validation: Ensure all required fields are filled
    if (!email || !password || !username || !firstName || !lastName || !address || !phone) {
      Alert.alert("Greška", "Molimo ispunite sva polja.");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        username,
        firstName,
        lastName,
        address,
        email,
        phone,
        role: "user", // Default role is "user"
        createdAt: new Date(),
      });

      Alert.alert("Registracija uspješna!", "Vaš račun je kreiran.");
      router.push("/Login"); // Redirect to login screen after registration
    } catch (error: any) {
      console.error("Registration Error:", error);
      Alert.alert("Greška", error.message || "Došlo je do greške prilikom registracije.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../assets/images/logo.png")} // Update the path if needed
          style={styles.logo}
        />
        <Text style={styles.title}>Registracija</Text>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Korisničko ime"
            placeholderTextColor="#A9A9A9"
            value={formData.username}
            onChangeText={(value) => handleInputChange("username", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Ime"
            placeholderTextColor="#A9A9A9"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Prezime"
            placeholderTextColor="#A9A9A9"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange("lastName", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Adresa"
            placeholderTextColor="#A9A9A9"
            value={formData.address}
            onChangeText={(value) => handleInputChange("address", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Broj mobitela"
            placeholderTextColor="#A9A9A9"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Lozinka"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Potvrda lozinke"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            style={styles.input}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Registracija</Text>
          </TouchableOpacity>

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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  container: {
    width: "100%",
    maxWidth: 400,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)", 
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
  loginText: {
    fontSize: 14,
    textAlign: "center",
    color: "#A9A9A9",
  },
  loginLink: {
    color: "#66BB6A",
    fontWeight: "bold",
  },
});
