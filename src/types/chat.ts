// Kiểu dữ liệu dùng chung cho Auth + Chat (khớp cấu trúc Realtime Database)

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  avatar?: string;
}

/** Người đối diện được truyền qua route Chat */
export interface Peer {
  uid: string;
  name: string;
  avatar?: string;
}

/** Danh bạ: người dùng + trạng thái online realtime */
export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
}

export type MessageType = 'text' | 'location';

export interface ChatMessage {
  id: string;
  sender: string;
  type: MessageType;
  text?: string;
  lat?: number;
  lng?: number;
  createdAt: number;
  /** Giờ hiển thị, vd "10:30" */
  time: string;
}

/** Nút trong node userChats/{uid}/{peerUid} */
export interface UserChatRecord {
  lastMessage?: string;
  lastType?: MessageType;
  lastTime?: number;
  lastSenderId?: string;
  unread?: number;
}

/** Một dòng ở màn Home */
export interface Conversation {
  /** uid của người đối diện */
  id: string;
  user: { id: string; name: string; avatar?: string; online?: boolean };
  lastMessage: string;
  /** Chuỗi thời gian hiển thị */
  time: string;
  lastTime: number;
  unread: number;
}
