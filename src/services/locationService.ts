import { Linking, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export type LocationErrorCode = 'denied' | 'blocked' | 'unavailable' | 'timeout';

export class LocationError extends Error {
  code: LocationErrorCode;
  constructor(code: LocationErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

export const locationErrorMessage = (e: unknown): string => {
  if (e instanceof LocationError) return e.message;
  return 'Không lấy được vị trí. Vui lòng thử lại';
};

const requestPermission = async (): Promise<void> => {
  if (Platform.OS !== 'android') {
    // iOS: Geolocation tự xin quyền khi gọi getCurrentPosition
    return;
  }
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
  if (result === PermissionsAndroid.RESULTS.GRANTED) return;
  if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    throw new LocationError(
      'blocked',
      'Bạn đã từ chối quyền vị trí. Hãy bật lại trong Cài đặt để gửi vị trí.'
    );
  }
  throw new LocationError('denied', 'Cần cấp quyền vị trí để gửi vị trí hiện tại.');
};

/** Xin quyền rồi lấy toạ độ hiện tại */
export const getCurrentLocation = async (): Promise<{ lat: number; lng: number }> => {
  await requestPermission();
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        // 1: PERMISSION_DENIED, 2: POSITION_UNAVAILABLE, 3: TIMEOUT
        if (err.code === 1) {
          reject(new LocationError('denied', 'Bạn đã từ chối quyền vị trí.'));
        } else if (err.code === 3) {
          reject(new LocationError('timeout', 'Lấy vị trí quá lâu. Vui lòng thử lại.'));
        } else {
          reject(
            new LocationError('unavailable', 'Không xác định được vị trí. Hãy bật GPS và thử lại.')
          );
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
  });
};

export const getMapsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export const openInMaps = (lat: number, lng: number) => Linking.openURL(getMapsUrl(lat, lng));

export const openAppSettings = () => Linking.openSettings();
