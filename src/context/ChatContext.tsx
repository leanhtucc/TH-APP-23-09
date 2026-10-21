import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import {
  ChatMessage,
  Conversation,
  Notification,
  chatMessages as initMessages,
  conversations as initConversations,
  notifications as initNotifications,
} from '../data/mockData';

export const ME_ID = '0';

const formatNow = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

interface ChatContextType {
  conversations: Conversation[];
  notifications: Notification[];
  totalUnread: number;
  unreadNotifications: number;
  getMessages: (conversationId: string) => ChatMessage[];
  /** Gửi tin; tạo cuộc trò chuyện mới nếu chưa có. */
  sendMessage: (conversation: Conversation, text: string) => void;
  markConversationRead: (conversationId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(initConversations);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initMessages);
  const [notifications, setNotifications] = useState<Notification[]>(initNotifications);

  const getMessages = useCallback(
    (conversationId: string) => messages[conversationId] ?? [],
    [messages]
  );

  const sendMessage = useCallback((conversation: Conversation, text: string) => {
    const time = formatNow();
    const msg: ChatMessage = { id: String(Date.now()), text, sender: ME_ID, time };

    setMessages((prev) => ({
      ...prev,
      [conversation.id]: [...(prev[conversation.id] ?? []), msg],
    }));

    setConversations((prev) => {
      const exists = prev.some((c) => c.id === conversation.id);
      const updated: Conversation = {
        ...(prev.find((c) => c.id === conversation.id) ?? conversation),
        lastMessage: text,
        time,
        unread: 0,
      };
      // Đưa cuộc trò chuyện vừa nhắn lên đầu danh sách
      return exists
        ? [updated, ...prev.filter((c) => c.id !== conversation.id)]
        : [updated, ...prev];
    });
  }, []);

  const markConversationRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.some((c) => c.id === conversationId && c.unread > 0)
        ? prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
        : prev
    );
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const value = useMemo<ChatContextType>(
    () => ({
      conversations,
      notifications,
      totalUnread: conversations.reduce((sum, c) => sum + c.unread, 0),
      unreadNotifications: notifications.filter((n) => !n.read).length,
      getMessages,
      sendMessage,
      markConversationRead,
      markNotificationRead,
      markAllNotificationsRead,
    }),
    [
      conversations,
      notifications,
      getMessages,
      sendMessage,
      markConversationRead,
      markNotificationRead,
      markAllNotificationsRead,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return ctx;
};

export default ChatContext;
