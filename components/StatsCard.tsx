import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from './Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ComponentType<{ size: number; color: string }>;
  color?: string;
  onPress?: () => void;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: IconComponent,
  color,
  onPress,
  trend,
}) => {
  const { theme } = useTheme();
  const cardColor = color || theme.primary;

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper onPress={onPress} style={styles.cardWrapper}>
      <Card style={[styles.card, { borderLeftColor: cardColor }]}>
        <View style={styles.cardContent}>
          {IconComponent && (
            <View style={[styles.iconContainer, { backgroundColor: cardColor + '20' }]}>
              <IconComponent size={24} color={cardColor} />
            </View>
          )}
          
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {trend && (
          <View style={styles.trendContainer}>
            <View
              style={[
                styles.trendIndicator,
                {
                  backgroundColor: trend.isPositive ? theme.success + '20' : theme.error + '20',
                },
              ]}
            >
              <Text
                style={[
                  styles.trendText,
                  {
                    color: trend.isPositive ? theme.success : theme.error,
                  },
                ]}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Text>
            </View>
          </View>
        )}
      </Card>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
  },
  card: {
    padding: 16,
    borderLeftWidth: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
  },
  trendContainer: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  trendIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
