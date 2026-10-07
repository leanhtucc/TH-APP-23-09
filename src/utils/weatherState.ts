import type { WeatherData } from '../types/weather';

export function isWeatherEmpty(data: WeatherData | null): boolean {
  return data !== null && (data.hourly.length === 0 || data.daily.length === 0);
}

export interface TempBarMetrics {
  marginLeft: number;
  width: number;
}

export function computeTempBar(low: number, high: number, weekMin: number, weekMax: number): TempBarMetrics {
  const range = weekMax - weekMin;
  if (range <= 0) return { marginLeft: 0, width: 100 };
  return {
    marginLeft: ((low - weekMin) / range) * 100,
    width: ((high - low) / range) * 100,
  };
}
