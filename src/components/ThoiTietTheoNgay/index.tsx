import React from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import PressableScale from '../PressableScale';
import type { DailyWeather } from '../../types/weather';
import { DEFAULT_WEATHER_THEME, type WeatherTheme } from '../../utils/weatherTheme';
import { computeTempBar } from '../../utils/weatherState';
import { formatTemp } from '../../utils/format';
import { styles } from './style';

interface Props {
  data: DailyWeather;
  weekMin: number;
  weekMax: number;
  onPress?: () => void;
  theme?: WeatherTheme;
}

export const ThoiTietTheoNgay: React.FC<Props> = ({ data, weekMin, weekMax, onPress, theme = DEFAULT_WEATHER_THEME }) => {
  const { width } = useWindowDimensions();
  const tempBar = computeTempBar(data.low, data.high, weekMin, weekMax);
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`Dự báo ${data.day}, ${data.condition}, thấp ${data.low} độ, cao ${data.high} độ`}
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.glass }]}
      contentStyle={styles.rowContent}
    >
      {/* Ngày trong tuần */}
      <View style={styles.dayColumn}>
        <Text maxFontSizeMultiplier={1.2} numberOfLines={1} style={[styles.dayText, { color: theme.textPrimary }]}>{data.day}</Text>
        <Text maxFontSizeMultiplier={1.2} numberOfLines={1} style={[styles.dateText, { color: theme.textSecondary }]}>{data.date}</Text>
      </View>

      {/* Thời tiết & Icon */}
      <View style={styles.conditionColumn}>
        <Text style={styles.icon}>{data.icon}</Text>
        <Text maxFontSizeMultiplier={1.2} style={[styles.conditionText, { color: theme.textSecondary }]} numberOfLines={1}>
          {data.condition}
        </Text>
        {width >= 340 && data.rainChanceValue !== undefined && data.rainChanceValue > 0 ? (
          <Text maxFontSizeMultiplier={1.2} numberOfLines={1} style={[styles.rainChance, { color: theme.textSecondary }]}>💧 {data.rainChance}</Text>
        ) : null}
      </View>

      {/* Nhiệt độ thấp - cao */}
      <View style={styles.tempColumn}>
        <Text numberOfLines={1} style={[styles.lowTemp, { color: theme.textSecondary }]}>{formatTemp(data.low)}°</Text>
        <View style={styles.tempBarBackground}>
          <View style={[styles.tempBarActive, { left: `${tempBar.marginLeft}%`, width: `${tempBar.width}%` }]} />
        </View>
        <Text numberOfLines={1} style={[styles.highTemp, { color: theme.textPrimary }]}>{formatTemp(data.high)}°</Text>
      </View>
    </PressableScale>
  );
};



export default React.memo(ThoiTietTheoNgay);
