// src/screens/home/index.tsx
import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Text } from '../../components/Typography';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreenNavigationProp } from './types';
import { createStyles } from './styles';
import { Conversation, Contact } from '../../types/chat';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme, useThemedStyles } from '../../context/ThemeContext';

import { SearchBar } from '../../components/SearchBar';
import { CardChat } from '../../components/CardChat';
import { EmptyState } from '../../components/EmptyState';
import Avatar from '../../components/Avatar';

export const HomeScreen: React.FC = () => {
  const { styles } = useThemedStyles(createStyles);
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { conversations, contacts, totalUnread } = useChat();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [onlyUnread, setOnlyUnread] = useState(false);

  const keyword = searchText.trim().toLowerCase();
  const filtered = conversations.filter((c) => {
    const matches =
      c.user.name.toLowerCase().includes(keyword) ||
      c.lastMessage.toLowerCase().includes(keyword);
    return onlyUnread ? matches && c.unread > 0 : matches;
  });

  const onlineContacts = contacts.filter((c) => c.online);

  const openChat = (peer: { uid: string; name: string; avatar?: string }) => {
    const parent = navigation.getParent();
    const nav = (parent ?? navigation) as any;
    nav.navigate('Chat', { peer });
  };

  const handleOpenConversation = (conversation: Conversation) =>
    openChat({
      uid: conversation.user.id,
      name: conversation.user.name,
      avatar: conversation.user.avatar,
    });

  const handleOpenContact = (contact: Contact) =>
    openChat({ uid: contact.id, name: contact.name, avatar: contact.avatar });

  const header = (
    <View>
      <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
        <View>
          <Text style={styles.greeting}>Xin chào,</Text>
          <Text style={styles.userName} numberOfLines={1}>
            {user?.name ?? ''}
          </Text>
        </View>
        <Avatar name={user?.name} size={48} />
      </View>

      <View style={styles.searchWrap}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm cuộc trò chuyện"
        />
      </View>

      {onlineContacts.length > 0 && (
        <View style={styles.onlineSection}>
          <Text style={styles.sectionTitle}>Đang online</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.onlineRow}
          >
            {onlineContacts.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={styles.onlineItem}
                activeOpacity={0.7}
                onPress={() => handleOpenContact(c)}
                accessibilityRole="button"
                accessibilityLabel={`Nhắn tin cho ${c.name}`}
              >
                <View style={styles.onlineRing}>
                  <Avatar uri={c.avatar} name={c.name} size={52} showOnlineDot isOnline />
                </View>
                <Text style={styles.onlineName} numberOfLines={1}>
                  {c.name.split(' ').pop()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>Gần đây</Text>
        <TouchableOpacity
          style={[styles.unreadChip, onlyUnread && styles.unreadChipActive]}
          onPress={() => setOnlyUnread((v) => !v)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Lọc tin nhắn chưa đọc"
        >
          <Text style={[styles.unreadChipText, onlyUnread && styles.unreadChipTextActive]}>
            {totalUnread} chưa đọc
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardChat conversation={item} onPress={handleOpenConversation} />
        )}
        ListHeaderComponent={header}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <EmptyState
            icon="messages"
            title={
              conversations.length === 0
                ? 'Bắt đầu cuộc trò chuyện đầu tiên'
                : 'Không tìm thấy cuộc trò chuyện'
            }
            subtitle={
              conversations.length === 0
                ? 'Chọn một người trong Danh bạ để nhắn tin. Tin mới sẽ hiện ngay tại đây.'
                : onlyUnread
                ? 'Tuyệt vời! Bạn không có tin nhắn chưa đọc nào.'
                : 'Thử tìm kiếm với từ khóa khác'
            }
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
