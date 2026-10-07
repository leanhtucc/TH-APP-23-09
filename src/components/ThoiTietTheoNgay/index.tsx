import React from 'react';
import { Text, View } from 'react-native';
import { DailyWeather, weatherData } from '../../data/weather';
import { styles } from './style';

interface Props {
  data?: DailyWeather;
}

export const ThoiTietTheoNgay: React.FC<Props> = ({ data = weatherData.daily[0] }) => {
  return (
    <View style={styles.card}>
      {/* Ngày trong tuần */}
      <View style={styles.dayColumn}>
        <Text style={styles.dayText}>{data.day}</Text>
        <Text style={styles.dateText}>{data.date}</Text>
      </View>

      {/* Thời tiết & Icon */}
      <View style={styles.conditionColumn}>
        <Text style={styles.icon}>{data.icon}</Text>
        <Text style={styles.conditionText} numberOfLines={1}>
          {data.condition}
        </Text>
      </View>

      {/* Nhiệt độ thấp - cao */}
      <View style={styles.tempColumn}>
        <Text style={styles.lowTemp}>{data.low}°</Text>
        <View style={styles.tempBarBackground}>
          <View style={styles.tempBarActive} />
        </View>
        <Text style={styles.highTemp}>{data.high}°</Text>
      </View>
    </View>
  );
};



export default ThoiTietTheoNgay;