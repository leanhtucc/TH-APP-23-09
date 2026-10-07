import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import type { CurrentWeather } from '../../types/weather';
import { useReduceMotion } from '../../hooks/useReduceMotion';
import { DEFAULT_WEATHER_THEME, type WeatherTheme } from '../../utils/weatherTheme';
import { styles } from './style';
import { formatTemp } from '../../utils/format';

interface Props {
  data: CurrentWeather;
  theme?: WeatherTheme;
  temperatureFontSize?: number;
  showCity?: boolean;
}

export const THoiTietHientai: React.FC<Props> = ({ data, theme = DEFAULT_WEATHER_THEME, temperatureFontSize = 54, showCity = true }) => {
  const bob = useRef(new Animated.Value(0)).current;
  const reduceMotion = useReduceMotion();
  useEffect(() => {
    if (reduceMotion) {
      bob.setValue(0);
      return undefined;
    }
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(bob, { toValue: 1, duration: 1250, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(bob, { toValue: 0, duration: 1250, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [bob, reduceMotion]);
  const iconOffset = bob.interpolate({ inputRange: [0, 1], outputRange: [4, -4] });
  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {/* Tên thành phố */}
      {showCity ? <Text maxFontSizeMultiplier={1.3} style={[styles.tenThanhPho, { color: theme.textPrimary }]}>📍 {data.city}</Text> : null}

      {/* Nhiệt độ lớn và icon */}
      <View style={styles.tempRow}>
        <Animated.Text style={[styles.weatherIcon, { transform: [{ translateY: iconOffset }] }]}>{data.icon}</Animated.Text>
        <Text style={[styles.nhietDo, { color: theme.textPrimary, fontSize: temperatureFontSize }]}>{formatTemp(data.temperature)}°</Text>
      </View>

      {/* Trạng thái thời tiết */}
      <Text style={[styles.trangThai, { color: theme.textSecondary }]}>{data.condition}</Text>

      {/* Nhiệt độ cao nhất / thấp nhất */}
      <Text maxFontSizeMultiplier={1.3} style={[styles.nhietDoPhamVi, { color: theme.textSecondary }]}>
        Cao nhất: {formatTemp(data.high)}° • Thấp nhất: {formatTemp(data.low)}°
      </Text>
      {data.feelsLike !== undefined ? (
        <Text maxFontSizeMultiplier={1.3} style={[styles.feelsLike, { color: theme.textSecondary }]}>Cảm nhận: {formatTemp(data.feelsLike)}°</Text>
      ) : null}

      {/* Thẻ thông số chi tiết */}
      <View style={[styles.detailsRow, { backgroundColor: theme.glass }]}>
        <View style={styles.detailItem}>
          <Text maxFontSizeMultiplier={1.3} style={[styles.detailLabel, { color: theme.textSecondary }]}>Độ ẩm</Text>
          <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{data.humidity}%</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Text maxFontSizeMultiplier={1.3} style={[styles.detailLabel, { color: theme.textSecondary }]}>Gió</Text>
          <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{data.windSpeed}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Text maxFontSizeMultiplier={1.3} style={[styles.detailLabel, { color: theme.textSecondary }]}>Chỉ số UV</Text>
          <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{data.uvIndex}</Text>
        </View>
      </View>
    </View>
  );
};
export default THoiTietHientai;
