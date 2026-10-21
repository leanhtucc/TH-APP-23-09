// src/data/mockData.ts — Dữ liệu mẫu cho ứng dụng Chat

export const currentUser = {
  id: '0',
  name: 'Nguyễn Văn A',
  avatar: 'https://i.pravatar.cc/150?img=1',
  phone: '0901234567',
  email: 'nguyenvana@email.com',
  status: 'Đang hoạt động',
};

export type Conversation = {
  id: string;
  user: { id: string; name: string; avatar: string; online?: boolean };
  lastMessage: string;
  time: string;
  unread: number;
};

export const conversations: Conversation[] = [
  {
    id: '1',
    user: { id: '2', name: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?img=5', online: true },
    lastMessage: 'Oke bạn nhé, hẹn gặp lại!',
    time: '10:30',
    unread: 2,
  },
  {
    id: '2',
    user: { id: '3', name: 'Lê Văn C', avatar: 'https://i.pravatar.cc/150?img=8', online: false },
    lastMessage: 'Bạn đã xem tài liệu chưa?',
    time: '09:15',
    unread: 0,
  },
  {
    id: '3',
    user: { id: '4', name: 'Phạm Thị D', avatar: 'https://i.pravatar.cc/150?img=9', online: true },
    lastMessage: 'Hôm nay học môn gì vậy?',
    time: 'Hôm qua',
    unread: 5,
  },
  {
    id: '4',
    user: { id: '5', name: 'Hoàng Minh E', avatar: 'https://i.pravatar.cc/150?img=12', online: false },
    lastMessage: 'Ok rồi, cảm ơn bạn!',
    time: 'Hôm qua',
    unread: 0,
  },
  {
    id: '5',
    user: { id: '6', name: 'Ngô Thị F', avatar: 'https://i.pravatar.cc/150?img=20', online: true },
    lastMessage: 'Nhớ nộp bài trước 5h nhé',
    time: 'T2',
    unread: 1,
  },
];

export type Contact = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
};

export const contacts: Contact[] = [
  { id: '2', name: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?img=5', online: true },
  { id: '3', name: 'Lê Văn C', avatar: 'https://i.pravatar.cc/150?img=8', online: false },
  { id: '4', name: 'Phạm Thị D', avatar: 'https://i.pravatar.cc/150?img=9', online: true },
  { id: '5', name: 'Hoàng Minh E', avatar: 'https://i.pravatar.cc/150?img=12', online: false },
  { id: '6', name: 'Ngô Thị F', avatar: 'https://i.pravatar.cc/150?img=20', online: true },
  { id: '7', name: 'Đinh Văn G', avatar: 'https://i.pravatar.cc/150?img=15', online: false },
  { id: '8', name: 'Bùi Thị H', avatar: 'https://i.pravatar.cc/150?img=25', online: true },
];

export type ChatMessage = {
  id: string;
  text: string;
  sender: string;
  time: string;
};

export const chatMessages: Record<string, ChatMessage[]> = {
  '1': [
    { id: '1', text: 'Chào bạn!', sender: '2', time: '10:00' },
    { id: '2', text: 'Chào! Bạn khỏe không?', sender: '0', time: '10:01' },
    { id: '3', text: 'Mình khỏe, cảm ơn bạn!', sender: '2', time: '10:05' },
    { id: '4', text: 'Hôm nay bạn có rảnh không?', sender: '0', time: '10:20' },
    { id: '5', text: 'Oke bạn nhé, hẹn gặp lại!', sender: '2', time: '10:30' },
  ],
  '2': [
    { id: '1', text: 'Bạn đã xem tài liệu chưa?', sender: '3', time: '09:10' },
    { id: '2', text: 'Chưa, bạn gửi link cho mình với', sender: '0', time: '09:15' },
  ],
  '3': [
    { id: '1', text: 'Hôm nay học môn gì vậy?', sender: '4', time: 'Hôm qua' },
  ],
  '4': [
    { id: '1', text: 'Cảm ơn bạn nhiều nha!', sender: '0', time: 'Hôm qua' },
    { id: '2', text: 'Ok rồi, cảm ơn bạn!', sender: '5', time: 'Hôm qua' },
  ],
  '5': [
    { id: '1', text: 'Nhớ nộp bài trước 5h nhé', sender: '6', time: 'T2' },
  ],
};

export type Notification = {
  id: string;
  content: string;
  time: string;
  read: boolean;
};

export const notifications: Notification[] = [
  { id: '1', content: 'Trần Thị B đã gửi cho bạn một tin nhắn mới', time: '10:30', read: false },
  { id: '2', content: 'Phạm Thị D đã thêm bạn vào nhóm "Lớp CNTT"', time: '09:00', read: false },
  { id: '3', content: 'Lê Văn C đã gửi cho bạn một file', time: 'Hôm qua', read: true },
  { id: '4', content: 'Ngô Thị F nhắc bạn: Nhớ nộp bài trước 5h', time: 'Hôm qua', read: true },
  { id: '5', content: 'Hoàng Minh E đã thích tin nhắn của bạn', time: 'T2', read: true },
];
