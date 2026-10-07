/* eslint-disable @typescript-eslint/no-shadow */
import React, { memo, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Animated, Easing, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { WeatherTheme } from '../../utils/weatherTheme';
import { useReduceMotion } from '../../hooks/useReduceMotion';
import { getGradientStops } from '../../utils/color';
import styles from './style';

interface WeatherBackgroundProps {
  theme: WeatherTheme;
  children: ReactNode;
}

interface RainParticleProps {
  index: number;
  height: number;
}

const RainParticle = memo(function RainParticle({ index, height }: RainParticleProps): React.JSX.Element {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(Animated.timing(progress, {
      toValue: 1,
      duration: 1100 + (index % 4) * 180,
      delay: (index % 5) * 140,
      easing: Easing.linear,
      useNativeDriver: true,
    }));
    animation.start();
    return () => animation.stop();
  }, [index, progress]);
  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [0, Math.max(0, height - 26)] });
  return (
    <Animated.View
      style={[
        styles.raindrop,
        { left: `${2 + ((index * 37 + 8) % 90)}%`, transform: [{ translateY }, { rotate: '18deg' }] },
      ]}
    />
  );
});

function RainField({ height }: { height: number }): React.JSX.Element {
  return (
    <View pointerEvents="none" style={styles.rainField}>
      {Array.from({ length: 12 }, (_, index) => <RainParticle key={index} index={index} height={height} />)}
    </View>
  );
}

function SunGlow({ top }: { top: number }): React.JSX.Element {
  const scale = useRef(new Animated.Value(1)).current;
  const reduceMotion = useReduceMotion();
  useEffect(() => {
    if (reduceMotion) {
      scale.setValue(1);
      return undefined;
    }
    const pulse = Animated.loop(Animated.sequence([
      Animated.timing(scale, { toValue: 1.08, duration: 1700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 1700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ]));
    pulse.start();
    return () => pulse.stop();
  }, [reduceMotion, scale]);
  return (
    <Animated.View pointerEvents="none" style={[styles.sunGlow, { top, transform: [{ scale }] }]}>
      <View style={styles.sunGlowOuter}>
        <View style={styles.sunGlowMiddle}>
          <View style={styles.sunGlowInner} />
        </View>
      </View>
    </Animated.View>
  );
}

const GradientLayer = memo(function GradientLayer({ top, bottom }: { top: string; bottom: string }): React.JSX.Element {
  const stops = useMemo(() => getGradientStops(top, bottom), [bottom, top]);
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {stops.map((color, index) => <View key={index} style={[styles.gradientBand, { backgroundColor: color }]} />)}
    </View>
  );
});

function WeatherBackground({ theme, children }: WeatherBackgroundProps): React.JSX.Element {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const reduceMotion = useReduceMotion();
  const themeRef = useRef(theme);
  const [previousTheme, setPreviousTheme] = useState<WeatherTheme | null>(null);
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (themeRef.current.background === theme.background && themeRef.current.backgroundSecondary === theme.backgroundSecondary) return undefined;
    const previous = themeRef.current;
    themeRef.current = theme;
    setPreviousTheme(previous);
    progress.stopAnimation();
    if (reduceMotion) {
      progress.setValue(1);
      setPreviousTheme(null);
      return undefined;
    }
    progress.setValue(0);
    const fade = Animated.timing(progress, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true });
    fade.start(({ finished }) => {
      if (finished) setPreviousTheme(null);
    });
    return () => fade.stop();
  }, [progress, reduceMotion, theme]);

  const previousOpacity = progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const isRaining = theme.kind === 'rain' || theme.kind === 'thunder';
  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <GradientLayer top={theme.background} bottom={theme.backgroundSecondary} />
      {previousTheme ? (
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: previousOpacity }]}>
          <GradientLayer top={previousTheme.background} bottom={previousTheme.backgroundSecondary} />
        </Animated.View>
      ) : null}
      {theme.kind === 'clear' && theme.isDay && !reduceMotion ? <SunGlow top={insets.top + 8} /> : null}
      {isRaining && !reduceMotion ? <RainField height={height} /> : null}
      {children}
    </View>
  );
}

export default memo(WeatherBackground);
