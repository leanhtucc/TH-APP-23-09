// src/components/Avatar/styles.ts
import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight } from '../../theme';

export const createStyles = (size: number, Colors: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      position: 'relative',
      width: size,
      height: size,
    },
    image: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: Colors.border,
    },
    fallbackContainer: {
      backgroundColor: Colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    initialsText: {
      color: Colors.primary,
      fontWeight: FontWeight.bold,
      fontSize: Math.round(size * 0.38),
    },
    onlineDot: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: size * 0.28,
      height: size * 0.28,
      borderRadius: size * 0.14,
      borderWidth: 2,
      borderColor: Colors.surface,
    },
    onlineDotOnline: {
      backgroundColor: Colors.success,
    },
    onlineDotOffline: {
      backgroundColor: Colors.textMuted,
    },
    badge: {
      position: 'absolute',
      top: -3,
      right: -3,
      backgroundColor: Colors.danger,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 5,
      borderWidth: 2,
      borderColor: Colors.surface,
    },
    badgeText: {
      color: Colors.white,
      fontSize: FontSize.xs,
      fontWeight: FontWeight.bold,
    },
  });
