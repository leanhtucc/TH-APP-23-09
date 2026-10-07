import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useReduceMotion } from '../../../hooks/useReduceMotion';
import styles from './style';

interface ProgressBarProps {
  value: number;
  color?: string;
}

export default function ProgressBar({ value, color = '#0068ff' }: ProgressBarProps): React.JSX.Element {
  const bounded = Math.min(100, Math.max(0, value));
  const progress = useRef(new Animated.Value(0)).current;
  const reduceMotion = useReduceMotion();
  useEffect(() => {
    if (reduceMotion) {
      progress.setValue(bounded);
      return undefined;
    }
    const animation = Animated.timing(progress, { toValue: bounded, duration: 700, useNativeDriver: false });
    animation.start();
    return () => animation.stop();
  }, [bounded, progress, reduceMotion]);
  const width = progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, { width, backgroundColor: color }]} />
    </View>
  );
}
