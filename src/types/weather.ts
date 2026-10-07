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
  airQuality?: string;
  feelsLike?: number;
  windDirection?: number;
  windDirectionText?: string;
  pressure?: number;
  visibility?: number;
  precipitation?: number;
  precipitationProbability?: number;
  isDay?: boolean;
  weatherCode?: number;
}

export interface HourlyWeather {
  time: string;
  temp: number;
  icon: string;
  condition: string;
  rainChance: string;
  isoTime?: string;
  rainChanceValue?: number;
  humidity?: number;
  windSpeedValue?: number;
  windDirection?: number;
  pressure?: number;
  visibility?: number;
  uvIndex?: number;
  precipitation?: number;
  feelsLike?: number;
  weatherCode?: number;
  isDay?: boolean;
}

export interface DailyWeather {
  day: string;
  date: string;
  temp: number;
  high: number;
  low: number;
  icon: string;
  condition: string;
  isoDate?: string;
  rainChance?: string;
  rainChanceValue?: number;
  uvIndexMax?: number;
  precipitationSum?: number;
  windSpeedMax?: number;
  windDirectionDominant?: number;
  sunrise?: string;
  sunset?: string;
  humidityMean?: number;
  pressureMean?: number;
  visibilityMean?: number;
  weatherCode?: number;
  isDay?: boolean;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}
