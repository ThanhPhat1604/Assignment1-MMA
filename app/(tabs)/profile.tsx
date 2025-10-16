import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { GradientBackground } from '../../components/GradientBackground';
import ProfileScreen from '../ProfileScreen';

export default function ProfileTab() {
  return <ProfileScreen />;
}
