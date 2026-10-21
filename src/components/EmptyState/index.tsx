import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EmptyStateProps } from './types';
import { createStyles } from './styles';
import { Icon } from '../Icon';
import { useThemedStyles } from '../../context/ThemeContext';

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'messages',
  title,
  subtitle,
  actionTitle,
  onAction,
  style,
}) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={36} color={Colors.primary} strokeWidth={1.75} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {actionTitle && onAction ? (
        <TouchableOpacity style={styles.actionButton} onPress={onAction} activeOpacity={0.8}>
          <Text style={styles.actionText}>{actionTitle}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export * from './types';
export default EmptyState;
