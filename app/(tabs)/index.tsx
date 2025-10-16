import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";
import { GradientBackground } from "../../components/GradientBackground";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { User, Settings, Heart, Star, TrendingUp, Calendar } from "lucide-react-native";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const quickActions = [
    {
      title: "My Profile",
      subtitle: "View & edit your profile",
      icon: User,
      color: theme.primary,
      onPress: () => router.push("/ProfileScreen"),
    },
    {
      title: "Settings",
      subtitle: "Customize your app",
      icon: Settings,
      color: theme.secondary,
      onPress: () => router.push("/SettingsScreen"),
    },
    {
      title: "Favorites",
      subtitle: "Your saved items",
      icon: Heart,
      color: theme.error,
      onPress: () => {},
    },
    {
      title: "Achievements",
      subtitle: "Your milestones",
      icon: Star,
      color: theme.warning,
      onPress: () => {},
    },
  ];

  const stats = [
    { label: "Profile Views", value: "1.2K", icon: TrendingUp, color: theme.accent },
    { label: "Days Active", value: "45", icon: Calendar, color: theme.primary },
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
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>Good morning!</Text>
          <Text style={[styles.title, { color: theme.text }]}>Welcome back 👋</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Manage your profile and explore new features
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} style={StyleSheet.flatten([styles.statCard, { flex: 1 }])}>
                <View style={styles.statContent}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                    <IconComponent size={24} color={stat.color} />
                  </View>
                  <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
                </View>
              </Card>
            );
          })}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card 
                  key={index} 
                  style={StyleSheet.flatten([styles.actionCard, { width: (width - 48) / 2 }])}
                  onPress={action.onPress}
                >
                  <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                    <IconComponent size={28} color={action.color} />
                  </View>
                  <Text style={[styles.actionTitle, { color: theme.text }]}>{action.title}</Text>
                  <Text style={[styles.actionSubtitle, { color: theme.textSecondary }]}>{action.subtitle}</Text>
                </Card>
              );
            })}
          </View>
        </View>

        {/* Main Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Profile Management</Text>
          <Card style={styles.mainActionCard}>
            <View style={styles.mainActionContent}>
              <View style={styles.mainActionText}>
                <Text style={[styles.mainActionTitle, { color: theme.text }]}>Complete Your Profile</Text>
                <Text style={[styles.mainActionSubtitle, { color: theme.textSecondary }]}>
                  Add more details to make your profile stand out
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    padding: 16,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    padding: 16,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  mainActionCard: {
    padding: 20,
  },
  mainActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainActionText: {
    flex: 1,
    marginRight: 16,
  },
  mainActionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mainActionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  mainActionButton: {
    minWidth: 120,
  },
});
