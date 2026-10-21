// src/screens/home/index.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp, HomeFilterTab } from './types';
import { createStyles } from './styles';
import { Conversation } from '../../data/mockData';
import { useChat } from '../../context/ChatContext';
import { useThemedStyles } from '../../context/ThemeContext';

import { ScreenHeader } from '../../components/ScreenHeader';
import { SearchBar } from '../../components/SearchBar';
import { CardChat } from '../../components/CardChat';
import { HeaderIconButton } from '../../components/HeaderIconButton';
import { EmptyState } from '../../components/EmptyState';

export const HomeScreen: React.FC = () => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { conversations, totalUnread } = useChat();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<HomeFilterTab>('all');

  const filtered = conversations.filter((c) => {
    const matchesSearch = c.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchText.toLowerCase());
    if (activeFilter === 'unread') {
      return matchesSearch && c.unread > 0;
    }
    return matchesSearch;
  });

  const handleOpenChat = (conversation: Conversation) => {
    const parent = navigation.getParent();
    if (parent) {
      (parent as any).navigate('Chat', { conversation });
    } else {
      (navigation as any).navigate('Chat', { conversation });
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Tin nhắn"
        subtitle={
          totalUnread > 0 ? `${totalUnread} tin nhắn chưa đọc` : 'Bạn đã đọc hết tin nhắn'
        }
        right={
          <HeaderIconButton
            icon="compose"
            iconColor={Colors.white}
            style={styles.headerAction}
            onPress={() => {}}
            accessibilityLabel="Soạn tin nhắn mới"
          />
        }
      >
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm kiếm cuộc trò chuyện..."
        />
      </ScreenHeader>

      {/* Filter Chips */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'all' && styles.filterChipActive]}
          onPress={() => setActiveFilter('all')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'all' && styles.filterChipTextActive,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'unread' && styles.filterChipActive]}
          onPress={() => setActiveFilter('unread')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'unread' && styles.filterChipTextActive,
            ]}
          >
            Chưa đọc {totalUnread > 0 ? `(${totalUnread})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardChat conversation={item} onPress={handleOpenChat} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="messages"
            title="Không tìm thấy cuộc trò chuyện"
            subtitle={
              activeFilter === 'unread'
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
