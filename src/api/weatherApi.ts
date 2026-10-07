import type { DailyWeather, HourlyWeather, WeatherData } from '../types/weather';
import { degreesToDirection, formatDayMonth, formatHour, formatWeekday, metersToKm } from '../utils/format';
import { getWeatherInfo } from '../utils/weatherCode';

export type WeatherApiErrorCode = 'NETWORK' | 'TIMEOUT' | 'HTTP' | 'PARSE';

export class WeatherApiError extends Error {
  readonly code: WeatherApiErrorCode;

  constructor(code: WeatherApiErrorCode, message: string) {
    super(message);
    this.name = 'WeatherApiError';
    this.code = code;
  }
}

interface OpenMeteoCurrent {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  weather_code: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  is_day: number;
}

interface OpenMeteoHourly {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  precipitation: number[];
  weather_code: number[];
  surface_pressure: number[];
  visibility: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  uv_index: number[];
  is_day: number[];
}

interface OpenMeteoDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  precipitation_sum: number[];
  uv_index_max: number[];
  wind_speed_10m_max: number[];
  wind_direction_10m_dominant: number[];
  sunrise: string[];
  sunset: string[];
  relative_humidity_2m_mean?: number[];
  surface_pressure_mean?: number[];
  visibility_mean?: number[];
}

export interface OpenMeteoResponse {
  current?: OpenMeteoCurrent;
  hourly?: OpenMeteoHourly;
  daily?: OpenMeteoDaily;
}

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
const TIMEOUT_MS = 10_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(item => typeof item === 'number');
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isHourly(value: unknown): value is OpenMeteoHourly {
  if (!isRecord(value)) return false;
  return (
    isStringArray(value.time) &&
    isNumberArray(value.temperature_2m) &&
    isNumberArray(value.apparent_temperature) &&
    isNumberArray(value.relative_humidity_2m) &&
    isNumberArray(value.precipitation_probability) &&
    isNumberArray(value.precipitation) &&
    isNumberArray(value.weather_code) &&
    isNumberArray(value.surface_pressure) &&
    isNumberArray(value.visibility) &&
    isNumberArray(value.wind_speed_10m) &&
    isNumberArray(value.wind_direction_10m) &&
    isNumberArray(value.uv_index) &&
    isNumberArray(value.is_day)
  );
}

function isDaily(value: unknown): value is OpenMeteoDaily {
  if (!isRecord(value)) return false;
  return (
    isStringArray(value.time) &&
    isNumberArray(value.weather_code) &&
    isNumberArray(value.temperature_2m_max) &&
    isNumberArray(value.temperature_2m_min) &&
    isNumberArray(value.precipitation_probability_max) &&
    isNumberArray(value.precipitation_sum) &&
    isNumberArray(value.uv_index_max) &&
    isNumberArray(value.wind_speed_10m_max) &&
    isNumberArray(value.wind_direction_10m_dominant) &&
    isStringArray(value.sunrise) &&
    isStringArray(value.sunset) &&
    (value.relative_humidity_2m_mean === undefined || isNumberArray(value.relative_humidity_2m_mean)) &&
    (value.surface_pressure_mean === undefined || isNumberArray(value.surface_pressure_mean)) &&
    (value.visibility_mean === undefined || isNumberArray(value.visibility_mean))
  );
}

function isCurrent(value: unknown): value is OpenMeteoCurrent {
  if (!isRecord(value)) return false;
  return (
    typeof value.time === 'string' &&
    typeof value.temperature_2m === 'number' &&
    typeof value.apparent_temperature === 'number' &&
    typeof value.relative_humidity_2m === 'number' &&
    typeof value.precipitation === 'number' &&
    typeof value.weather_code === 'number' &&
    typeof value.surface_pressure === 'number' &&
    typeof value.wind_speed_10m === 'number' &&
    typeof value.wind_direction_10m === 'number' &&
    typeof value.is_day === 'number'
  );
}

function validateResponse(raw: unknown): OpenMeteoResponse {
  if (!isRecord(raw) || !isCurrent(raw.current) || !isHourly(raw.hourly) || !isDaily(raw.daily)) {
    throw new WeatherApiError('PARSE', 'Dữ liệu thời tiết trả về không hợp lệ');
  }
  return { current: raw.current, hourly: raw.hourly, daily: raw.daily };
}

function valueAt(values: number[], index: number, fallback = 0): number {
  return values[index] ?? fallback;
}

function hourlyMeanForDate(values: number[], times: string[], date: string): number | undefined {
  const matching = values.filter((_, index) => times[index]?.startsWith(`${date}T`));
  if (matching.length === 0) return undefined;
  return matching.reduce((sum, value) => sum + value, 0) / matching.length;
}

export function mapOpenMeteoToWeatherData(raw: OpenMeteoResponse, city: string): WeatherData {
  if (!raw.current || !raw.hourly || !raw.daily) {
    throw new WeatherApiError('PARSE', 'Dữ liệu thời tiết trả về không hợp lệ');
  }
  const { current, hourly, daily } = raw;
  const currentIndex = Math.max(0, hourly.time.reduce((best, time, index) => {
    return Math.abs(Date.parse(`${time}:00Z`) - Date.parse(`${current.time}:00Z`)) <
      Math.abs(Date.parse(`${hourly.time[best]}:00Z`) - Date.parse(`${current.time}:00Z`))
      ? index
      : best;
  }, 0));
  const isDay = current.is_day === 1;
  const currentInfo = getWeatherInfo(current.weather_code, isDay);
  const currentWeather = {
    city,
    temperature: current.temperature_2m,
    condition: currentInfo.condition,
    icon: currentInfo.icon,
    high: daily.temperature_2m_max[0] ?? current.temperature_2m,
    low: daily.temperature_2m_min[0] ?? current.temperature_2m,
    humidity: current.relative_humidity_2m,
    windSpeed: `${current.wind_speed_10m} km/h`,
    uvIndex: valueAt(hourly.uv_index, currentIndex),
    feelsLike: current.apparent_temperature,
    windDirection: current.wind_direction_10m,
    windDirectionText: degreesToDirection(current.wind_direction_10m),
    pressure: current.surface_pressure,
    visibility: metersToKm(valueAt(hourly.visibility, currentIndex)),
    precipitation: current.precipitation,
    precipitationProbability: valueAt(hourly.precipitation_probability, currentIndex),
    isDay,
    weatherCode: current.weather_code,
  };

  const matchedIndex = hourly.time.findIndex(time => time >= current.time);
  const startIndex = matchedIndex < 0 ? 0 : matchedIndex;
  const hourlyWeather: HourlyWeather[] = hourly.time.slice(startIndex, startIndex + 24).map((time, offset) => {
    const index = startIndex + offset;
    const code = valueAt(hourly.weather_code, index);
    const info = getWeatherInfo(code, valueAt(hourly.is_day, index) === 1);
    const rainChanceValue = valueAt(hourly.precipitation_probability, index);
    return {
      time: offset === 0 ? 'Bây giờ' : formatHour(time),
      temp: valueAt(hourly.temperature_2m, index),
      icon: info.icon,
      condition: info.condition,
      rainChance: `${rainChanceValue}%`,
      isoTime: time,
      rainChanceValue,
      humidity: valueAt(hourly.relative_humidity_2m, index),
      windSpeedValue: valueAt(hourly.wind_speed_10m, index),
      windDirection: valueAt(hourly.wind_direction_10m, index),
      pressure: valueAt(hourly.surface_pressure, index),
      visibility: metersToKm(valueAt(hourly.visibility, index)),
      uvIndex: valueAt(hourly.uv_index, index),
      precipitation: valueAt(hourly.precipitation, index),
      feelsLike: valueAt(hourly.apparent_temperature, index),
      weatherCode: code,
      isDay: valueAt(hourly.is_day, index) === 1,
    };
  });

  const dailyWeather: DailyWeather[] = daily.time.slice(0, 7).map((date, index) => {
    const info = getWeatherInfo(valueAt(daily.weather_code, index), true);
    const high = valueAt(daily.temperature_2m_max, index);
    const low = valueAt(daily.temperature_2m_min, index);
    const rainChanceValue = valueAt(daily.precipitation_probability_max, index);
    return {
      day: formatWeekday(date, index),
      date: formatDayMonth(date),
      temp: Math.round((high + low) / 2),
      high,
      low,
      icon: info.icon,
      condition: info.condition,
      isoDate: date,
      rainChance: `${rainChanceValue}%`,
      rainChanceValue,
      uvIndexMax: valueAt(daily.uv_index_max, index),
      precipitationSum: valueAt(daily.precipitation_sum, index),
      windSpeedMax: valueAt(daily.wind_speed_10m_max, index),
      windDirectionDominant: valueAt(daily.wind_direction_10m_dominant, index),
      sunrise: daily.sunrise[index] ?? '',
      sunset: daily.sunset[index] ?? '',
      // Các giá trị trung bình được tính từ chuỗi hourly 7 ngày của Open-Meteo.
      humidityMean:
        daily.relative_humidity_2m_mean?.[index] ??
        hourlyMeanForDate(hourly.relative_humidity_2m, hourly.time, date),
      pressureMean:
        daily.surface_pressure_mean?.[index] ??
        hourlyMeanForDate(hourly.surface_pressure, hourly.time, date),
      visibilityMean: (() => {
        const meanMeters =
          daily.visibility_mean?.[index] ?? hourlyMeanForDate(hourly.visibility, hourly.time, date);
        return meanMeters === undefined ? undefined : metersToKm(meanMeters);
      })(),
      weatherCode: valueAt(daily.weather_code, index),
      isDay: true,
    };
  });

  return { current: currentWeather, hourly: hourlyWeather, daily: dailyWeather };
}

function makeUrl(latitude: number, longitude: number): string {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,is_day',
    hourly: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,weather_code,surface_pressure,visibility,wind_speed_10m,wind_direction_10m,uv_index,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,uv_index_max,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset,relative_humidity_2m_mean,surface_pressure_mean,visibility_mean',
    timezone: 'auto',
    forecast_days: '7',
    wind_speed_unit: 'kmh',
    temperature_unit: 'celsius',
  });
  return `${WEATHER_URL}?${params.toString()}`;
}

export async function fetchWeather(latitude: number, longitude: number, signal?: AbortSignal): Promise<WeatherData> {
  const controller = new AbortController();
  let timedOut = false;
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort);
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, TIMEOUT_MS);
  try {
    const response = await fetch(makeUrl(latitude, longitude), { signal: controller.signal });
    if (!response.ok) throw new WeatherApiError('HTTP', 'Máy chủ thời tiết đang gặp sự cố');
    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      throw new WeatherApiError('PARSE', 'Dữ liệu thời tiết trả về không hợp lệ');
    }
    return mapOpenMeteoToWeatherData(validateResponse(raw), '');
  } catch (error) {
    if (error instanceof WeatherApiError) throw error;
    if (timedOut) throw new WeatherApiError('TIMEOUT', 'Máy chủ phản hồi quá lâu');
    if (signal?.aborted) throw error;
    throw new WeatherApiError('NETWORK', 'Không có kết nối mạng');
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', onAbort);
  }
}
