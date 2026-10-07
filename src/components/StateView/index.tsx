import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { getErrorMessage } from '../../utils/errorMessage';
import styles from './style';
import { DEFAULT_WEATHER_THEME, type WeatherTheme } from '../../utils/weatherTheme';

export interface StateViewProps {
  type: 'loading' | 'error' | 'empty';
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  theme?: WeatherTheme;
}

export default function StateView({
  type,
  title,
  message,
  onRetry,
  retryLabel,
  theme = DEFAULT_WEATHER_THEME,
}: StateViewProps): React.JSX.Element {
  if (type === 'loading') {
    return (
      <View style={[styles.container, { backgroundColor: theme.glass }]}>
        <ActivityIndicator size="large" color={theme.textPrimary} />
        <Text style={[styles.message, { color: theme.textPrimary }]}>{message ?? 'Đang tải dữ liệu...'}</Text>
      </View>
    );
  }

  const isEmpty = type === 'empty';
  return (
    <View style={[styles.container, { backgroundColor: theme.glass }]}>
      <Text style={styles.icon}>{isEmpty ? '🌫️' : '⚠️'}</Text>
      <Text style={[styles.title, { color: theme.textPrimary }]}>{title ?? (isEmpty ? 'Không có dữ liệu dự báo' : 'Không tải được thời tiết')}</Text>
      {!isEmpty ? <Text style={[styles.message, { color: theme.textSecondary }]}>{message ?? getErrorMessage(null)}</Text> : null}
      {onRetry ? (
        <TouchableOpacity accessibilityRole="button" onPress={onRetry} style={[styles.retryButton, { backgroundColor: theme.card }]}>
          <Text style={[styles.retryText, { color: theme.textPrimary }]}>{retryLabel ?? (isEmpty ? 'Tải lại' : 'Thử lại')}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
