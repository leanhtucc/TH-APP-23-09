import React, { useEffect, useLayoutEffect } from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MetricCard from '../../components/MetricCard';
import WeatherBackground from '../../components/WeatherBackground';
import UvBar from '../../components/metrics/UvBar';
import ProgressBar from '../../components/metrics/ProgressBar';
import WindCompass from '../../components/metrics/WindCompass';
import { degreesToDirection, formatHour } from '../../utils/format';
import { getPressureLabel, getVisibilityLabel, getWindLevel } from '../../utils/metrics';
import { formatTemp } from '../../utils/format';
import { getWeatherTheme } from '../../utils/weatherTheme';
import { useWeatherTheme } from '../../context/WeatherThemeContext';
import type { DetailScreenProps } from '../../types/navigation';
import styles from './style';

function numberText(value: number | undefined, digits = 0): string {
  return value === undefined || !Number.isFinite(value) ? '--' : value.toFixed(digits).replace(/\.0$/, '');
}

export default function DetailScreen({ route, navigation }: DetailScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const params = route.params;
  const isHourly = params.type === 'hour';
  const item = params.item;
  const theme = getWeatherTheme(item.weatherCode ?? 0, item.isDay ?? true);
  const { setTheme } = useWeatherTheme();
  const city = params.city;
  const timeLabel = params.type === 'hour'
    ? formatHour(params.item.isoTime ?? '') || params.item.time
    : `${params.item.day}, ${params.item.date}`;
  const title = `Chi tiết · ${timeLabel}`;
  const columns = width < 340 ? 1 : 2;
  const gap = 12;
  const horizontalPadding = 16;
  const cardWidth = columns === 1
    ? width - horizontalPadding * 2
    : (width - horizontalPadding * 2 - gap) / 2;

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerStyle: { backgroundColor: theme.card },
      headerTintColor: theme.textPrimary,
      headerTitleStyle: { color: theme.textPrimary, fontWeight: '700' },
    });
  }, [navigation, theme.card, theme.textPrimary, title]);

  useEffect(() => setTheme(theme), [setTheme, theme]);

  const temperature = params.type === 'hour'
    ? formatTemp(params.item.temp)
    : `${formatTemp(params.item.high)}° / ${formatTemp(params.item.low)}°`;
  const feelsLike = params.type === 'hour' ? params.item.feelsLike : undefined;
  const humidity = params.type === 'hour' ? params.item.humidity : params.item.humidityMean;
  const windSpeed = params.type === 'hour' ? params.item.windSpeedValue : params.item.windSpeedMax;
  const windDirection = params.type === 'hour' ? params.item.windDirection : params.item.windDirectionDominant;
  const uv = params.type === 'hour' ? params.item.uvIndex : params.item.uvIndexMax;
  const precipitation = params.type === 'hour' ? params.item.precipitation : params.item.precipitationSum;
  const rainChance = item.rainChanceValue;
  const pressure = params.type === 'hour' ? params.item.pressure : params.item.pressureMean;
  const visibility = params.type === 'hour' ? params.item.visibility : params.item.visibilityMean;
  const highLowDescription = params.type === 'hour'
    ? (feelsLike === undefined ? item.condition : `Cảm nhận ${formatTemp(feelsLike)}°`)
    : `Cao nhất ${formatTemp(params.item.high)}° · Thấp nhất ${formatTemp(params.item.low)}°`;

  return (
    <WeatherBackground theme={theme}>
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 20) }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: theme.card }]}>
          <Text style={styles.heroIcon}>{item.icon}</Text>
          <Text style={[styles.heroTemperature, { color: theme.textPrimary }]}>{temperature}{isHourly ? '°' : ''}</Text>
          <Text style={[styles.condition, { color: theme.textSecondary }]}>{item.condition}</Text>
          <Text style={[styles.city, { color: theme.textSecondary }]}>📍 {city}</Text>
          {isHourly ? <Text style={[styles.moment, { color: theme.textSecondary }]}>{timeLabel}</Text> : null}
          <Text style={[styles.heroDescription, { color: theme.textSecondary }]}>{highLowDescription}</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>CHỈ SỐ</Text>
        <View style={[styles.grid, { gap }, columns === 1 ? styles.gridSingleColumn : undefined]}>
          <MetricCard
            icon="🌡️"
            label="Nhiệt độ"
            value={temperature}
            unit={isHourly ? '°' : undefined}
            description={isHourly ? item.condition : 'Nhiệt độ cao nhất / thấp nhất'}
            theme={theme}
            style={{ width: cardWidth }}
          >
            {feelsLike !== undefined ? <Text style={[styles.metricNote, { color: theme.textSecondary }]}>Cảm nhận {formatTemp(feelsLike)}°</Text> : null}
          </MetricCard>

          <MetricCard icon="💧" label="Độ ẩm" value={numberText(humidity)} unit="%" theme={theme} style={{ width: cardWidth }}>
            {humidity !== undefined ? <ProgressBar value={humidity} color={theme.textPrimary} /> : null}
          </MetricCard>

          <MetricCard
            icon="🌬️"
            label="Tốc độ gió"
            value={numberText(windSpeed)}
            unit="km/h"
            description={windSpeed === undefined ? undefined : getWindLevel(windSpeed)}
            theme={theme}
            style={{ width: cardWidth }}
          >
            {windSpeed !== undefined ? <ProgressBar value={(windSpeed / 60) * 100} color={theme.textPrimary} /> : null}
          </MetricCard>

          <MetricCard
            icon="🧭"
            label="Hướng gió"
            value={windDirection === undefined ? '--' : degreesToDirection(windDirection)}
            description={windDirection === undefined ? undefined : `Gió thổi từ ${degreesToDirection(windDirection)} · ${numberText(windDirection)}°`}
            theme={theme}
            style={{ width: cardWidth }}
            childrenLayout={width < 340 ? 'stacked' : 'row'}
          >
            {windDirection !== undefined ? <WindCompass windDirection={windDirection} color={theme.textPrimary} /> : null}
          </MetricCard>

          <MetricCard icon="☀️" label="Chỉ số UV" value={uv === undefined ? '--' : String(Math.round(uv))} theme={theme} style={{ width: cardWidth }}>
            {uv !== undefined ? <UvBar value={uv} textColor={theme.textSecondary} /> : null}
          </MetricCard>

          <MetricCard
            icon="🌧️"
            label="Lượng mưa"
            value={numberText(precipitation, 1)}
            unit="mm"
            description={rainChance === undefined ? undefined : `Khả năng mưa ${numberText(rainChance)}%`}
            theme={theme}
            style={{ width: cardWidth }}
          >
            {rainChance !== undefined ? <ProgressBar value={rainChance} color={theme.textPrimary} /> : null}
          </MetricCard>

          <MetricCard
            icon="⏲️"
            label="Áp suất"
            value={numberText(pressure, 1)}
            unit="hPa"
            description={pressure === undefined ? undefined : getPressureLabel(pressure)}
            theme={theme}
            style={{ width: cardWidth }}
          />

          <MetricCard
            icon="👁️"
            label="Tầm nhìn"
            value={numberText(visibility, 1)}
            unit="km"
            description={visibility === undefined ? undefined : getVisibilityLabel(visibility)}
            theme={theme}
            style={{ width: cardWidth }}
          />
        </View>

        {params.type === 'day' ? (
          <View style={styles.sunBlock}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>MẶT TRỜI</Text>
            <View style={styles.sunRow}>
              <View style={styles.sunItem}>
                <Text style={[styles.sunLabel, { color: theme.textSecondary }]}>🌅 Bình minh</Text>
                <Text style={[styles.sunTime, { color: theme.textPrimary }]}>{formatHour(params.item.sunrise ?? '') || '--:--'}</Text>
              </View>
              <View style={styles.sunItem}>
                <Text style={[styles.sunLabel, { color: theme.textSecondary }]}>🌇 Hoàng hôn</Text>
                <Text style={[styles.sunTime, { color: theme.textPrimary }]}>{formatHour(params.item.sunset ?? '') || '--:--'}</Text>
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
    </WeatherBackground>
  );
}
