import { WeatherApiError } from '../src/api/weatherApi';
import type { WeatherData } from '../src/types/weather';
import { getErrorMessage } from '../src/utils/errorMessage';
import { computeTempBar, isWeatherEmpty } from '../src/utils/weatherState';

const sampleWeather: WeatherData = {
  current: {
    city: 'Hà Nội', temperature: 28, condition: 'Ít mây', icon: '🌤️', high: 32,
    low: 24, humidity: 70, windSpeed: '14 km/h', uvIndex: 5,
  },
  hourly: [{ time: 'Bây giờ', temp: 28, icon: '🌤️', condition: 'Ít mây', rainChance: '0%' }],
  daily: [{ day: 'Hôm nay', date: '07/10', temp: 28, high: 32, low: 24, icon: '🌤️', condition: 'Ít mây' }],
};

describe('trạng thái dữ liệu thời tiết', () => {
  it('phát hiện dữ liệu thiếu dự báo theo giờ hoặc ngày', () => {
    expect(isWeatherEmpty(null)).toBe(false);
    expect(isWeatherEmpty(sampleWeather)).toBe(false);
    expect(isWeatherEmpty({ ...sampleWeather, hourly: [] })).toBe(true);
  });

  it('đổi lỗi API thành thông báo tiếng Việt', () => {
    expect(getErrorMessage(new WeatherApiError('NETWORK', ''))).toContain('kết nối mạng');
    expect(getErrorMessage(new WeatherApiError('TIMEOUT', ''))).toContain('quá lâu');
    expect(getErrorMessage(new Error('khác'))).toBe('Đã có lỗi xảy ra, vui lòng thử lại');
  });

  it('tính vị trí và độ rộng thanh theo khoảng nhiệt tuần', () => {
    expect(computeTempBar(20, 30, 10, 40)).toEqual({ marginLeft: 33.33333333333333, width: 33.33333333333333 });
    expect(computeTempBar(20, 30, 25, 25)).toEqual({ marginLeft: 0, width: 100 });
  });

  it('giữ thanh nhiệt độ theo tỷ lệ của dải tuần', () => {
    expect(computeTempBar(0, 40, 10, 30)).toEqual({ marginLeft: -50, width: 200 });
  });
});
