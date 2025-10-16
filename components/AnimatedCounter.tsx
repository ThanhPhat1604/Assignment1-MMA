import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  style?: TextStyle;
  suffix?: string;
  prefix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  style,
  suffix = '',
  prefix = '',
}) => {
  const animatedValue = useSharedValue(0);
  const prevValue = useRef(value);

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration });
    prevValue.value = value;
  }, [value, duration, animatedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      animatedValue.value,
      [prevValue.current, value],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: withTiming(progress, { duration: 200 }),
      transform: [
        {
          scale: interpolate(progress, [0, 0.5, 1], [0.8, 1.1, 1], Extrapolate.CLAMP),
        },
      ],
    };
  });

  return (
    <Animated.Text style={[styles.text, style, animatedStyle]}>
      {prefix}{Math.round(animatedValue.value)}{suffix}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
