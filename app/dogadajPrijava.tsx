import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router"; 

export default function EventRegistration() {
  const route = useRoute();
  const navigation = useNavigation();
  const { title } = route.params;
    const router = useRouter(); 
  

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [mobitel, setMobitel] = useState("");
  const [poruka, setPoruka] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle form input changes
  const handleInputChange = (name: string, value: string) => {
    if (name === "ime") setIme(value);
    else if (name === "prezime") setPrezime(value);
    else if (name === "email") setEmail(value);
    else if (name === "mobitel") setMobitel(value);
    else if (name === "poruka") setPoruka(value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validation
    if (!ime || !prezime || !email || !mobitel || !poruka) {
      setErrorMessage("Sva polja su obavezna."); 
      return;
    }

    try {
      const db = getFirestore();
      // Add data to Firestore
      await addDoc(collection(db, "dogadajPrijava"), {
        ime,
        prezime,
        email,
        mobitel,
        poruka,
        dogadaj: title, 
        createdAt: new Date(), 
      });

      Alert.alert("Prijava uspješna!", "Vaši podaci su spremljeni.", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);

      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
      setErrorMessage("Došlo je do greške prilikom spremanja podataka."); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Back Button */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Prijavi se</Text>
      </View>

        <TextInput
          placeholder="Ime"
          value={ime}
          onChangeText={(value) => handleInputChange("ime", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Prezime"
          value={prezime}
          onChangeText={(value) => handleInputChange("prezime", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(value) => handleInputChange("email", value)}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Broj mobitela"
          value={mobitel}
          onChangeText={(value) => handleInputChange("mobitel", value)}
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Poruka"
          value={poruka}
          onChangeText={(value) => handleInputChange("poruka", value)}
          style={[styles.input, styles.textArea]}
          multiline
        />
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Prijavi se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  container: {
    width: "100%",
    maxWidth: 400,
    paddingTop: 20, 
  },
  backButton: {
    padding: 5, 
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10, 
    paddingVertical: 8, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginRight:90,
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
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF6347",
    fontSize: 14,
    marginBottom: 10,
  },
});
