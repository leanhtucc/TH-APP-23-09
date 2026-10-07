import { PermissionsAndroid } from 'react-native';

export type LocationStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'blocked'
  | 'gps_off'
  | 'error';

export interface GeolocationErrorLike {
  code: number;
}

export function mapGeolocationError(error: GeolocationErrorLike): LocationStatus {
  if (error.code === 1) return 'denied';
  if (error.code === 2) return 'gps_off';
  return 'error';
}

export function mapAndroidPermissionResult(
  result: string,
): Extract<LocationStatus, 'granted' | 'denied' | 'blocked'> {
  if (result === PermissionsAndroid.RESULTS.GRANTED) return 'granted';
  if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) return 'blocked';
  return 'denied';
}

export function getLocationErrorMessage(status: LocationStatus): string {
  switch (status) {
    case 'denied':
      return 'Ứng dụng cần quyền vị trí để hiển thị thời tiết tại nơi bạn đang ở.';
    case 'blocked':
      return 'Quyền vị trí đã bị chặn. Hãy mở Cài đặt để cấp quyền.';
    case 'gps_off':
      return 'Không xác định được vị trí. Hãy bật dịch vụ vị trí trên thiết bị.';
    case 'error':
      return 'Không thể lấy vị trí lúc này. Vui lòng thử lại.';
    default:
      return '';
  }
}
