import React from 'react';
import { Text, View } from 'react-native';
import PressableScale from '../PressableScale';
import type { HourlyWeather } from '../../types/weather';
import { DEFAULT_WEATHER_THEME, type WeatherTheme } from '../../utils/weatherTheme';
import { formatTemp } from '../../utils/format';
import { styles } from './style';

interface Props {
  data: HourlyWeather;
  onPress?: () => void;
  theme?: WeatherTheme;
  cardWidth?: number;
}

export const ThoiTietTheoGio: React.FC<Props> = ({ data, onPress, theme = DEFAULT_WEATHER_THEME, cardWidth }) => {
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`Dự báo ${data.time}, ${data.temp} độ, khả năng mưa ${data.rainChance}`}
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.glass, width: cardWidth }]}
    >
      <Text maxFontSizeMultiplier={1.3} style={[styles.thoiGian, { color: theme.textPrimary }]}>{data.time}</Text>
      <Text style={styles.icon}>{data.icon}</Text>
      {data.rainChanceValue !== undefined && data.rainChanceValue > 0 ? (
        <Text maxFontSizeMultiplier={1.3} style={[styles.rainChance, { color: theme.textSecondary }]}>💧 {data.rainChance}</Text>
      ) : (
        <View style={styles.emptyRain} />
      )}
      <Text style={[styles.nhietDo, { color: theme.textPrimary }]}>{formatTemp(data.temp)}°</Text>
    </PressableScale>
  );
};

export default React.memo(ThoiTietTheoGio);
