import { Stack } from "expo-router";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ProfileProvider } from "../contexts/ProfileContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ProfileProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" options={{ title: "Home" }} />
        <Stack.Screen name="ProfileScreen" options={{ title: "Profile" }} />
        <Stack.Screen name="EditProfileScreen" options={{ title: "Edit Profile" }} />
        <Stack.Screen name="SettingsScreen" options={{ title: "Settings" }} />
      </Stack>
      </ProfileProvider>
    </ThemeProvider>
  );
}
