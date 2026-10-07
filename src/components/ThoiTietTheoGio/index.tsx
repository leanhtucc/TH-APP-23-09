import React from 'react';
import { Text, View } from 'react-native';
import { HourlyWeather, weatherData } from '../../data/weather';
import { styles } from './style';

interface Props {
  data?: HourlyWeather;
}

export const ThoiTietTheoGio: React.FC<Props> = ({ data = weatherData.hourly[0] }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.thoiGian}>{data.time}</Text>
      <Text style={styles.icon}>{data.icon}</Text>
      {data.rainChance && data.rainChance !== '0%' ? (
        <Text style={styles.rainChance}>💧 {data.rainChance}</Text>
      ) : (
        <View style={styles.emptyRain} />
      )}
      <Text style={styles.nhietDo}>{data.temp}°</Text>
    </View>
  );
};

export default ThoiTietTheoGio;