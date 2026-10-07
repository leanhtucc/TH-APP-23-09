# Thời tiết

Ứng dụng dự báo thời tiết đa màn hình xây bằng React Native CLI và TypeScript. Home hiển thị thời tiết hiện tại, dự báo theo giờ và theo ngày; Detail trình bày thông tin chi tiết của khung giờ hoặc ngày được chọn.

## Tính năng

| Yêu cầu | Đáp ứng trong app |
| --- | --- |
| Vị trí hiện tại và quyền thiết bị | `useLocation`, màn quyền vị trí, mở Cài đặt/thử lại và tọa độ dự phòng Hà Nội |
| Thời tiết hiện tại | Thẻ Home có nhiệt độ, cao/thấp, cảm nhận và các chỉ số thời tiết |
| Dự báo theo giờ/ngày | Danh sách 24 giờ và 7 ngày; chọn một thẻ để mở Detail |
| Chỉ số và phân loại | Thẻ độ ẩm, gió/la bàn, UV, áp suất, tầm nhìn và lượng mưa |
| Giao diện ngày/đêm và trạng thái | Theme theo mã thời tiết/ngày đêm, loading/error/empty, làm mới |
| Nhiều kích thước màn hình | Bố cục Home/Detail co giãn theo chiều rộng và hướng màn hình |

- **Vị trí và quyền truy cập:** xin quyền vị trí khi chạy; hỗ trợ thử lại, mở Cài đặt khi quyền bị chặn và dùng Hà Nội làm vị trí dự phòng (`21.0285, 105.8542`).
- **Thời tiết hiện tại:** nhiệt độ, cảm nhận, cao/thấp, độ ẩm, gió, UV, áp suất, tầm nhìn và lượng mưa.
- **Dự báo:** 24 giờ và 7 ngày, có biểu đồ dải nhiệt độ và khả năng mưa.
- **Chi tiết:** mở từ thẻ giờ/ngày; có các chỉ số, la bàn gió, thanh UV, thời gian bình minh/hoàng hôn.
- **Giao diện theo thời tiết:** màu nền ngày/đêm, trạng thái loading/error/empty, làm mới bằng nút hoặc kéo xuống.
- **Công cụ phát triển:** trong bản development, nhấn giữ tên thành phố 1,5 giây để chuyển lần lượt qua các theme xem trước. Công cụ được bảo vệ bằng `__DEV__` và không hoạt động trong release.

## Công nghệ và dịch vụ

- React Native CLI 0.87, React 19 và TypeScript strict.
- React Navigation native stack.
- Open-Meteo Forecast API lấy dữ liệu thời tiết.
- BigDataCloud reverse geocoding để suy ra tên thành phố từ tọa độ.
- `@react-native-community/geolocation` lấy vị trí thiết bị.
- Safe Area Context, Jest, React Native Testing Library và ESLint.

## Yêu cầu môi trường

- Node.js **22.11 trở lên** (theo `package.json`) và npm.
- JDK 17.
- Android Studio, Android SDK Platform 37, Build Tools 37.0.0 và NDK 27.1.12297006 (Gradle có thể cài các thành phần SDK còn thiếu nếu đã cấu hình SDK Manager).
- Android Emulator hoặc thiết bị Android có bật USB debugging.
- Emulator API 24 trở lên; target hiện tại là API 36.

## Cài đặt và chạy Android

Từ thư mục gốc dự án, cài dependencies:

```powershell
npm install
```

Mở terminal thứ nhất và chạy Metro:

```powershell
npx react-native start
```

Mở terminal thứ hai để cài và chạy bản development:

```powershell
npx react-native run-android
```

### Cấp quyền và chọn vị trí emulator

Khi ứng dụng yêu cầu, chọn quyền vị trí khi dùng ứng dụng. Để đặt vị trí giả lập trong Android Studio Emulator, mở **Extended controls → Location**, nhập Hà Nội `21.0285, 105.8542`, rồi chọn **Set location**. Nếu không cấp quyền, có thể chọn vị trí mặc định Hà Nội trong app.

## Build và chạy APK release

Trong PowerShell, từ thư mục gốc dự án:

```powershell
Set-Location .\android
.\gradlew.bat assembleRelease
Set-Location ..
```

APK được tạo tại:

```text
android\app\build\outputs\apk\release\app-release.apk
```

Cài APK lên emulator/thiết bị đang kết nối:

```powershell
adb install -r .\android\app\build\outputs\apk\release\app-release.apk
```

Mở bản release đã cài:

```powershell
adb shell am start -n com.lostandfound/.MainActivity
```

Nếu Gradle bị kẹt hoặc daemon gặp lỗi, dừng các daemon từ thư mục `android`:

```powershell
.\gradlew.bat --stop
```

> Release hiện ký bằng `android/app/debug.keystore` với debug signing config mặc định của template. Cách ký này đủ để nộp bài/cài thử, nhưng không phù hợp phát hành lên store hoặc phân phối production. Công cụ đổi theme chỉ chạy trong development; release không kèm hành vi đó.

## Cấu trúc và luồng dữ liệu

```text
src/
├── api/          # Open-Meteo, BigDataCloud và mapper dữ liệu
├── components/   # Thẻ thời tiết, trạng thái và chỉ số
├── constants/    # Vị trí mặc định
├── context/      # Theme thời tiết
├── hooks/        # useLocation, useWeather và hiệu ứng giao diện
├── screens/      # Home và Detail
├── types/        # Kiểu dữ liệu weather và navigation
└── utils/        # Format, theme, layout, chỉ số và trạng thái
__tests__/        # Unit test và smoke test
android/          # Cấu hình Android và Gradle
ios/              # Cấu hình iOS
docs/screenshots/ # Ảnh minh họa dự kiến
```

Luồng vị trí và thời tiết: `useLocation` lấy tọa độ → `useWeather` gọi `getWeatherByCoords` → API đồng thời lấy forecast và reverse geocoding → mapper chuyển response thành `WeatherData` → Home/Detail render qua các component.

## Trạng thái và theme xem trước

- **Loading:** xuất hiện khi xác định vị trí hoặc chờ API trả dữ liệu.
- **Error:** có thể kiểm tra bằng cách tắt mạng trước khi tải/làm mới; giao diện cung cấp thao tác thử lại.
- **Empty:** được hiển thị khi dữ liệu forecast thiếu danh sách giờ hoặc ngày. API thực tế thường trả đủ dữ liệu; có thể kiểm tra trạng thái này bằng fixture/mock trong test hoặc response rỗng trong môi trường development.
- **Theme:** ở development, nhấn giữ tên thành phố 1,5 giây. Mỗi lần giữ sẽ chuyển theme và hiện nhãn theme đang xem.

## Kiểm thử và chất lượng

```powershell
npx jest
npx tsc --noEmit
npx eslint .
```

Jest cấu hình mock `@react-native-community/geolocation` trong `jest.setup.js` và chuyển đổi các package React Navigation qua `transformIgnorePatterns`.

## Ảnh chụp màn hình và video

Lưu ảnh vào `docs/screenshots/` với các tên dự kiến:

- `home.png` — màn hình Home.
- `hourly-detail.png` — chi tiết dự báo theo giờ.
- `daily-detail.png` — chi tiết dự báo theo ngày.
- `location-permission.png` — yêu cầu quyền vị trí.
- `weather-themes.png` — các theme thời tiết/ngày đêm.

### Video demo

Liên kết video: *(bổ sung sau khi tải video lên)*.

## Hạn chế và hướng phát triển

- Cần kết nối Internet; hiện chưa có cache/offline forecast.
- Tên thành phố phụ thuộc dịch vụ reverse geocoding; khi lỗi sẽ dùng tên dự phòng.
- Release đang dùng debug keystore; trước khi phát hành cần tạo keystore riêng và cấu hình bí mật ký an toàn.
- Có thể bổ sung cache, kiểm tra chất lượng không khí và thiết lập nhiều địa điểm trong các phiên bản sau.
