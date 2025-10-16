import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

interface GradientBackgroundProps {
  children: React.ReactNode;
  gradient?: 'primary' | 'secondary' | 'background';
  style?: ViewStyle;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  gradient = 'background',
  style,
}) => {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={theme.gradient[gradient]}
      style={[styles.container, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
