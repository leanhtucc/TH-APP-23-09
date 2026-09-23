import mockWeatherData from './mockWeather.json';

export interface CurrentWeather {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: string;
  uvIndex: number;
  airQuality: string;
}

export interface HourlyWeather {
  time: string;
  temp: number;
  icon: string;
  condition: string;
  rainChance: string;
}

export interface DailyWeather {
  day: string;
  date: string;
  temp: number;
  high: number;
  low: number;
  icon: string;
  condition: string;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export const weatherData: WeatherData = mockWeatherData;
export default weatherData;
