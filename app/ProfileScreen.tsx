import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";
import { useProfile } from "../contexts/ProfileContext";
import { GradientBackground } from "../components/GradientBackground";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Edit3, Share2, Heart, MessageCircle, Camera, MapPin, Calendar, Users, Award } from "lucide-react-native";



const ProfileScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { profile } = useProfile();


  const stats = [
    { label: "Followers", value: profile.followers, icon: Users, color: theme.primary },
    { label: "Following", value: profile.following, icon: Heart, color: theme.error },
    { label: "Achievements", value: profile.achievements.toString(), icon: Award, color: theme.warning },
  ];

  const quickActions = [
    { title: "Edit Profile", icon: Edit3, color: theme.primary, onPress: () => router.push("/EditProfileScreen") },
    { title: "Share Profile", icon: Share2, color: theme.secondary, onPress: () => {} },
    { title: "Change Photo", icon: Camera, color: theme.accent, onPress: () => {} },
  ];

  return (
    <GradientBackground gradient="background">
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
        style={styles.avatar}
      />
            <TouchableOpacity style={[styles.editAvatarButton, { backgroundColor: theme.primary }]}>
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.name, { color: theme.text }]}>{profile.name}</Text>
          <Text style={[styles.bio, { color: theme.textSecondary }]}>{profile.bio}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={theme.textSecondary} />
            <Text style={[styles.location, { color: theme.textSecondary }]}>{profile.location}</Text>
          </View>
          
          <View style={styles.joinDateContainer}>
            <Calendar size={16} color={theme.textSecondary} />
            <Text style={[styles.joinDate, { color: theme.textSecondary }]}>Joined {profile.joinDate}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} style={StyleSheet.flatten([styles.statCard, { flex: 1 }])}>
                <View style={styles.statContent}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                    <IconComponent size={20} color={stat.color} />
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
          <View style={styles.actionsContainer}>
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.actionButton, { backgroundColor: action.color + '20', borderColor: action.color + '40' }]}
                  onPress={action.onPress}
                >
                  <IconComponent size={20} color={action.color} />
                  <Text style={[styles.actionText, { color: action.color }]}>{action.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activity</Text>
          <Card style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.accent + '20' }]}>
                <MessageCircle size={20} color={theme.accent} />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: theme.text }]}>Posted a new update</Text>
                <Text style={[styles.activityTime, { color: theme.textSecondary }]}>2 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.primary + '20' }]}>
                <Heart size={20} color={theme.primary} />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: theme.text }]}>Liked a post</Text>
                <Text style={[styles.activityTime, { color: theme.textSecondary }]}>5 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.warning + '20' }]}>
                <Award size={20} color={theme.warning} />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: theme.text }]}>Earned a new badge</Text>
                <Text style={[styles.activityTime, { color: theme.textSecondary }]}>1 day ago</Text>
              </View>
            </View>
          </Card>
    </View>

        
      </ScrollView>
    </GradientBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    marginLeft: 6,
  },
  joinDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinDate: {
    fontSize: 14,
    marginLeft: 6,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activityCard: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
  editButton: {
    marginTop: 16,
  },
});
