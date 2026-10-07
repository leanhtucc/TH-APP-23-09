import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0068ff',
    borderColor: 'rgba(255,255,255,0.18)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
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
  feelsLike: {
    fontSize: 13,
    color: '#dbeafe',
    marginTop: -12,
    marginBottom: 14,
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
