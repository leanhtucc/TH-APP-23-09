// src/components/CardChat/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardChatProps } from './types';
import { createStyles } from './styles';
import Avatar from '../Avatar';
import { Icon } from '../Icon';
import { useThemedStyles } from '../../context/ThemeContext';

export const CardChat: React.FC<CardChatProps> = ({ conversation, onPress }) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const isUnread = conversation.unread > 0;

  return (
    <TouchableOpacity
      style={[styles.container, isUnread && styles.containerUnread]}
      activeOpacity={0.7}
      onPress={() => onPress(conversation)}
    >
      <View style={styles.avatarArea}>
        <Avatar
          uri={conversation.user.avatar}
          name={conversation.user.name}
          size={52}
          showOnlineDot
          isOnline={!!conversation.user.online}
        />
      </View>

      <View style={styles.infoArea}>
        <View style={styles.topRow}>
          <Text style={[styles.name, isUnread && styles.nameUnread]} numberOfLines={1}>
            {conversation.user.name}
          </Text>
          <Text style={[styles.time, isUnread && styles.timeUnread]}>
            {conversation.time}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          {!isUnread && (
            <View style={styles.checkIcon}>
              <Icon name="checkCheck" size={14} color={Colors.primary} strokeWidth={2} />
            </View>
          )}
          <Text
            style={[styles.lastMsg, isUnread && styles.lastMsgUnread]}
            numberOfLines={1}
          >
            {conversation.lastMessage || 'Bắt đầu cuộc trò chuyện'}
          </Text>
          {isUnread && (
            <View style={styles.unreadPill}>
              <Text style={styles.unreadPillText}>
                {conversation.unread > 99 ? '99+' : conversation.unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardChat;
