import type { WeatherData } from '../types/weather';
import { reverseGeocode } from './geocodeApi';
import { fetchWeather } from './weatherApi';

export async function getWeatherByCoords(lat: number, lon: number, signal?: AbortSignal): Promise<WeatherData> {
  const [weather, city] = await Promise.all([
    fetchWeather(lat, lon, signal),
    reverseGeocode(lat, lon, signal),
  ]);
  return { ...weather, current: { ...weather.current, city } };
}
