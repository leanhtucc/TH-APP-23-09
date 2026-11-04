import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { Notification, notifications as initNotifications } from '../data/mockData';
import { AppUser, Contact, Conversation, UserChatRecord } from '../types/chat';
import { useAuth } from './AuthContext';
import { subscribeUsers } from '../services/userService';
import { subscribeAllStatus } from '../services/presenceService';
import { markRead, subscribeUserChats } from '../services/chatService';
import { formatListTime } from '../utils/time';

interface ChatContextType {
  /** Người dùng đã đăng ký (không gồm bản thân) + trạng thái online */
  contacts: Contact[];
  /** Hội thoại đã có, mới nhất ở trên cùng */
  conversations: Conversation[];
  notifications: Notification[];
  totalUnread: number;
  unreadNotifications: number;
  isOnline: (uid: string) => boolean;
  markConversationRead: (peerUid: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [users, setUsers] = useState<AppUser[]>([]);
  const [statuses, setStatuses] = useState<Record<string, boolean>>({});
  const [records, setRecords] = useState<Record<string, UserChatRecord>>({});
  const [notifications, setNotifications] = useState<Notification[]>(initNotifications);

  // Mọi listener được hủy khi đăng xuất / unmount → không bị lặp
  useEffect(() => {
    if (!uid) {
      setUsers([]);
      setStatuses({});
      setRecords({});
      return;
    }
    const unsubs = [
      subscribeUsers(uid, setUsers),
      subscribeAllStatus(setStatuses),
      subscribeUserChats(uid, setRecords),
    ];
    return () => unsubs.forEach((u) => u());
  }, [uid]);

  const contacts = useMemo<Contact[]>(
    () =>
      users.map((u) => ({
        id: u.uid,
        name: u.name,
        avatar: u.avatar,
        online: !!statuses[u.uid],
      })),
    [users, statuses]
  );

  const conversations = useMemo<Conversation[]>(() => {
    const byId = new Map(users.map((u) => [u.uid, u]));
    const list: Conversation[] = [];
    Object.entries(records).forEach(([peerUid, rec]) => {
      const peer = byId.get(peerUid);
      if (!peer || !rec.lastTime) return;
      const last =
        rec.lastType === 'location'
          ? `${rec.lastSenderId === uid ? 'Bạn: ' : ''}📍 Vị trí`
          : `${rec.lastSenderId === uid ? 'Bạn: ' : ''}${rec.lastMessage ?? ''}`;
      list.push({
        id: peerUid,
        user: {
          id: peerUid,
          name: peer.name,
          avatar: peer.avatar,
          online: !!statuses[peerUid],
        },
        lastMessage: last,
        time: formatListTime(rec.lastTime),
        lastTime: rec.lastTime,
        unread: rec.unread ?? 0,
      });
    });
    return list.sort((a, b) => b.lastTime - a.lastTime);
  }, [records, users, statuses, uid]);

  const isOnline = useCallback((id: string) => !!statuses[id], [statuses]);

  const markConversationRead = useCallback(
    (peerUid: string) => {
      if (!uid) return;
      markRead(uid, peerUid).catch(() => {});
    },
    [uid]
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const value = useMemo<ChatContextType>(
    () => ({
      contacts,
      conversations,
      notifications,
      totalUnread: conversations.reduce((sum, c) => sum + c.unread, 0),
      unreadNotifications: notifications.filter((n) => !n.read).length,
      isOnline,
      markConversationRead,
      markNotificationRead,
      markAllNotificationsRead,
    }),
    [
      contacts,
      conversations,
      notifications,
      isOnline,
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
