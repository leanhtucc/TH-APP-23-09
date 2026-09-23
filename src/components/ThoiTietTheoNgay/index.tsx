import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DailyWeather, weatherData } from '../../data/weather';

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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  dayColumn: {
    width: 78,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  dateText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  conditionColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 6,
  },
  conditionText: {
    fontSize: 13,
    color: '#4b5563',
    flex: 1,
  },
  tempColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 100,
    justifyContent: 'flex-end',
  },
  lowTemp: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    width: 26,
    textAlign: 'right',
  },
  tempBarBackground: {
    width: 36,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  tempBarActive: {
    width: '70%',
    height: '100%',
    backgroundColor: '#0068ff',
    borderRadius: 2,
  },
  highTemp: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    width: 26,
  },
});

export default ThoiTietTheoNgay;