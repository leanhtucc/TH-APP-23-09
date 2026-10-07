import React, { useRef, type ReactNode } from 'react';
import { Animated, Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { useReduceMotion } from '../../hooks/useReduceMotion';
import styles from './style';

interface PressableScaleProps extends Omit<PressableProps, 'children'> {
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  fill?: boolean;
}

export default function PressableScale({ children, onPressIn, onPressOut, style, contentStyle, fill = false, ...props }: PressableScaleProps): React.JSX.Element {
  const scale = useRef(new Animated.Value(1)).current;
  const reduceMotion = useReduceMotion();
  const pressableStyle: PressableProps['style'] = typeof style === 'function'
    ? state => [style(state), styles.pressable]
    : [style, styles.pressable];
  const animateTo = (value: number): void => {
    if (reduceMotion) return;
    Animated.spring(scale, { toValue: value, useNativeDriver: true, speed: 30, bounciness: 4 }).start();
  };
  return (
    <Pressable
      {...props}
      onPressIn={event => {
        animateTo(0.96);
        onPressIn?.(event);
      }}
      onPressOut={event => {
        animateTo(1);
        onPressOut?.(event);
      }}
      style={pressableStyle}
    >
      <Animated.View style={[styles.content, fill ? styles.fill : undefined, contentStyle, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}
