import React, { useMemo, useState } from 'react';
import {
  View,
  Image,
} from 'react-native';
import { Text } from '../Typography';
import { AvatarProps } from './types';
import { createStyles } from './styles';
import { useTheme } from '../../context/ThemeContext';

// Mỗi người một màu pastel (theo tên) như trong design
const TONES = [
  { bg: '#FFE4D6', fg: '#9A3412' },
  { bg: '#E0F2E9', fg: '#166534' },
  { bg: '#E9E3FF', fg: '#5B21B6' },
  { bg: '#FFE1EC', fg: '#9D174D' },
  { bg: '#DCE6FF', fg: '#1D3FBF' },
];

const pickTone = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % 1000003;
  return TONES[hash % TONES.length];
};

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name = '',
  size = 48,
  showOnlineDot = false,
  isOnline = false,
  badge,
}) => {
  const [imageError, setImageError] = useState(false);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(size, colors), [size, colors]);

  const getInitials = (fullName: string) => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const hasValidImage = Boolean(uri && !imageError);
  const tone = pickTone(name);

  return (
    <View style={styles.wrapper}>
      {hasValidImage ? (
        <Image
          source={{ uri }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[styles.image, styles.fallbackContainer, { backgroundColor: tone.bg }]}>
          <Text style={[styles.initialsText, { color: tone.fg }]}>{getInitials(name)}</Text>
        </View>
      )}

      {showOnlineDot && (
        <View
          style={[
            styles.onlineDot,
            isOnline ? styles.onlineDotOnline : styles.onlineDotOffline,
          ]}
        />
      )}

      {badge !== undefined && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;
