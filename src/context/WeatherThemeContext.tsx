import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_WEATHER_THEME, type WeatherTheme } from '../utils/weatherTheme';

interface WeatherThemeContextValue {
  theme: WeatherTheme;
  setTheme: (theme: WeatherTheme) => void;
}

const WeatherThemeContext = createContext<WeatherThemeContextValue | null>(null);

export function WeatherThemeProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [theme, setTheme] = useState(DEFAULT_WEATHER_THEME);
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <WeatherThemeContext.Provider value={value}>{children}</WeatherThemeContext.Provider>;
}

export function useWeatherTheme(): WeatherThemeContextValue {
  const context = useContext(WeatherThemeContext);
  if (!context) throw new Error('useWeatherTheme phải nằm trong WeatherThemeProvider');
  return context;
}
