// src/data/mockData.ts — Chỉ còn dữ liệu mẫu của màn Thông báo (giữ như Bài 4).
// Người dùng, hội thoại và tin nhắn nay lấy từ Firebase (src/services).

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
