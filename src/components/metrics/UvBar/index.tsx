import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { useReduceMotion } from '../../../hooks/useReduceMotion';
import { getUvLevel } from '../../../utils/metrics';
import styles from './style';

interface UvBarProps {
  value: number;
  textColor?: string;
}

const SEGMENTS = [
  { flex: 3, color: '#22c55e' },
  { flex: 3, color: '#eab308' },
  { flex: 2, color: '#f97316' },
  { flex: 3, color: '#ef4444' },
  { flex: 1, color: '#8b5cf6' },
];

export default function UvBar({ value, textColor = '#4b5563' }: UvBarProps): React.JSX.Element {
  const reduceMotion = useReduceMotion();
  const position = useRef(new Animated.Value(0)).current;
  const bounded = Math.min(100, Math.max(0, (Math.round(value) / 12) * 100));
  useEffect(() => {
    if (reduceMotion) {
      position.setValue(bounded);
      return undefined;
    }
    const animation = Animated.timing(position, { toValue: bounded, duration: 700, useNativeDriver: false });
    animation.start();
    return () => animation.stop();
  }, [bounded, position, reduceMotion]);
  const markerLeft = position.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {SEGMENTS.map(segment => (
          <View key={segment.color} style={[styles.segment, { backgroundColor: segment.color, flex: segment.flex }]} />
        ))}
        <Animated.View style={[styles.marker, { left: markerLeft }]} />
      </View>
      <Text style={[styles.level, { color: textColor }]}>{getUvLevel(value)}</Text>
    </View>
  );
}
