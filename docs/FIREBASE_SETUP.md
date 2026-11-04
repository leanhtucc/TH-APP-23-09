# Cài đặt Firebase cho Bài thực hành 5

1. https://console.firebase.google.com → **Add project**.
2. **Build → Authentication → Sign-in method → Email/Password → Enable**.
3. **Build → Realtime Database → Create database** (chế độ locked).
4. **Project settings → Your apps → Web (`</>`)** → copy `firebaseConfig` vào
   `src/services/firebaseConfig.ts` (bắt buộc có `databaseURL`).
5. Tab **Rules** → dán luật bảo mật giảng viên cung cấp (nếu chưa có, dùng bản nháp dưới) → **Publish**.

## Cấu trúc dữ liệu

```
users/{uid}                      { uid, name, email, createdAt }
status/{uid}                     { online, lastSeen }
chats/{chatId}/messages/{msgId}  { senderId, type: 'text'|'location', text?, lat?, lng?, createdAt }
userChats/{uid}/{peerUid}        { lastMessage, lastType, lastTime, lastSenderId, unread }
```
`chatId = [uidA, uidB].sort().join('_')`

## Rules nháp

```json
{ "rules": {
  "users": { ".read": "auth != null", "$uid": { ".write": "auth != null && auth.uid === $uid" } },
  "status": { ".read": "auth != null", "$uid": { ".write": "auth != null && auth.uid === $uid" } },
  "userChats": { "$uid": { ".read": "auth != null && auth.uid === $uid", "$peer": { ".write": "auth != null && (auth.uid === $uid || auth.uid === $peer)" } } },
  "chats": { "$chatId": { ".read": "auth != null && $chatId.contains(auth.uid)", ".write": "auth != null && $chatId.contains(auth.uid)" } }
} }
```

## Tài khoản test (đã tạo trên Firebase)

| Email | Mật khẩu | Tên |
|---|---|---|
| tester1@test.com | 123456 | Tester Mot |
| tester2@test.com | 123456 | Tester Hai |

Xoá trong Authentication + Realtime Database (node `users`, `status`, `userChats`, `chats`) trước khi nộp nếu muốn dữ liệu sạch.

## Chạy thử 2 thiết bị

```bash
npm start
npx react-native run-android --deviceId <id máy 1>
npx react-native run-android --deviceId <id máy 2>
```
Tạo 2–3 tài khoản (vd `a@test.com`, `b@test.com`, mật khẩu `123456`), đăng nhập mỗi máy một tài khoản.
Emulator: *Extended controls → Location* để đặt toạ độ khi thử gửi vị trí.
