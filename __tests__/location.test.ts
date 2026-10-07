import { mapAndroidPermissionResult, mapGeolocationError } from '../src/utils/location';

describe('logic quyền và lỗi vị trí', () => {
  it('phân biệt từ chối, chặn và cấp quyền Android', () => {
    expect(mapAndroidPermissionResult('granted')).toBe('granted');
    expect(mapAndroidPermissionResult('never_ask_again')).toBe('blocked');
    expect(mapAndroidPermissionResult('denied')).toBe('denied');
  });

  it('ánh xạ mã lỗi Geolocation', () => {
    expect(mapGeolocationError({ code: 1 })).toBe('denied');
    expect(mapGeolocationError({ code: 2 })).toBe('gps_off');
    expect(mapGeolocationError({ code: 3 })).toBe('error');
  });
});
