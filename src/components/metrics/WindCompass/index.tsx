import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { useReduceMotion } from '../../../hooks/useReduceMotion';
import styles from './style';

interface WindCompassProps {
  windDirection: number;
  color?: string;
}

export default function WindCompass({ windDirection, color = '#ffffff' }: WindCompassProps): React.JSX.Element {
  // Open-Meteo cho biết gió thổi từ đâu; mũi tên chỉ hướng gió thổi tới.
  const direction = ((windDirection + 180) % 360 + 360) % 360;
  const progress = useRef(new Animated.Value(0)).current;
  const reduceMotion = useReduceMotion();
  useEffect(() => {
    if (reduceMotion) {
      progress.setValue(1);
      return undefined;
    }
    progress.setValue(0);
    const animation = Animated.timing(progress, { toValue: 1, duration: 800, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [direction, progress, reduceMotion]);
  const rotation = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${direction}deg`] });
  return (
    <View style={styles.wrapper}>
      <View style={styles.compass}>
        <Text style={[styles.cardinal, styles.north, { color }]}>B</Text>
        <Text style={[styles.cardinal, styles.east, { color }]}>Đ</Text>
        <Text style={[styles.cardinal, styles.south, { color }]}>N</Text>
        <Text style={[styles.cardinal, styles.west, { color }]}>T</Text>
        <Animated.Text style={[styles.arrow, { color, transform: [{ rotate: rotation }] }]}>↑</Animated.Text>
      </View>
    </View>
  );
}
