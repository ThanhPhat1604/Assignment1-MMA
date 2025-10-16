import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { GradientBackground } from '../../components/GradientBackground';
import SettingsScreen from '../SettingsScreen';

export default function SettingsTab() {
  return <SettingsScreen />;
}
