import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  size?: 'small' | 'medium' | 'large';
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  maxCount = 99,
  size = 'small',
}) => {
  const { theme } = useTheme();

  if (count === 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: 18,
          height: 18,
          borderRadius: 9,
          fontSize: 10,
        };
      case 'medium':
        return {
          width: 22,
          height: 22,
          borderRadius: 11,
          fontSize: 12,
        };
      case 'large':
        return {
          width: 28,
          height: 28,
          borderRadius: 14,
          fontSize: 14,
        };
      default:
        return {
          width: 18,
          height: 18,
          borderRadius: 9,
          fontSize: 10,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: theme.error,
          width: sizeStyles.width,
          height: sizeStyles.height,
          borderRadius: sizeStyles.borderRadius,
        },
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          {
            color: '#FFFFFF',
            fontSize: sizeStyles.fontSize,
          },
        ]}
      >
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 18,
    minHeight: 18,
    paddingHorizontal: 4,
  },
  badgeText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
