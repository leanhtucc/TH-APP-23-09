import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors, ThemeColors } from '../theme';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme_mode';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === 'dark' || saved === 'light') setMode(saved);
      })
      .catch(() => { });
  }, []);

  const setDarkMode = useCallback((value: boolean) => {
    const next: ThemeMode = value ? 'dark' : 'light';
    setMode(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => { });
  }, []);

  const value = useMemo<ThemeContextType>(
    () => ({
      mode,
      isDark: mode === 'dark',
      colors: mode === 'dark' ? darkColors : lightColors,
      setDarkMode,
    }),
    [mode, setDarkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};

/** Tạo StyleSheet theo theme hiện tại, chỉ tính lại khi đổi theme. */
export const useThemedStyles = <T,>(factory: (colors: ThemeColors) => T) => {
  const { colors } = useTheme();
  const styles = useMemo(() => factory(colors), [factory, colors]);
  return { styles, colors };
};

export default ThemeContext;
