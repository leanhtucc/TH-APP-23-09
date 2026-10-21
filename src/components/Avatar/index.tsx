import React, { useMemo, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { AvatarProps } from './types';
import { createStyles } from './styles';
import { useTheme } from '../../context/ThemeContext';

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

  return (
    <View style={styles.wrapper}>
      {hasValidImage ? (
        <Image
          source={{ uri }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[styles.image, styles.fallbackContainer]}>
          <Text style={styles.initialsText}>{getInitials(name)}</Text>
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
