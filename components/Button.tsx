import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = [styles.button, styles[size]];
    
    if (fullWidth) baseStyle.push(styles.fullWidth);
    
    if (variant === 'outline') {
      return [
        ...baseStyle,
        {
          backgroundColor: 'transparent',
          borderColor: theme.primary,
          borderWidth: 2,
        },
        style,
      ];
    }
    
    if (variant === 'ghost') {
      return [
        ...baseStyle,
        {
          backgroundColor: 'transparent',
        },
        style,
      ];
    }
    
    return [...baseStyle, style];
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'outline') {
      return [
        ...baseTextStyle,
        { color: theme.primary },
        textStyle,
      ];
    }
    
    if (variant === 'ghost') {
      return [
        ...baseTextStyle,
        { color: theme.text },
        textStyle,
      ];
    }
    
    return [
      ...baseTextStyle,
      { color: '#FFFFFF' },
      textStyle,
    ];
  };

  const buttonStyle = getButtonStyle();
  const textStyleFinal = getTextStyle();

  if (variant === 'primary' || variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[buttonStyle, disabled && styles.disabled]}
      >
        <LinearGradient
          colors={variant === 'primary' ? theme.gradient.primary : theme.gradient.secondary}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={textStyleFinal}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[buttonStyle, disabled && styles.disabled]}
    >
      {loading ? (
        <ActivityIndicator color={theme.primary} size="small" />
      ) : (
        <Text style={textStyleFinal}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    minHeight: 56,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
});
