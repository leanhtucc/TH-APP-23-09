// src/screens/chat/index.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Text, TextInput } from '../../components/Typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatScreenProps } from './types';
import { createStyles } from './styles';
import { ChatMessage } from '../../types/chat';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme, useThemedStyles } from '../../context/ThemeContext';
import Avatar from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { EmptyState } from '../../components/EmptyState';
import {
  getChatId,
  sendLocationMessage,
  sendTextMessage,
  subscribeMessages,
} from '../../services/chatService';
import {
  LocationError,
  getCurrentLocation,
  locationErrorMessage,
  openAppSettings,
  openInMaps,
} from '../../services/locationService';

export const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const { isDark } = useTheme();
  const { peer } = route.params;
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const { user } = useAuth();
  const { isOnline, markConversationRead } = useChat();
  const myUid = user?.uid ?? '';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [locating, setLocating] = useState(false);

  // Lắng nghe realtime; HỦY lắng nghe khi rời màn hình / đổi người chat
  useEffect(() => {
    if (!myUid) return;
    setMessages([]);
    const unsubscribe = subscribeMessages(getChatId(myUid, peer.uid), setMessages);
    return unsubscribe;
  }, [myUid, peer.uid]);

  // Đang mở cuộc trò chuyện → số chưa đọc về 0 (cả khi có tin mới đến)
  const lastSender = messages[messages.length - 1]?.sender;
  useEffect(() => {
    markConversationRead(peer.uid);
  }, [peer.uid, messages.length, lastSender, markConversationRead]);

  const online = isOnline(peer.uid);
  const canSend = text.trim().length > 0;

  const handleSend = () => {
    const value = text.trim();
    if (!value) return; // không cho gửi tin rỗng
    setText('');
    sendTextMessage(myUid, peer.uid, value).catch(() => {
      setText(value);
      Alert.alert('Không gửi được', 'Kiểm tra kết nối mạng rồi thử lại.');
    });
  };

  const handleSendLocation = useCallback(async () => {
    if (locating) return;
    setLocating(true);
    try {
      const { lat, lng } = await getCurrentLocation();
      await sendLocationMessage(myUid, peer.uid, lat, lng);
    } catch (e) {
      const blocked = e instanceof LocationError && e.code === 'blocked';
      Alert.alert(
        'Không gửi được vị trí',
        locationErrorMessage(e),
        blocked
          ? [
              { text: 'Để sau', style: 'cancel' },
              { text: 'Mở Cài đặt', onPress: () => openAppSettings() },
            ]
          : [{ text: 'Đã hiểu' }]
      );
    } finally {
      setLocating(false);
    }
  }, [locating, myUid, peer.uid]);

  const renderItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const mine = item.sender === myUid;
    const prev = messages[index - 1];
    const showAvatar = !mine && prev?.sender !== item.sender;
    const isGroupStart = prev?.sender !== item.sender;
    const isLocation = item.type === 'location' && item.lat != null && item.lng != null;

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
            {showAvatar ? <Avatar uri={peer.avatar} name={peer.name} size={30} /> : null}
          </View>
        )}
        <TouchableOpacity
          activeOpacity={isLocation ? 0.7 : 1}
          disabled={!isLocation}
          onPress={() => isLocation && openInMaps(item.lat as number, item.lng as number)}
          accessibilityRole={isLocation ? 'link' : undefined}
          accessibilityLabel={isLocation ? 'Mở vị trí trong Google Maps' : undefined}
          style={[
            styles.bubble,
            mine ? styles.bubbleMine : styles.bubbleOther,
            isLocation && styles.bubbleLocation,
          ]}
        >
          {isLocation ? (
            <View>
              <View style={styles.locationMap}>
                <View style={[styles.mapRoad, styles.mapRoadA]} />
                <View style={[styles.mapRoad, styles.mapRoadB]} />
                <View style={[styles.mapBlock, styles.mapBlockA]} />
                <View style={[styles.mapBlock, styles.mapBlockB]} />
                <Icon name="mapPin" size={34} color={Colors.danger} strokeWidth={2.2} />
              </View>
              <View style={styles.locationBody}>
                <Text style={styles.locationTitle}>
                  Vị trí của {mine ? 'tôi' : peer.name}
                </Text>
                <Text style={styles.locationCoords}>
                  {(item.lat as number).toFixed(5)}, {(item.lng as number).toFixed(5)}
                </Text>
                <View style={styles.locationFooter}>
                  <Text style={styles.locationHint}>Mở Google Maps</Text>
                  <Text style={styles.locationTime}>{item.time}</Text>
                </View>
              </View>
            </View>
          ) : (
            <>
              <Text style={[styles.messageText, mine && styles.messageTextMine]}>
                {item.text}
              </Text>
              <View style={styles.bubbleFooter}>
                <Text style={[styles.timeText, mine && styles.timeTextMine]}>{item.time}</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header: tên + trạng thái online của người đang chat */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
        >
          <Icon name="back" size={22} color={Colors.textPrimary} strokeWidth={2.4} />
        </TouchableOpacity>

        <Avatar
          uri={peer.avatar}
          name={peer.name}
          size={42}
          showOnlineDot
          isOnline={online}
        />

        <View style={styles.headerInfo}>
          <Text style={styles.headerName} numberOfLines={1}>
            {peer.name}
          </Text>
          <Text style={[styles.headerStatus, online && styles.headerStatusOnline]}>
            {online ? 'Đang hoạt động' : 'Ngoại tuyến'}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior="padding">
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
              title={`Hãy chào ${peer.name}!`}
              subtitle="Gửi tin nhắn đầu tiên để bắt đầu trò chuyện"
            />
          }
        />

        {/* Input Bar */}
        <View style={[styles.inputBar, { marginBottom: Math.max(insets.bottom, 12) }]}>
          <TouchableOpacity
            style={styles.attachBtn}
            onPress={handleSendLocation}
            disabled={locating}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Gửi vị trí hiện tại"
          >
            {locating ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Icon name="mapPin" size={22} color={Colors.primaryDark} strokeWidth={2.2} />
            )}
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

          <TouchableOpacity
            style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!canSend}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Gửi tin nhắn"
            accessibilityState={{ disabled: !canSend }}
          >
            <Icon
              name="send"
              size={18}
              color={canSend ? Colors.white : Colors.textMuted}
              strokeWidth={2.4}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
