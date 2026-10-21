// src/screens/notifications/index.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NotificationsScreenProps } from './types';
import { createStyles } from './styles';
import { useChat } from '../../context/ChatContext';
import { useThemedStyles } from '../../context/ThemeContext';

// Component tái sử dụng
import { ScreenHeader } from '../../components/ScreenHeader';
import { CardNotification } from '../../components/CardNotification';
import { EmptyState } from '../../components/EmptyState';
import { Icon } from '../../components/Icon';

export const NotificationsScreen: React.FC<NotificationsScreenProps> = () => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const {
    notifications: notifList,
    unreadNotifications: unreadCount,
    markNotificationRead: handleMarkRead,
    markAllNotificationsRead: handleMarkAllRead,
  } = useChat();

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Thông báo"
        subtitle={unreadCount > 0 ? `${unreadCount} thông báo mới` : 'Đã đọc tất cả'}
        right={
          unreadCount > 0 ? (
            <TouchableOpacity
              style={styles.markAllBtn}
              onPress={handleMarkAllRead}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Đánh dấu đã đọc tất cả"
            >
              <Icon name="checkCheck" size={14} color={Colors.primary} strokeWidth={2.4} />
              <Text style={styles.markAllText}>Đọc tất cả</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <FlatList
        data={notifList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardNotification notification={item} onPress={handleMarkRead} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          unreadCount > 0 ? (
            <Text style={styles.hint}>Nhấn vào thông báo để đánh dấu đã đọc</Text>
          ) : undefined
        }
        ListEmptyComponent={
          <EmptyState
            icon="notifications"
            title="Không có thông báo nào"
            subtitle="Bạn sẽ nhận được thông báo khi có tin nhắn hoặc cập nhật mới"
          />
        }
      />
    </View>
  );
};

export default NotificationsScreen;
