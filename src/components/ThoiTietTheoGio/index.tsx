import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HourlyWeather, weatherData } from '../../data/weather';

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

const styles = StyleSheet.create({
  card: {
    width: 76,
    height: 120,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  thoiGian: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
  },
  icon: {
    fontSize: 26,
    marginVertical: 2,
  },
  rainChance: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0284c7',
  },
  emptyRain: {
    height: 14,
  },
  nhietDo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
});

export default ThoiTietTheoGio;