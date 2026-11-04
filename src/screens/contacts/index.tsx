// src/screens/contacts/index.tsx
import React, { useState } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import { Text } from '../../components/Typography';
import { useNavigation } from '@react-navigation/native';
import { ContactsScreenNavigationProp, ContactListItem } from './types';
import { createStyles } from './styles';
import { useChat } from '../../context/ChatContext';
import { Contact } from '../../types/chat';
import { useThemedStyles } from '../../context/ThemeContext';

// Components tái sử dụng
import { ScreenHeader } from '../../components/ScreenHeader';
import { SearchBar } from '../../components/SearchBar';
import { CardContact } from '../../components/CardContact';
import { EmptyState } from '../../components/EmptyState';

// Bỏ dấu + hạ chữ thường để tìm kiếm tiếng Việt dễ hơn
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();

export const ContactsScreen: React.FC = () => {
  const { styles } = useThemedStyles(createStyles);
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const { contacts } = useChat();
  const [searchText, setSearchText] = useState('');

  const filtered = contacts.filter((c) =>
    normalize(c.name).includes(normalize(searchText.trim()))
  );

  const onlineContacts = filtered.filter((c) => c.online);
  const offlineContacts = filtered.filter((c) => !c.online);

  const handleOpenChat = (contact: Contact) => {
    const params = {
      peer: { uid: contact.id, name: contact.name, avatar: contact.avatar },
    };
    const parent = navigation.getParent();
    if (parent) {
      (parent as any).navigate('Chat', params);
    } else {
      (navigation as any).navigate('Chat', params);
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
          <Text style={styles.groupHeaderText}>
            {item.online ? 'Đang online' : 'Ngoại tuyến'} · {item.count}
          </Text>
        </View>
      );
    }
    return <CardContact contact={item.data} onPress={handleOpenChat} />;
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Danh bạ"
        subtitle={`${contacts.length} người dùng đã đăng ký`}
      >
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm theo tên"
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
            subtitle="Chưa có người dùng nào khác hoặc thử tìm với tên khác"
          />
        }
      />
    </View>
  );
};

export default ContactsScreen;
