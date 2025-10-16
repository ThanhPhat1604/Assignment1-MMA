import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { GradientBackground } from "../../components/GradientBackground";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Search, Filter, Star, TrendingUp, Users, Calendar, MapPin, Heart } from "lucide-react-native";

const { width } = Dimensions.get('window');

export default function ExploreScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', title: 'All', icon: TrendingUp },
    { id: 'trending', title: 'Trending', icon: Star },
    { id: 'nearby', title: 'Nearby', icon: MapPin },
    { id: 'events', title: 'Events', icon: Calendar },
  ];

  const featuredContent = [
    {
      id: 1,
      title: "Tech Meetup 2024",
      subtitle: "Join the biggest tech community event",
      category: "Events",
      attendees: "500+",
      location: "San Francisco",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
      isTrending: true,
    },
    {
      id: 2,
      title: "React Native Workshop",
      subtitle: "Learn advanced React Native techniques",
      category: "Workshop",
      attendees: "50",
      location: "Online",
      date: "March 20, 2024",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400",
      isTrending: false,
    },
    {
      id: 3,
      title: "Mobile App Design Trends",
      subtitle: "Latest trends in mobile app design",
      category: "Article",
      attendees: "1.2K views",
      location: "Medium",
      date: "March 18, 2024",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400",
      isTrending: true,
    },
  ];

  const recommendedUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "UX Designer",
      followers: "2.3K",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
    },
    {
      id: 2,
      name: "Mike Chen",
      title: "React Developer",
      followers: "1.8K",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      id: 3,
      name: "Emma Wilson",
      title: "Product Manager",
      followers: "3.1K",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
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
          <Text style={[styles.title, { color: theme.text }]}>Explore</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Discover amazing content and connect with others
          </Text>
        </View>

        {/* Search Bar */}
        <Card style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Search size={20} color={theme.textSecondary} />
            <Text style={[styles.searchPlaceholder, { color: theme.textSecondary }]}>
              Search for events, users, or content...
            </Text>
          </View>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.primary + '20' }]}>
            <Filter size={18} color={theme.primary} />
          </TouchableOpacity>
        </Card>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    { 
                      backgroundColor: isSelected ? theme.primary : theme.cardSecondary,
                      borderColor: isSelected ? theme.primary : theme.border,
                    }
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <IconComponent 
                    size={16} 
                    color={isSelected ? '#FFFFFF' : theme.textSecondary} 
                  />
                  <Text style={[
                    styles.categoryText,
                    { color: isSelected ? '#FFFFFF' : theme.textSecondary }
                  ]}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured Content */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured Content</Text>
          {featuredContent.map((content) => (
            <Card key={content.id} style={styles.contentCard} onPress={() => {}}>
              <View style={styles.contentHeader}>
                <View style={styles.contentInfo}>
                  <Text style={[styles.contentTitle, { color: theme.text }]}>{content.title}</Text>
                  <Text style={[styles.contentSubtitle, { color: theme.textSecondary }]}>
                    {content.subtitle}
                  </Text>
                </View>
                {content.isTrending && (
                  <View style={[styles.trendingBadge, { backgroundColor: theme.error + '20' }]}>
                    <TrendingUp size={12} color={theme.error} />
                    <Text style={[styles.trendingText, { color: theme.error }]}>Trending</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.contentMeta}>
                <View style={styles.metaItem}>
                  <Users size={14} color={theme.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                    {content.attendees}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <MapPin size={14} color={theme.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                    {content.location}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Calendar size={14} color={theme.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                    {content.date}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Recommended Users */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recommended Users</Text>
          <Card style={styles.usersCard}>
            {recommendedUsers.map((user, index) => (
              <TouchableOpacity 
                key={user.id} 
                style={[
                  styles.userItem,
                  index < recommendedUsers.length - 1 && styles.userItemBorder,
                  { borderBottomColor: theme.border }
                ]}
              >
                <View style={styles.userAvatar}>
                  <Text style={[styles.avatarText, { color: theme.text }]}>
                    {user.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={[styles.userName, { color: theme.text }]}>{user.name}</Text>
                  <Text style={[styles.userTitle, { color: theme.textSecondary }]}>{user.title}</Text>
                </View>
                <View style={styles.userActions}>
                  <Text style={[styles.followersText, { color: theme.textSecondary }]}>
                    {user.followers} followers
                  </Text>
                  <TouchableOpacity style={[styles.followButton, { backgroundColor: theme.primary + '20' }]}>
                    <Text style={[styles.followButtonText, { color: theme.primary }]}>Follow</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchPlaceholder: {
    fontSize: 16,
    marginLeft: 12,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingRight: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 12,
    gap: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentCard: {
    padding: 16,
    marginBottom: 12,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contentInfo: {
    flex: 1,
    marginRight: 12,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contentSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  contentMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  usersCard: {
    padding: 0,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userItemBorder: {
    borderBottomWidth: 1,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userTitle: {
    fontSize: 14,
  },
  userActions: {
    alignItems: 'flex-end',
  },
  followersText: {
    fontSize: 12,
    marginBottom: 4,
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
