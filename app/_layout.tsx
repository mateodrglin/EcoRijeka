import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();
<<<<<<< HEAD
  const [user, setUser] = useState<User | null>(null);
=======
  const [user, setUser] = useState<User | null>(null); // Properly typed state
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
<<<<<<< HEAD
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return null; 
=======
      setUser(currentUser); // Current user is User or null
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  if (loading) {
    return null; // Optionally, return a loading spinner or splash screen
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
<<<<<<< HEAD
      <Stack screenOptions={{
          headerShown: false, 
        }}>
=======
      <Stack>
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
        {user ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="LoginHome" options={{ headerShown: false }} />
            <Stack.Screen name="Login" />
            <Stack.Screen name="Register" />
          </>
        )}
<<<<<<< HEAD

        
=======
>>>>>>> 56b9d5d70f298f40a9ea79b6fd3bc52339c56985
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
