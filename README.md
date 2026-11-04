# Chat 1-1 Realtime với Firebase (RIPT1412-20261-02)

Ứng dụng chat React Native CLI (không dùng Expo): đăng ký/đăng nhập Firebase, danh bạ có trạng thái online,
chat 1-1 realtime, gửi vị trí, màn Home có số tin chưa đọc.

## Công nghệ
- React Native 0.87 (CLI) + TypeScript, React Navigation 7
- Firebase JS SDK: `firebase/auth` (Email/Password), `firebase/database` (Realtime Database)
- `@react-native-community/geolocation` (gửi vị trí)
- Font Plus Jakarta Sans (nhúng cho Android), icon `lucide-react-native`

## Cấu trúc chính
```
src/services/      Toàn bộ code Firebase + vị trí
  firebase.ts          khởi tạo app / auth (lưu phiên bằng AsyncStorage) / database
  authService.ts       đăng ký, đăng nhập, đăng xuất, dịch mã lỗi sang tiếng Việt
  presenceService.ts   online/offline realtime (onDisconnect + AppState)
  userService.ts       danh sách người dùng (không gồm bản thân)
  chatService.ts       gửi/nhận tin, đánh dấu đã đọc, danh sách hội thoại
  locationService.ts   xin quyền, lấy toạ độ, mở Google Maps
src/context/       AuthContext (phiên đăng nhập), ChatContext (danh bạ, hội thoại, số chưa đọc)
src/screens/       login, register, home, contacts, chat, notifications, settings
```
Màn Thông báo giữ như Bài 4 (dữ liệu mẫu).

## Cấu trúc dữ liệu (Realtime Database)
```
users/{uid}                      { uid, name, email, createdAt }
status/{uid}                     { online, lastSeen }
chats/{chatId}/messages/{msgId}  { senderId, type: 'text'|'location', text?, lat?, lng?, createdAt }
userChats/{uid}/{peerUid}        { lastMessage, lastType, lastTime, lastSenderId, unread }
```
`chatId = [uidA, uidB].sort().join('_')`. Gửi tin ghi nguyên tử (multi-path update) cả tin nhắn và
hội thoại của hai phía; `unread` của người nhận tăng bằng `increment(1)`.

## Cài đặt & chạy
1. `npm install`
2. Tạo project Firebase theo `docs/FIREBASE_SETUP.md` (bật Email/Password, Realtime Database, dán Rules),
   rồi điền cấu hình vào `src/services/firebaseConfig.ts`.
3. Chạy trên Android:
   ```bash
   npm start
   npx react-native run-android
   ```
   Hai thiết bị: `npx react-native run-android --device <id>` cho từng máy (`adb devices`).
   Emulator: *Extended controls → Location* để đặt toạ độ khi gửi vị trí.

> Font mới và quyền vị trí nằm trong bản build native, nên cần build lại (`run-android`) sau khi kéo code.

## Kiểm thử
```bash
npx tsc --noEmit
npm run lint
npm test
```
Test thủ công trên 2 máy ảo (đăng nhập hai tài khoản khác nhau): đăng ký/đăng nhập, lỗi sai mật khẩu,
online/offline realtime, gửi nhận tin tức thì, tin vị trí, từ chối quyền vị trí, badge chưa đọc tăng và về 0.
Tài khoản test: xem `docs/FIREBASE_SETUP.md`.

## Ảnh nộp bài
`submission/screens/`: Đăng nhập, Đăng ký, Home có số chưa đọc, Danh bạ có trạng thái online,
Chat có tin thường và tin vị trí, Cài đặt.
