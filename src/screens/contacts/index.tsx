// src/screens/contacts/index.tsx
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ContactsScreenNavigationProp, ContactListItem } from './types';
import { createStyles } from './styles';
import { useChat } from '../../context/ChatContext';
import { contacts, Contact, Conversation } from '../../data/mockData';
import { useThemedStyles } from '../../context/ThemeContext';

// Components tái sử dụng
import { ScreenHeader } from '../../components/ScreenHeader';
import { SearchBar } from '../../components/SearchBar';
import { CardContact } from '../../components/CardContact';
import { HeaderIconButton } from '../../components/HeaderIconButton';
import { EmptyState } from '../../components/EmptyState';

export const ContactsScreen: React.FC = () => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const { conversations } = useChat();
  const [searchText, setSearchText] = useState('');

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const onlineContacts = filtered.filter((c) => c.online);
  const offlineContacts = filtered.filter((c) => !c.online);

  const handleOpenChat = (contact: Contact) => {
    const existing = conversations.find((c) => c.user.id === contact.id);
    const target: Conversation = existing || {
      id: contact.id,
      user: { id: contact.id, name: contact.name, avatar: contact.avatar, online: contact.online },
      lastMessage: '',
      time: 'Mới',
      unread: 0,
    };
    const parent = navigation.getParent();
    if (parent) {
      (parent as any).navigate('Chat', { conversation: target });
    } else {
      (navigation as any).navigate('Chat', { conversation: target });
    }
  };

  const listData: ContactListItem[] = [];
  if (onlineContacts.length > 0) {
    listData.push({
      type: 'header',
      label: 'Đang hoạt động',
      count: onlineContacts.length,
      online: true,
    });
    onlineContacts.forEach((c) => listData.push({ type: 'contact', data: c }));
  }
  if (offlineContacts.length > 0) {
    listData.push({
      type: 'header',
      label: 'Ngoại tuyến',
      count: offlineContacts.length,
      online: false,
    });
    offlineContacts.forEach((c) => listData.push({ type: 'contact', data: c }));
  }

  const renderItem = ({ item }: { item: ContactListItem }) => {
    if (item.type === 'header') {
      return (
        <View style={styles.groupHeader}>
          <View
            style={[
              styles.groupDot,
              { backgroundColor: item.online ? Colors.success : Colors.textMuted },
            ]}
          />
          <Text style={styles.groupHeaderText}>{item.label}</Text>
          <View style={styles.groupBadge}>
            <Text style={styles.groupBadgeText}>{item.count}</Text>
          </View>
        </View>
      );
    }
    return <CardContact contact={item.data} onPress={handleOpenChat} />;
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Danh bạ"
        subtitle={`${filtered.length} bạn bè`}
        right={
          <HeaderIconButton
            icon="userPlus"
            iconColor={Colors.white}
            style={styles.headerAction}
            onPress={() => {}}
            accessibilityLabel="Thêm bạn bè mới"
          />
        }
      >
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm kiếm bạn bè..."
        />
      </ScreenHeader>

      <FlatList
        data={listData}
        keyExtractor={(item, idx) =>
          item.type === 'header' ? `header-${idx}` : item.data.id
        }
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="contacts"
            title="Không tìm thấy liên hệ"
            subtitle="Thử tìm kiếm với tên hoặc số điện thoại khác"
          />
        }
      />
    </View>
  );
};

export default ContactsScreen;
