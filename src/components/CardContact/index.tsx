// src/components/CardContact/index.tsx
import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { Text } from '../Typography';
import { CardContactProps } from './types';
import { createStyles } from './styles';
import Avatar from '../Avatar';
import { useThemedStyles } from '../../context/ThemeContext';

export const CardContact: React.FC<CardContactProps> = ({ contact, onPress }) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress(contact)}
      accessibilityRole="button"
      accessibilityLabel={`Nhắn tin cho ${contact.name}, ${contact.online ? 'đang online' : 'ngoại tuyến'}`}
    >
      <View style={styles.avatarArea}>
        <Avatar
          uri={contact.avatar}
          name={contact.name}
          size={50}
          showOnlineDot
          isOnline={contact.online}
        />
      </View>

      <View style={styles.infoArea}>
        <Text style={styles.name} numberOfLines={1}>
          {contact.name}
        </Text>
      </View>

      <View
        style={[styles.statusPill, contact.online ? styles.statusPillOn : styles.statusPillOff]}
      >
        <View
          style={[
            styles.statusDot,
            { backgroundColor: contact.online ? Colors.successDark : Colors.textSecondary },
          ]}
        />
        <Text
          style={[styles.statusText, contact.online ? styles.statusTextOn : styles.statusTextOff]}
        >
          {contact.online ? 'Online' : 'Offline'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardContact;
