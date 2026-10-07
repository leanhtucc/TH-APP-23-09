import { useEffect, useMemo } from 'react';
import { Animated } from 'react-native';
import { useReduceMotion } from './useReduceMotion';

export function useStaggeredEntrance(count: number, enabled = true) {
  const reduceMotion = useReduceMotion();
  const values = useMemo(
    () => Array.from({ length: count }, () => ({ opacity: new Animated.Value(0), offset: new Animated.Value(16) })),
    [count],
  );

  useEffect(() => {
    if (!enabled) {
      values.forEach(({ opacity, offset }) => {
        opacity.setValue(0);
        offset.setValue(16);
      });
      return undefined;
    }
    if (reduceMotion) {
      values.forEach(({ opacity, offset }) => {
        opacity.setValue(1);
        offset.setValue(0);
      });
      return undefined;
    }
    const animations = values.map(({ opacity, offset }, index) => Animated.sequence([
      Animated.delay(index * 80),
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(offset, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ]));
    const animation = Animated.parallel(animations);
    animation.start();
    return () => animation.stop();
  }, [enabled, reduceMotion, values]);

  return values.map(({ opacity, offset }) => ({
    opacity,
    transform: [{ translateY: offset }],
  }));
}
