// src/screens/chat/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatScreenProps } from './types';
import { createStyles } from './styles';
import { contacts, ChatMessage } from '../../data/mockData';
import { useChat, ME_ID } from '../../context/ChatContext';
import { useThemedStyles } from '../../context/ThemeContext';
import Avatar from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { EmptyState } from '../../components/EmptyState';

export const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const { conversation } = route.params;
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const { getMessages, sendMessage, markConversationRead } = useChat();
  const messages = getMessages(conversation.id);

  useEffect(() => {
    markConversationRead(conversation.id);
  }, [conversation.id, markConversationRead]);
  const [text, setText] = useState('');

  const isOnline = contacts.find((c) => c.id === conversation.user.id)?.online ?? false;
  const canSend = text.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    sendMessage(conversation, text.trim());
    setText('');
  };

  const renderItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const mine = item.sender === ME_ID;
    const prev = messages[index - 1];
    const showAvatar = !mine && prev?.sender !== item.sender;
    const isGroupStart = prev?.sender !== item.sender;

    return (
      <View
        style={[
          styles.messageRow,
          mine ? styles.messageRowMine : styles.messageRowOther,
          isGroupStart && styles.groupGap,
        ]}
      >
        {!mine && (
          <View style={styles.avatarSlot}>
            {showAvatar ? (
              <Avatar
                uri={conversation.user.avatar}
                name={conversation.user.name}
                size={30}
              />
            ) : null}
          </View>
        )}
        <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleOther]}>
          <Text style={[styles.messageText, mine && styles.messageTextMine]}>
            {item.text}
          </Text>
          <View style={styles.bubbleFooter}>
            <Text style={[styles.timeText, mine && styles.timeTextMine]}>{item.time}</Text>
            {mine && (
              <Icon name="checkCheck" size={13} color="rgba(255,255,255,0.85)" strokeWidth={2} />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
        >
          <Icon name="back" size={24} color={Colors.white} strokeWidth={2.4} />
        </TouchableOpacity>

        <Avatar
          uri={conversation.user.avatar}
          name={conversation.user.name}
          size={42}
          showOnlineDot
          isOnline={isOnline}
        />

        <View style={styles.headerInfo}>
          <Text style={styles.headerName} numberOfLines={1}>
            {conversation.user.name}
          </Text>
          <Text style={styles.headerStatus}>
            {isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}
          </Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Gọi thoại"
          >
            <Icon name="phone" size={20} color={Colors.white} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Gọi video"
          >
            <Icon name="video" size={20} color={Colors.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <EmptyState
              icon="smile"
              title={`Hãy chào ${conversation.user.name}!`}
              subtitle="Gửi tin nhắn đầu tiên để bắt đầu trò chuyện"
            />
          }
        />

        {/* Input Bar */}
        <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
          <TouchableOpacity
            style={styles.attachBtn}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Đính kèm tệp"
          >
            <Icon name="paperclip" size={20} color={Colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Nhập tin nhắn..."
              placeholderTextColor={Colors.textMuted}
              value={text}
              onChangeText={setText}
              multiline
              maxLength={1000}
            />
          </View>

          {canSend ? (
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={handleSend}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Gửi tin nhắn"
            >
              <Icon name="send" size={18} color={Colors.white} strokeWidth={2.4} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.attachBtn}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Ghi âm thoại"
            >
              <Icon name="mic" size={20} color={Colors.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
