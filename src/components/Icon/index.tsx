import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconProps, IconBadgeProps } from './types';
import { iconMap } from './icons';
import { IconSize, Radius } from '../../theme';
import { useTheme } from '../../context/ThemeContext';

export const Icon: React.FC<IconProps> = ({
  name,
  size = IconSize.md,
  color,
  strokeWidth = 2,
  fill = 'none',
  style,
}) => {
  const { colors } = useTheme();
  const LucideComp = iconMap[name];
  if (!LucideComp) {
    return null;
  }

  return (
    <View style={style}>
      <LucideComp
        size={size}
        color={color ?? colors.textPrimary}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </View>
  );
};

export const IconBadge: React.FC<IconBadgeProps> = ({
  name,
  size = 40,
  iconSize = IconSize.md,
  iconColor,
  backgroundColor,
  borderRadius = Radius.md,
  strokeWidth = 2,
  fill = 'none',
  style,
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor: backgroundColor ?? colors.primaryLight,
        },
        style,
      ]}
    >
      <Icon
        name={name}
        size={iconSize}
        color={iconColor ?? colors.primary}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export * from './types';
export default Icon;
