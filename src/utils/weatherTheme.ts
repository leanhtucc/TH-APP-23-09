export type WeatherKind =
  | 'clear'
  | 'partly_cloudy'
  | 'cloudy'
  | 'fog'
  | 'rain'
  | 'thunder'
  | 'snow';

export interface WeatherTheme {
  kind: WeatherKind;
  isDay: boolean;
  background: string;
  backgroundSecondary: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  glass: string;
  statusBarStyle: 'light-content' | 'dark-content';
}

export function getWeatherKind(weatherCode: number): WeatherKind {
  if (weatherCode === 0) return 'clear';
  if (weatherCode === 1 || weatherCode === 2) return 'partly_cloudy';
  if (weatherCode === 3) return 'cloudy';
  if (weatherCode === 45 || weatherCode === 48) return 'fog';
  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) return 'rain';
  if ((weatherCode >= 71 && weatherCode <= 77) || weatherCode === 85 || weatherCode === 86) return 'snow';
  if (weatherCode >= 95 && weatherCode <= 99) return 'thunder';
  return 'clear';
}

type Palette = Pick<WeatherTheme, 'background' | 'backgroundSecondary' | 'card'>;

const PALETTES: Record<WeatherKind, { day: Palette; night: Palette; lightText?: boolean }> = {
  clear: {
    day: { background: '#1e40af', backgroundSecondary: '#1d4ed8', card: '#1e40af' },
    night: { background: '#0f172a', backgroundSecondary: '#1e3a8a', card: '#1e293b' },
  },
  partly_cloudy: {
    day: { background: '#334155', backgroundSecondary: '#475569', card: '#334155' },
    night: { background: '#172554', backgroundSecondary: '#334155', card: '#1e293b' },
  },
  cloudy: {
    day: { background: '#334155', backgroundSecondary: '#475569', card: '#334155' },
    night: { background: '#1e293b', backgroundSecondary: '#334155', card: '#0f172a' },
  },
  fog: {
    day: { background: '#a8a29e', backgroundSecondary: '#d6d3d1', card: '#c9c3be' },
    night: { background: '#44403c', backgroundSecondary: '#57534e', card: '#44403c' },
    lightText: true,
  },
  rain: {
    day: { background: '#334155', backgroundSecondary: '#475569', card: '#334155' },
    night: { background: '#0f172a', backgroundSecondary: '#1e293b', card: '#111827' },
  },
  thunder: {
    day: { background: '#312e81', backgroundSecondary: '#6d28d9', card: '#3730a3' },
    night: { background: '#1e1b4b', backgroundSecondary: '#4c1d95', card: '#312e81' },
  },
  snow: {
    day: { background: '#cbd5e1', backgroundSecondary: '#f1f5f9', card: '#e2e8f0' },
    night: { background: '#334155', backgroundSecondary: '#475569', card: '#334155' },
    lightText: true,
  },
};

export function getWeatherTheme(weatherCode: number, isDay: boolean): WeatherTheme {
  const kind = getWeatherKind(weatherCode);
  const palette = isDay ? PALETTES[kind].day : PALETTES[kind].night;
  const useDarkText = Boolean(PALETTES[kind].lightText) && isDay;
  return {
    kind,
    isDay,
    ...palette,
    textPrimary: useDarkText ? '#1f2937' : '#ffffff',
    textSecondary: useDarkText ? '#374151' : '#e2e8f0',
    glass: useDarkText ? 'rgba(255,255,255,0.48)' : 'rgba(255,255,255,0.18)',
    statusBarStyle: useDarkText ? 'dark-content' : 'light-content',
  };
}

export const DEFAULT_WEATHER_THEME = getWeatherTheme(0, true);
