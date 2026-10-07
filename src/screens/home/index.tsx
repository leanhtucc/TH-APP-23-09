import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Animated, RefreshControl, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LocationPermissionView from '../../components/LocationPermissionView';
import MetricCard from '../../components/MetricCard';
import StateView from '../../components/StateView';
import THoiTietHientai from '../../components/THoiTietHientai';
import ThoiTietTheoGio from '../../components/ThoiTietTheoGio';
import ThoiTietTheoNgay from '../../components/ThoiTietTheoNgay';
import WeatherBackground from '../../components/WeatherBackground';
import ProgressBar from '../../components/metrics/ProgressBar';
import UvBar from '../../components/metrics/UvBar';
import WindCompass from '../../components/metrics/WindCompass';
import { DEFAULT_LOCATION } from '../../constants/location';
import { useLocation } from '../../hooks/useLocation';
import { useWeather } from '../../hooks/useWeather';
import { useStaggeredEntrance } from '../../hooks/useStaggeredEntrance';
import { useWeatherTheme } from '../../context/WeatherThemeContext';
import { getErrorMessage } from '../../utils/errorMessage';
import { isWeatherEmpty } from '../../utils/weatherState';
import { getPressureLabel, getVisibilityLabel, getWindLevel } from '../../utils/metrics';
import { getLayoutInfo } from '../../utils/layout';
import { DEFAULT_WEATHER_THEME, getWeatherTheme } from '../../utils/weatherTheme';
import type { HomeScreenProps } from '../../types/navigation';
import { styles } from './style';

const DEBUG_THEME_PAIRS: ReadonlyArray<readonly [number, boolean]> = [
  [0, true], [2, true], [3, true], [45, true], [61, true], [71, true], [95, true], [0, false], [61, false],
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const layout = getLayoutInfo(width, height);
  const { setTheme } = useWeatherTheme();
  const location = useLocation();
  const [useDefault, setUseDefault] = useState(false);
  const [debugThemeIndex, setDebugThemeIndex] = useState<number | null>(null);
  const canUseLocation = location.status !== 'idle' && location.status !== 'requesting';

  useEffect(() => {
    if (location.status === 'granted') setUseDefault(false);
  }, [location.status]);

  const weatherCoords = useMemo(() => {
    if (!canUseLocation) return null;
    if (location.status === 'granted') return location.activeCoords;
    if (useDefault) {
      return { latitude: DEFAULT_LOCATION.latitude, longitude: DEFAULT_LOCATION.longitude };
    }
    return null;
  }, [canUseLocation, location.activeCoords, location.status, useDefault]);
  const weather = useWeather(weatherCoords);
  const activeTheme = useMemo(() => {
    if (__DEV__ && debugThemeIndex !== null) {
      const debugPair = DEBUG_THEME_PAIRS[debugThemeIndex];
      return getWeatherTheme(debugPair[0], debugPair[1]);
    }
    return weather.data
      ? getWeatherTheme(weather.data.current.weatherCode ?? 0, weather.data.current.isDay ?? true)
      : DEFAULT_WEATHER_THEME;
  }, [debugThemeIndex, weather.data]);
  useFocusEffect(useCallback(() => {
    setTheme(activeTheme);
  }, [activeTheme, setTheme]));
  const needsLocationPermission =
    canUseLocation && location.status !== 'granted' && !useDefault;
  const isLocating = location.status === 'idle' || location.status === 'requesting';
  const weeklyTemps = weather.data?.daily.flatMap(item => [item.low, item.high]) ?? [];
  const weekMin = weeklyTemps.length ? Math.min(...weeklyTemps) : 0;
  const weekMax = weeklyTemps.length ? Math.max(...weeklyTemps) : 0;
  const columnWidth = layout.columns === 2 ? (width - 44) / 2 : width - 32;
  const metricColumns = width >= 1200 ? 4 : width >= 900 ? 3 : 2;
  const currentMetricWidth = (columnWidth - 12 * (metricColumns - 1)) / metricColumns;
  const entrance = useStaggeredEntrance(4, Boolean(weather.data));

  const retryPermission = (): void => {
    if (location.status === 'blocked') location.openSettings();
    else location.retry();
  };

  const fallbackAction = (): void => {
    if (location.status === 'blocked') location.openSettings();
    else location.retry();
  };

  const updatedAtLabel = weather.updatedAt === null
    ? ''
    : `Cập nhật ${new Date(weather.updatedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
  const rotateDebugTheme = (): void => {
    if (!__DEV__) return;
    const nextIndex = debugThemeIndex === null ? 0 : (debugThemeIndex + 1) % DEBUG_THEME_PAIRS.length;
    setDebugThemeIndex(nextIndex);
    const [code, isDay] = DEBUG_THEME_PAIRS[nextIndex];
    const label = getWeatherTheme(code, isDay);
    Alert.alert('Theme xem trước', `${label.kind} · ${isDay ? 'ban ngày' : 'ban đêm'}`);
  };
  let content: React.ReactNode;
  if (isLocating) {
    content = <StateView theme={activeTheme} type="loading" message="Đang xác định vị trí của bạn..." />;
  } else if (needsLocationPermission) {
    content = (
      <LocationPermissionView
        status={location.status}
        errorMessage={location.errorMessage}
        theme={activeTheme}
        onRetry={retryPermission}
        onOpenSettings={location.openSettings}
        onUseDefault={() => setUseDefault(true)}
      />
    );
  } else if (!weather.data && weather.loading) {
    content = <StateView theme={activeTheme} type="loading" message="Đang tải dự báo thời tiết..." />;
  } else if (!weather.data && weather.error) {
    content = (
      <StateView
        type="error"
        theme={activeTheme}
        message={getErrorMessage(weather.error)}
        onRetry={weather.refetch}
      />
    );
  } else if (isWeatherEmpty(weather.data)) {
    content = <StateView theme={activeTheme} type="empty" onRetry={weather.refetch} />;
  } else if (weather.data) {
    const city = weather.data.current.city;
    const firstHour = weather.data.hourly[0];
    const openCurrentDetail = (): void => {
      if (firstHour) navigation.navigate('Detail', { type: 'hour', item: firstHour, city });
    };
    content = (
      <View style={[styles.scrollViewport, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 16) }]}
          refreshControl={<RefreshControl refreshing={weather.refreshing} onRefresh={weather.refetch} tintColor={activeTheme.textPrimary} />}
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.headerRow}>
          <View style={styles.headerTextBlock}>
            <TouchableOpacity onLongPress={__DEV__ ? rotateDebugTheme : undefined} delayLongPress={1500} accessibilityRole={__DEV__ ? 'button' : undefined} accessibilityLabel={__DEV__ ? 'Nhấn giữ để đổi theme xem trước' : undefined}>
              <Text style={[styles.locationTitle, { color: activeTheme.textPrimary }]}>📍 {city}</Text>
            </TouchableOpacity>
            {updatedAtLabel ? <Text style={[styles.updatedAt, { color: activeTheme.textSecondary }]}>{updatedAtLabel}</Text> : null}
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Làm mới dự báo thời tiết"
            disabled={weather.refreshing}
            onPress={weather.refetch}
            style={[styles.refreshButton, { backgroundColor: activeTheme.glass }]}
          >
            <Text style={[styles.refreshIcon, { color: activeTheme.textPrimary }]}>🔄</Text>
          </TouchableOpacity>
        </View>
        {location.isUsingFallback || useDefault ? (
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Cấp quyền vị trí hoặc đổi lại vị trí mặc định" onPress={fallbackAction} style={[styles.fallbackBanner, { backgroundColor: activeTheme.glass }]}>
            <Text style={[styles.fallbackText, { color: activeTheme.textPrimary }]}>
              Đang dùng vị trí mặc định (Hà Nội) · {location.status === 'blocked' ? 'Mở Cài đặt' : 'Cấp quyền'}
            </Text>
          </TouchableOpacity>
        ) : null}
        {weather.error ? (
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Có lỗi cập nhật thời tiết, thử lại" onPress={weather.refetch} style={[styles.errorBanner, { backgroundColor: activeTheme.glass }]}>
            <Text style={[styles.errorText, { color: activeTheme.textPrimary }]}>{getErrorMessage(weather.error)} · Chạm để thử lại</Text>
          </TouchableOpacity>
        ) : null}
        <View style={[styles.responsiveRow, layout.columns === 1 ? styles.stacked : undefined]}>
          <View style={[styles.responsiveColumn, layout.columns === 2 ? styles.responsiveColumnTwo : undefined]}>
            <Animated.View style={[entrance[0], styles.viewThoiTietHienTai]}>
              <THoiTietHientai
                data={weather.data.current}
                theme={activeTheme}
                showCity={false}
                temperatureFontSize={Math.min(54, width * 0.14)}
              />
            </Animated.View>
            <Animated.View style={[entrance[1], styles.viewThoiTietTheoGio]}>
              <View style={styles.sectionHeaderRow}>
                <Text maxFontSizeMultiplier={1.3} style={[styles.sectionTitle, { color: activeTheme.textPrimary }]}>🕒 DỰ BÁO 24 GIỜ TỚI</Text>
              </View>
              <ScrollView horizontal style={styles.hourlyScroll} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
                {weather.data.hourly.map(item => (
                  <ThoiTietTheoGio
                    key={item.isoTime ?? item.time}
                    data={item}
                    theme={activeTheme}
                    cardWidth={layout.hourCardWidth}
                    onPress={() => navigation.navigate('Detail', { type: 'hour', item, city })}
                  />
                ))}
              </ScrollView>
            </Animated.View>
          </View>
          <View style={[styles.responsiveColumn, layout.columns === 2 ? styles.responsiveColumnTwo : undefined]}>
            <Animated.View style={[entrance[3], styles.currentMetrics]}>
              <View style={styles.sectionHeaderRow}>
                <Text maxFontSizeMultiplier={1.3} style={[styles.sectionTitle, { color: activeTheme.textPrimary }]}>📊 CHỈ SỐ HIỆN TẠI</Text>
              </View>
              <View style={styles.currentMetricsGrid}>
                <MetricCard
              icon="💧"
              label="Độ ẩm"
              value={`${weather.data.current.humidity}%`}
              theme={activeTheme}
              onPress={openCurrentDetail}
              accessibilityLabel="Chi tiết độ ẩm hiện tại"
              style={{ width: currentMetricWidth }}
            >
              <ProgressBar value={weather.data.current.humidity} color={activeTheme.textPrimary} />
            </MetricCard>
            <MetricCard
              icon="🌬️"
              label="Gió"
              value={weather.data.current.windSpeed.replace(' km/h', '')}
              unit="km/h"
              description={`${getWindLevel(Number.parseFloat(weather.data.current.windSpeed))} · ${weather.data.current.windDirectionText ?? 'Hướng gió --'}`}
              theme={activeTheme}
              onPress={openCurrentDetail}
              accessibilityLabel="Chi tiết tốc độ và hướng gió hiện tại"
              style={{ width: currentMetricWidth }}
            >
              {weather.data.current.windDirection !== undefined ? (
                <WindCompass windDirection={weather.data.current.windDirection} color={activeTheme.textPrimary} />
              ) : null}
            </MetricCard>
            <MetricCard
              icon="☀️"
              label="Chỉ số UV"
              value={String(Math.round(weather.data.current.uvIndex))}
              theme={activeTheme}
              onPress={openCurrentDetail}
              accessibilityLabel="Chi tiết chỉ số UV hiện tại"
              style={{ width: currentMetricWidth }}
            >
              <UvBar value={weather.data.current.uvIndex} textColor={activeTheme.textSecondary} />
            </MetricCard>
            <MetricCard
              icon="🧭"
              label="Áp suất"
              value={weather.data.current.pressure === undefined ? '--' : String(weather.data.current.pressure)}
              unit="hPa"
              description={weather.data.current.pressure === undefined ? undefined : getPressureLabel(weather.data.current.pressure)}
              theme={activeTheme}
              onPress={openCurrentDetail}
              accessibilityLabel="Chi tiết áp suất hiện tại"
              style={{ width: currentMetricWidth }}
            />
            <MetricCard
              icon="👁️"
              label="Tầm nhìn"
              value={weather.data.current.visibility === undefined ? '--' : String(weather.data.current.visibility)}
              unit="km"
              description={weather.data.current.visibility === undefined ? undefined : getVisibilityLabel(weather.data.current.visibility)}
              theme={activeTheme}
              onPress={openCurrentDetail}
              accessibilityLabel="Chi tiết tầm nhìn hiện tại"
              style={{ width: currentMetricWidth }}
            />
            <MetricCard
              icon="🌧️"
              label="Lượng mưa"
              value={weather.data.current.precipitation === undefined ? '--' : String(weather.data.current.precipitation)}
              unit="mm"
              description={`Khả năng mưa ${weather.data.current.precipitationProbability === undefined ? '--' : `${weather.data.current.precipitationProbability}%`}`}
              theme={activeTheme}
              onPress={openCurrentDetail}
              accessibilityLabel="Chi tiết lượng mưa hiện tại"
              style={{ width: currentMetricWidth }}
            >
              {weather.data.current.precipitationProbability !== undefined ? (
                <ProgressBar value={weather.data.current.precipitationProbability} color={activeTheme.textPrimary} />
              ) : null}
            </MetricCard>
              </View>
            </Animated.View>
            <Animated.View style={[entrance[2], styles.viewThoiTietTheoNgay]}>
              <View style={styles.sectionHeaderRow}>
                <Text maxFontSizeMultiplier={1.3} style={[styles.sectionTitle, { color: activeTheme.textPrimary }]}>📅 DỰ BÁO 7 NGÀY TỚI</Text>
              </View>
              {weather.data.daily.map(item => (
                <ThoiTietTheoNgay
                  key={item.isoDate ?? item.date}
                  data={item}
                  weekMin={weekMin}
                  weekMax={weekMax}
                  theme={activeTheme}
                  onPress={() => navigation.navigate('Detail', { type: 'day', item, city })}
                />
              ))}
            </Animated.View>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  } else {
    content = <StateView theme={activeTheme} type="loading" message="Đang tải dự báo thời tiết..." />;
  }

  return (
    <WeatherBackground theme={activeTheme}>
      <SafeAreaView edges={[]} style={styles.safeArea}>
        <View style={styles.container}>{content}</View>
      </SafeAreaView>
    </WeatherBackground>
  );
};

export default HomeScreen;
