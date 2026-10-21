// src/components/CardNotification/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardNotificationProps } from './types';
import { createStyles } from './styles';
import { Icon } from '../Icon';
import { useThemedStyles } from '../../context/ThemeContext';

export const CardNotification: React.FC<CardNotificationProps> = ({
  notification,
  onPress,
}) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const isUnread = !notification.read;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isUnread ? styles.containerUnread : styles.containerRead,
      ]}
      activeOpacity={0.7}
      onPress={() => onPress(notification.id)}
    >
      <View
        style={[
          styles.iconCircle,
          isUnread ? styles.iconCircleUnread : styles.iconCircleRead,
        ]}
      >
        <Icon
          name={isUnread ? 'notifications' : 'notificationsOff'}
          size={20}
          color={isUnread ? Colors.primary : Colors.textMuted}
          strokeWidth={2}
        />
      </View>

      <View style={styles.contentArea}>
        <Text
          style={[
            styles.contentText,
            isUnread ? styles.contentTextUnread : styles.contentTextRead,
          ]}
        >
          {notification.content}
        </Text>
        <Text style={styles.timeText}>{notification.time}</Text>
      </View>

      {isUnread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

export default CardNotification;
