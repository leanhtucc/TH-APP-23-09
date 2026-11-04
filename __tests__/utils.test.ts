import { getChatId } from '../src/services/chatService';
import { mapAuthError } from '../src/services/authService';
import { formatClock, formatListTime, formatMessageTime } from '../src/utils/time';
import { isValidEmail, validateRegister } from '../src/utils/validation';
import { getMapsUrl } from '../src/services/locationService';

describe('getChatId', () => {
  it('đối xứng giữa hai người', () => {
    expect(getChatId('b', 'a')).toBe(getChatId('a', 'b'));
    expect(getChatId('a', 'b')).toBe('a_b');
  });
});

describe('mapAuthError', () => {
  it('map mã lỗi sang tiếng Việt', () => {
    expect(mapAuthError({ code: 'auth/invalid-credential' })).toBe('Sai email hoặc mật khẩu');
    expect(mapAuthError({ code: 'auth/email-already-in-use' })).toContain('đã được sử dụng');
    expect(mapAuthError({ code: 'auth/network-request-failed' })).toContain('mạng');
    expect(mapAuthError(new Error('x'))).toContain('lỗi');
  });
});

describe('time format', () => {
  const now = new Date(2026, 10, 4, 12, 0).getTime();
  it('hôm nay hiển thị giờ', () => {
    const t = new Date(2026, 10, 4, 9, 5).getTime();
    expect(formatClock(t)).toBe('09:05');
    expect(formatListTime(t, now)).toBe('09:05');
    expect(formatMessageTime(t, now)).toBe('09:05');
  });
  it('hôm qua / thứ / ngày', () => {
    expect(formatListTime(new Date(2026, 10, 3, 9, 0).getTime(), now)).toBe('Hôm qua');
    expect(formatListTime(new Date(2026, 10, 1, 9, 0).getTime(), now)).toBe('CN');
    expect(formatListTime(new Date(2026, 9, 1, 9, 0).getTime(), now)).toBe('01/10');
  });
});

describe('validation', () => {
  it('email', () => {
    expect(isValidEmail('a@test.com')).toBe(true);
    expect(isValidEmail('a@test')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
  it('đăng ký: mật khẩu ngắn và nhập lại không khớp', () => {
    const e = validateRegister({ name: 'An', email: 'a@test.com', password: '12345', confirm: '123456' });
    expect(e.password).toBeDefined();
    expect(e.confirm).toBeDefined();
    expect(e.name).toBeUndefined();
  });
  it('đăng ký hợp lệ', () => {
    expect(
      Object.keys(
        validateRegister({ name: 'An', email: 'a@test.com', password: '123456', confirm: '123456' })
      )
    ).toHaveLength(0);
  });
});

describe('maps url', () => {
  it('đúng toạ độ', () => {
    expect(getMapsUrl(21.0285, 105.8048)).toBe(
      'https://www.google.com/maps/search/?api=1&query=21.0285,105.8048'
    );
  });
});
