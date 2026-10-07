import { mapOpenMeteoToWeatherData, type OpenMeteoResponse } from '../src/api/weatherApi';
import { degreesToDirection, formatHour, formatWeekday } from '../src/utils/format';
import { getWeatherInfo } from '../src/utils/weatherCode';

describe('tiện ích thời tiết', () => {
  it('ánh xạ mã thời tiết và trạng thái ngày đêm', () => {
    expect(getWeatherInfo(0, true)).toEqual({ icon: '☀️', condition: 'Quang đãng' });
    expect(getWeatherInfo(0, false).icon).toBe('🌙');
    expect(getWeatherInfo(999, true).condition).toBe('Không xác định');
  });

  it('đổi độ sang tám hướng', () => {
    expect(degreesToDirection(0)).toBe('Bắc');
    expect(degreesToDirection(45)).toBe('Đông Bắc');
    expect(degreesToDirection(360)).toBe('Bắc');
  });

  it('định dạng giờ và thứ mà không lệ thuộc múi giờ máy', () => {
    expect(formatHour('2026-10-07T09:30')).toBe('09:30');
    expect(formatWeekday('2026-10-07', 0)).toBe('Hôm nay');
    expect(formatWeekday('2026-10-07', 1)).toBe('Thứ 4');
  });

  it('map dữ liệu Open-Meteo về đúng shape giao diện', () => {
    const hourlyTimes = Array.from({ length: 30 }, (_, index) => {
      const hour = String(index).padStart(2, '0');
      return `2026-10-07T${hour}:00`;
    });
    const numbers = (value: number): number[] => Array.from({ length: 30 }, () => value);
    const dailyNumbers = (value: number): number[] => Array.from({ length: 7 }, () => value);
    const fixture: OpenMeteoResponse = {
      current: {
        time: '2026-10-07T05:00', temperature_2m: 28, apparent_temperature: 31,
        relative_humidity_2m: 70, precipitation: 0, weather_code: 1,
        surface_pressure: 1008, wind_speed_10m: 14, wind_direction_10m: 45, is_day: 1,
      },
      hourly: {
        time: hourlyTimes, temperature_2m: numbers(28), apparent_temperature: numbers(31),
        relative_humidity_2m: numbers(70), precipitation_probability: numbers(10),
        precipitation: numbers(0), weather_code: numbers(1), surface_pressure: numbers(1008),
        visibility: numbers(10000), wind_speed_10m: numbers(14), wind_direction_10m: numbers(45),
        uv_index: numbers(5), is_day: numbers(1),
      },
      daily: {
        time: Array.from({ length: 7 }, (_, index) => `2026-10-${String(index + 7).padStart(2, '0')}`),
        weather_code: dailyNumbers(2), temperature_2m_max: dailyNumbers(32),
        temperature_2m_min: dailyNumbers(24), precipitation_probability_max: dailyNumbers(20),
        precipitation_sum: dailyNumbers(1), uv_index_max: dailyNumbers(7),
        wind_speed_10m_max: dailyNumbers(20), wind_direction_10m_dominant: dailyNumbers(90),
        sunrise: Array.from({ length: 7 }, () => '2026-10-07T05:30'),
        sunset: Array.from({ length: 7 }, () => '2026-10-07T17:30'),
        relative_humidity_2m_mean: dailyNumbers(60),
        surface_pressure_mean: dailyNumbers(1015),
        visibility_mean: dailyNumbers(12345),
      },
    };
    const result = mapOpenMeteoToWeatherData(fixture, 'Hà Nội');
    expect(result.current.city).toBe('Hà Nội');
    expect(result.current.windDirectionText).toBe('Đông Bắc');
    expect(result.hourly).toHaveLength(24);
    expect(result.hourly[0]?.time).toBe('Bây giờ');
    expect(result.hourly[1]?.time).toBe('06:00');
    expect(result.hourly[0]?.weatherCode).toBe(1);
    expect(result.hourly[0]?.isDay).toBe(true);
    expect(result.daily).toHaveLength(7);
    expect(result.daily[0]?.day).toBe('Hôm nay');
    expect(result.daily[0]?.weatherCode).toBe(2);
    expect(result.daily[0]?.isDay).toBe(true);
    expect(result.daily[0]?.rainChance).toBe('20%');
    expect(result.daily[0]?.humidityMean).toBe(60);
    expect(result.daily[0]?.pressureMean).toBe(1015);
    expect(result.daily[0]?.visibilityMean).toBe(12.3);

    if (!fixture.daily) throw new Error('Fixture cần có dữ liệu daily');
    const fallbackResponse: OpenMeteoResponse = { ...fixture, daily: { ...fixture.daily } };
    delete fallbackResponse.daily?.relative_humidity_2m_mean;
    delete fallbackResponse.daily?.surface_pressure_mean;
    delete fallbackResponse.daily?.visibility_mean;
    const fallbackResult = mapOpenMeteoToWeatherData(fallbackResponse, 'Hà Nội');
    expect(fallbackResult.daily[0]?.humidityMean).toBe(70);
    expect(fallbackResult.daily[0]?.pressureMean).toBe(1008);
    expect(fallbackResult.daily[0]?.visibilityMean).toBe(10);
  });
});
