import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { GradientBackground } from "../components/GradientBackground";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Moon, Sun, Bell, Shield, HelpCircle, LogOut, User, Palette, Volume2, Globe, Download } from "lucide-react-native";

const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => console.log("Logout") },
      ]
    );
  };

  const settingsSections = [
    {
      title: "Appearance",
      items: [
        {
          title: "Dark Mode",
          subtitle: "Switch between light and dark themes",
          icon: isDark ? Moon : Sun,
          color: isDark ? theme.warning : theme.primary,
          type: "switch" as const,
          value: isDark,
          onPress: toggleTheme,
        },
        {
          title: "Theme Color",
          subtitle: "Customize your app colors",
          icon: Palette,
          color: theme.secondary,
          type: "navigate" as const,
          onPress: () => {},
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          title: "Push Notifications",
          subtitle: "Receive notifications on your device",
          icon: Bell,
          color: theme.accent,
          type: "switch" as const,
          value: notifications,
          onPress: () => setNotifications(!notifications),
        },
        {
          title: "Sound Effects",
          subtitle: "Play sounds for interactions",
          icon: Volume2,
          color: theme.primary,
          type: "switch" as const,
          value: soundEnabled,
          onPress: () => setSoundEnabled(!soundEnabled),
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          title: "Privacy Settings",
          subtitle: "Manage your privacy preferences",
          icon: Shield,
          color: theme.success,
          type: "navigate" as const,
          onPress: () => {},
        },
        {
          title: "Data & Storage",
          subtitle: "Control your data usage",
          icon: Download,
          color: theme.warning,
          type: "navigate" as const,
          onPress: () => {},
        },
      ],
    },
    {
      title: "General",
      items: [
        {
          title: "Language",
          subtitle: "Choose your preferred language",
          icon: Globe,
          color: theme.primary,
          type: "navigate" as const,
          onPress: () => {},
        },
        {
          title: "Help & Support",
          subtitle: "Get help and contact support",
          icon: HelpCircle,
          color: theme.secondary,
          type: "navigate" as const,
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <GradientBackground gradient="background">
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Customize your app experience
          </Text>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
            <Card style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex < section.items.length - 1 && styles.settingItemBorder,
                      { borderBottomColor: theme.border }
                    ]}
                    onPress={item.type === 'navigate' ? item.onPress : undefined}
                    disabled={item.type === 'switch'}
                  >
                    <View style={styles.settingContent}>
                      <View style={[styles.settingIcon, { backgroundColor: item.color + '20' }]}>
                        <IconComponent size={20} color={item.color} />
                      </View>
                      <View style={styles.settingText}>
                        <Text style={[styles.settingTitle, { color: theme.text }]}>{item.title}</Text>
                        <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                          {item.subtitle}
                        </Text>
                      </View>
                    </View>
                    
                    {item.type === 'switch' && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onPress}
                        thumbColor={item.value ? "#FFFFFF" : "#F4F3F4"}
                        trackColor={{ 
                          false: theme.border, 
                          true: item.color 
                        }}
                        ios_backgroundColor={theme.border}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </Card>
          </View>
        ))}

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Account</Text>
          <Card style={styles.sectionCard}>
            <TouchableOpacity style={[styles.settingItem, { borderBottomWidth: 0 }]}>
              <View style={styles.settingContent}>
                <View style={[styles.settingIcon, { backgroundColor: theme.primary + '20' }]}>
                  <User size={20} color={theme.primary} />
                </View>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: theme.text }]}>Account Settings</Text>
                  <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                    Manage your account details
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          size="large"
          style={StyleSheet.flatten([styles.logoutButton, { borderColor: theme.error }])}
          textStyle={{ color: theme.error }}
          fullWidth
        />
      </ScrollView>
    </GradientBackground>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  logoutButton: {
    marginTop: 32,
  },
});
