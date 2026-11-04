import {
  get,
  increment,
  onValue,
  orderByKey,
  push,
  query,
  ref,
  serverTimestamp,
  update,
} from 'firebase/database';
import { db } from './firebase';
import { ChatMessage, UserChatRecord } from '../types/chat';
import { formatMessageTime } from '../utils/time';

/** chatId đối xứng: cùng một id cho cả hai phía */
export const getChatId = (a: string, b: string) => [a, b].sort().join('_');

/** Lắng nghe toàn bộ tin nhắn (sắp theo thứ tự gửi). Trả về hàm hủy lắng nghe. */
export const subscribeMessages = (
  chatId: string,
  cb: (messages: ChatMessage[]) => void
): (() => void) =>
  onValue(query(ref(db, `chats/${chatId}/messages`), orderByKey()), (snap) => {
    const list: ChatMessage[] = [];
    snap.forEach((child) => {
      const v = child.val();
      if (!v) return;
      const createdAt = typeof v.createdAt === 'number' ? v.createdAt : Date.now();
      list.push({
        id: child.key as string,
        sender: v.senderId,
        type: v.type === 'location' ? 'location' : 'text',
        text: v.text,
        lat: v.lat,
        lng: v.lng,
        createdAt,
        time: formatMessageTime(createdAt),
      });
    });
    cb(list);
  });

interface SendPayload {
  type: 'text' | 'location';
  text?: string;
  lat?: number;
  lng?: number;
}

const send = async (myUid: string, peerUid: string, payload: SendPayload) => {
  const chatId = getChatId(myUid, peerUid);
  const key = push(ref(db, `chats/${chatId}/messages`)).key as string;
  const preview = payload.type === 'location' ? 'Vị trí' : (payload.text as string);

  const message: Record<string, unknown> = {
    senderId: myUid,
    type: payload.type,
    createdAt: serverTimestamp(),
  };
  if (payload.type === 'text') message.text = payload.text;
  else {
    message.lat = payload.lat;
    message.lng = payload.lng;
  }

  const meta = (unread: unknown) => ({
    lastMessage: preview,
    lastType: payload.type,
    lastTime: serverTimestamp(),
    lastSenderId: myUid,
    unread,
  });

  // Ghi nguyên tử: tin nhắn + hội thoại của hai phía
  await update(ref(db), {
    [`chats/${chatId}/messages/${key}`]: message,
    [`userChats/${myUid}/${peerUid}`]: meta(0),
    [`userChats/${peerUid}/${myUid}`]: meta(increment(1)),
  });
};

export const sendTextMessage = (myUid: string, peerUid: string, text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return Promise.resolve();
  return send(myUid, peerUid, { type: 'text', text: trimmed });
};

export const sendLocationMessage = (
  myUid: string,
  peerUid: string,
  lat: number,
  lng: number
) => send(myUid, peerUid, { type: 'location', lat, lng });

/** Đặt unread = 0 (chỉ ghi khi đang > 0 để không tạo node rỗng) */
export const markRead = async (myUid: string, peerUid: string) => {
  const unreadRef = ref(db, `userChats/${myUid}/${peerUid}/unread`);
  const snap = await get(unreadRef);
  if ((snap.val() ?? 0) > 0) {
    await update(ref(db, `userChats/${myUid}/${peerUid}`), { unread: 0 });
  }
};

/** Danh sách hội thoại của mình: { peerUid: record } */
export const subscribeUserChats = (
  myUid: string,
  cb: (records: Record<string, UserChatRecord>) => void
): (() => void) =>
  onValue(ref(db, `userChats/${myUid}`), (snap) => {
    const map: Record<string, UserChatRecord> = {};
    snap.forEach((child) => {
      map[child.key as string] = child.val() ?? {};
    });
    cb(map);
  });
