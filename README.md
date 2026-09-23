# Student Management App

Ứng dụng quản lý sinh viên – Bài thực hành 01 môn Phát triển ứng dụng với React Native.

## Mô tả

Ứng dụng React Native dựng giao diện Trang chủ quản lý sinh viên (Home Screen) với bố cục trực quan, tối ưu trải nghiệm người dùng, xử lý vùng an toàn hiển thị (Safe Area) cho camera cutout/notch và thanh điều hướng cử chỉ trên Android & iOS.

## Công nghệ sử dụng

- **React Native CLI** (v0.87.0)
- **TypeScript** (v6.0.3)
- **React Navigation** (@react-navigation/native-stack)
- **react-native-safe-area-context**
- **StyleSheet & Flexbox Layout**

## Chức năng giao diện

- **Header sinh viên**: Lời chào, họ tên, MSSV, avatar fallback và nút thông báo có chấm đỏ kèm phản hồi xúc giác.
- **Banner chào mừng**: Card thông điệp học tập sinh động.
- **Khu vực thống kê**: 3 thẻ số liệu (Tổng số môn: 4, Số bài tập: 12, Đã hoàn thành: 1) tính toán động từ mock data.
- **Ô tìm kiếm môn học**: Hỗ trợ tìm kiếm theo tên hoặc mô tả, hỗ trợ tiếng Việt không dấu, có nút xóa nhanh (Clear).
- **Danh sách môn học**: Tối thiểu 4 môn học kèm icon, số bài học, số bài tập, thanh tiến độ (Progress Bar) và phần trăm hoàn thành.
- **Trạng thái hoàn thành**: Tự động hiển thị badge "✓ Hoàn thành" và thanh tiến độ màu xanh lá khi đạt 100%.
- **Empty State**: Hiển thị thông báo thân thiện khi không tìm thấy môn học nào khớp với từ khóa tìm kiếm.
- **Bottom Navigation UI**: Thanh điều hướng 4 mục (Trang chủ, Môn học, Bài tập, Cá nhân) cố định ngoài ScrollView với hiệu ứng active indicator.

## Hướng dẫn cài đặt & Khởi chạy

### Cài đặt thư viện

```sh
npm install
```

### Chạy Metro Bundler

```sh
npm start
```

### Khởi chạy trên Android

```sh
npm run android
```

### Khởi chạy trên iOS

```sh
npx pod-install
npm run ios
```

## Cấu trúc source chính

```text
src/
├── app/                  # Cấu hình Navigation chính (AppNavigator)
├── components/student/   # Các UI Component quản lý sinh viên
│   ├── BottomTabBar.tsx
│   ├── SearchBar.tsx
│   ├── StatCard.tsx
│   ├── StudentHeader.tsx
│   ├── SubjectCard.tsx
│   ├── WelcomeBanner.tsx
│   └── index.ts
├── data/                 # Mock data & utility functions (studentData.ts)
├── screens/home/         # Màn hình Trang chủ (HomeScreen)
└── types/                # TypeScript interface & type definitions
```
