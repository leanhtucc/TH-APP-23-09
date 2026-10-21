import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { HeaderIconButtonProps } from './types';
import { createStyles } from './styles';
import { Icon } from '../Icon';
import { useThemedStyles } from '../../context/ThemeContext';

export const HeaderIconButton: React.FC<HeaderIconButtonProps> = ({
  icon,
  onPress,
  size = 40,
  iconSize = 20,
  iconColor,
  badge,
  accessibilityLabel,
  style,
}) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Icon name={icon} size={iconSize} color={iconColor ?? Colors.textPrimary} strokeWidth={2} />
      {badge !== undefined && badge > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default HeaderIconButton;
