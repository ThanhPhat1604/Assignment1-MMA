import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";
import { useProfile } from "../contexts/ProfileContext";
import { GradientBackground } from "../components/GradientBackground";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { AvatarPicker } from "../components/AvatarPicker";
import { ArrowLeft, Camera, MapPin, Briefcase, Globe, Phone, Mail } from "lucide-react-native";

const EditProfileScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);
  const [job, setJob] = useState(profile.job);
  const [website, setWebsite] = useState(profile.website);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);

  useEffect(() => {
    // Khi context thay đổi, cập nhật form
    setName(profile.name);
    setBio(profile.bio);
    setLocation(profile.location);
    setJob(profile.job);
    setWebsite(profile.website);
    setPhone(profile.phone);
    setEmail(profile.email);
    setAvatar(profile.avatar);
  }, [profile]);

  const handleSave = () => {
    updateProfile({
      name,
      bio,
      location,
      job,
      website,
      phone,
      email,
      avatar,
    });
    Alert.alert("Success", "Your profile has been updated!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };
  
  const handleCancel = () => {
    Alert.alert(
      "Discard Changes",
      "Are you sure you want to discard your changes?",
      [
        { text: "Keep Editing", style: "cancel" },
        { text: "Discard", style: "destructive", onPress: () => router.back() },
      ]
    );
  };

  const inputFields = [
    {
      label: "Full Name",
      value: name,
      onChangeText: setName,
      icon: Briefcase,
      placeholder: "Enter your full name",
    },
    {
      label: "Location",
      value: location,
      onChangeText: setLocation,
      icon: MapPin,
      placeholder: "Where are you based?",
    },
    {
      label: "Job Title",
      value: job,
      onChangeText: setJob,
      icon: Briefcase,
      placeholder: "What do you do?",
    },
    {
      label: "Website",
      value: website,
      onChangeText: setWebsite,
      icon: Globe,
      placeholder: "Your website or portfolio",
    },
    {
      label: "Phone",
      value: phone,
      onChangeText: setPhone,
      icon: Phone,
      placeholder: "Your phone number",
    },
    {
      label: "Email",
      value: email,
      onChangeText: setEmail,
      icon: Mail,
      placeholder: "Your email address",
    },
  ];

  return (
    <GradientBackground gradient="background">
      <View style={{ flex: 1 }}>
        {/* Nội dung có thể cuộn */}
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
              <ArrowLeft size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Edit Profile</Text>
            <View style={styles.placeholder} />
          </View>
  
          {/* Avatar Section */}
          <Card style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <AvatarPicker currentAvatar={avatar} onAvatarChange={setAvatar} />
              </View>
              <Text style={[styles.avatarLabel, { color: theme.text }]}>Profile Picture</Text>
              <Text style={[styles.avatarSubtitle, { color: theme.textSecondary }]}>
                Tap the camera icon to change your photo
              </Text>
            </View>
          </Card>
  
          {/* Bio Section */}
          <Card style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Bio</Text>
            <TextInput
              style={[
                styles.bioInput,
                {
                  color: theme.text,
                  borderColor: theme.border,
                  backgroundColor: theme.cardSecondary,
                },
              ]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself..."
              placeholderTextColor={theme.placeholder}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Text style={[styles.characterCount, { color: theme.textSecondary }]}>
              {bio.length}/200 characters
            </Text>
          </Card>
  
          {/* Personal Information */}
          <Card style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Personal Information</Text>
            {inputFields.map((field, index) => {
              const IconComponent = field.icon;
              return (
                <View key={index} style={styles.inputGroup}>
                  <View style={styles.inputLabelContainer}>
                    <IconComponent size={16} color={theme.textSecondary} />
                    <Text style={[styles.inputLabel, { color: theme.text }]}>{field.label}</Text>
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.border,
                        backgroundColor: theme.cardSecondary,
                      },
                    ]}
                    value={field.value}
                    onChangeText={field.onChangeText}
                    placeholder={field.placeholder}
                    placeholderTextColor={theme.placeholder}
                  />
                </View>
              );
            })}
          </Card>
        </ScrollView>
  
        {/* Nút hành động cố định ở dưới cùng */}
        <View
          style={[
            styles.fixedActionButtons,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <View style={{ flex: 1 }}>
          <Button
            title="Cancel"
            onPress={handleCancel}
            variant="outline"
            size="large"
            style={StyleSheet.flatten([
              styles.actionButton,
              { borderColor: theme.border, backgroundColor: theme.card },
            ])}
            textStyle={{ color: theme.text }}
          />
          </View>
          <View style={{ flex: 1 }}>
          <Button
            title="Save"
            onPress={handleSave}
            variant="outline"
            size="large"
                  style={StyleSheet.flatten([
              styles.actionButton,
              { borderColor: theme.border, backgroundColor: theme.card },
            ])}
            textStyle={{ color: theme.text }}
          />
          </View>
        </View>
      </View>
    </GradientBackground>
  );
};  
export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  avatarSection: {
    margin: 20,
    marginBottom: 16,
    padding: 24,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  avatarLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  avatarSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bioInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    textAlign: 'right',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
  },
  fixedActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },  
});