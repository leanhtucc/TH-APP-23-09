import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: 76,
    minHeight: 112,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
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
