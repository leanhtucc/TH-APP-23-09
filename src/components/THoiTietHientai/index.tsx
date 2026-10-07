import React from 'react';
import { Text, View } from 'react-native';
import { CurrentWeather, weatherData } from '../../data/weather';
import { styles } from './style';

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
export default THoiTietHientai;