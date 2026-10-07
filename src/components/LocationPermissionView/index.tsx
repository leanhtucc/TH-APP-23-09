import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import type { LocationStatus } from '../../utils/location';
import { DEFAULT_WEATHER_THEME, type WeatherTheme } from '../../utils/weatherTheme';
import styles from './style';

interface LocationPermissionViewProps {
  status: LocationStatus;
  errorMessage: string | null;
  onRetry: () => void;
  onOpenSettings: () => void;
  onUseDefault: () => void;
  theme?: WeatherTheme;
}

interface StatusContent {
  icon: string;
  message: string;
  primaryLabel: string;
  primaryAction: 'retry' | 'settings';
  showDefault: boolean;
}

const STATUS_CONTENT: Partial<Record<LocationStatus, StatusContent>> = {
  denied: {
    icon: '📍',
    message: 'Ứng dụng cần quyền vị trí để hiển thị thời tiết tại nơi bạn đang ở.',
    primaryLabel: 'Cấp quyền',
    primaryAction: 'retry',
    showDefault: true,
  },
  blocked: {
    icon: '⚙️',
    message: 'Quyền vị trí đã bị chặn. Hãy vào Cài đặt để cấp quyền.',
    primaryLabel: 'Mở Cài đặt',
    primaryAction: 'settings',
    showDefault: true,
  },
  gps_off: {
    icon: '🛰️',
    message: 'Hãy bật dịch vụ vị trí trên thiết bị rồi thử lại.',
    primaryLabel: 'Thử lại',
    primaryAction: 'retry',
    showDefault: true,
  },
  error: {
    icon: '⚠️',
    message: 'Không thể lấy vị trí lúc này.',
    primaryLabel: 'Thử lại',
    primaryAction: 'retry',
    showDefault: true,
  },
};

export default function LocationPermissionView({
  status,
  errorMessage,
  onRetry,
  onOpenSettings,
  onUseDefault,
  theme = DEFAULT_WEATHER_THEME,
}: LocationPermissionViewProps): React.JSX.Element | null {
  if (status === 'granted' || status === 'idle') return null;
  if (status === 'requesting') {
    return (
      <View style={[styles.container, { backgroundColor: theme.glass }]}>
        <ActivityIndicator color={theme.textPrimary} size="large" />
        <Text style={[styles.message, { color: theme.textPrimary }]}>Đang xác định vị trí của bạn...</Text>
      </View>
    );
  }
  const content = STATUS_CONTENT[status];
  if (!content) return null;
  const action = content.primaryAction === 'settings' ? onOpenSettings : onRetry;
  return (
    <View style={[styles.container, { backgroundColor: theme.glass }]}>
      <Text style={styles.icon}>{content.icon}</Text>
      <Text style={[styles.message, { color: theme.textPrimary }]}>{errorMessage ?? content.message}</Text>
      <TouchableOpacity accessibilityRole="button" onPress={action} style={[styles.primaryButton, { backgroundColor: theme.card }]}>
        <Text style={[styles.primaryButtonText, { color: theme.textPrimary }]}>{content.primaryLabel}</Text>
      </TouchableOpacity>
      {content.showDefault && (
        <TouchableOpacity accessibilityRole="button" onPress={onUseDefault} style={[styles.secondaryButton, { borderColor: theme.textPrimary }]}>
          <Text style={[styles.secondaryButtonText, { color: theme.textPrimary }]}>Dùng Hà Nội</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
