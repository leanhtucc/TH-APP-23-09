// src/components/CardContact/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardContactProps } from './types';
import { createStyles } from './styles';
import Avatar from '../Avatar';
import { Icon } from '../Icon';
import { useThemedStyles } from '../../context/ThemeContext';

export const CardContact: React.FC<CardContactProps> = ({
  contact,
  onPress,
  onCall,
}) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress(contact)}
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
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={contact.online ? styles.statusOnline : styles.statusOffline}>
          {contact.online ? '● Đang hoạt động' : '● Ngoại tuyến'}
        </Text>
      </View>

      <View style={styles.actionsArea}>
        {onCall && (
          <TouchableOpacity
            style={[styles.actionButton, styles.callButton]}
            activeOpacity={0.7}
            onPress={() => onCall(contact)}
            accessibilityRole="button"
            accessibilityLabel={`Gọi cho ${contact.name}`}
          >
            <Icon name="phone" size={17} color={Colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={() => onPress(contact)}
          accessibilityRole="button"
          accessibilityLabel={`Nhắn tin cho ${contact.name}`}
        >
          <Icon name="messages" size={18} color={Colors.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CardContact;
