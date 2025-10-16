import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile, defaultProfile } from "../constants/profileData";

type ProfileContextType = {
  profile: Profile;
  updateProfile: (newProfile: Partial<Profile>) => void;
  isLoading: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const PROFILE_KEY = "@user_profile";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(PROFILE_KEY);
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch (err) {
        console.warn("Failed to load profile:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const updateProfile = (newProfile: Partial<Profile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...newProfile };
      AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated)).catch(console.warn);
      return updated;
    });
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used inside ProfileProvider");
  return context;
};
