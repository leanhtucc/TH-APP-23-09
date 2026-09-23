import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CurrentWeather, weatherData } from '../../data/weather';

interface Props {
  data?: CurrentWeather;
}

export const THoiTietHientai: React.FC<Props> = ({ data = weatherData.current }) => {
  return (
    <View style={styles.card}>
      {/* Tên thành phố */}
      <Text style={styles.tenThanhPho}>📍 {data.city}</Text>

      {/* Nhiệt độ lớn và icon */}
      <View style={styles.tempRow}>
        <Text style={styles.weatherIcon}>{data.icon}</Text>
        <Text style={styles.nhietDo}>{data.temperature}°</Text>
      </View>

      {/* Trạng thái thời tiết */}
      <Text style={styles.trangThai}>{data.condition}</Text>

      {/* Nhiệt độ cao nhất / thấp nhất */}
      <Text style={styles.nhietDoPhamVi}>
        Cao nhất: {data.high}° • Thấp nhất: {data.low}°
      </Text>

      {/* Thẻ thông số chi tiết */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Độ ẩm</Text>
          <Text style={styles.detailValue}>{data.humidity}%</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Gió</Text>
          <Text style={styles.detailValue}>{data.windSpeed}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Chỉ số UV</Text>
          <Text style={styles.detailValue}>{data.uvIndex}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0068ff',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#0068ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  tenThanhPho: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  weatherIcon: {
    fontSize: 48,
    marginRight: 8,
  },
  nhietDo: {
    fontSize: 54,
    fontWeight: '800',
    color: '#ffffff',
  },
  trangThai: {
    fontSize: 17,
    fontWeight: '600',
    color: '#e0edff',
    marginBottom: 4,
  },
  nhietDoPhamVi: {
    fontSize: 13,
    color: '#bfdbfe',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#dbeafe',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  detailDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
});

export default THoiTietHientai;