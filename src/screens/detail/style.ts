import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.18)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 22,
    marginBottom: 22,
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  heroIcon: {
    fontSize: 54,
  },
  heroTemperature: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '800',
    marginTop: 2,
  },
  condition: {
    color: '#e0edff',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 2,
  },
  city: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 10,
  },
  moment: {
    color: '#dbeafe',
    fontSize: 13,
    marginTop: 5,
  },
  heroDescription: {
    color: '#bfdbfe',
    fontSize: 13,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#4b5563',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  grid: {
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridSingleColumn: {
    flexDirection: 'column',
  },
  metricNote: {
    color: '#6b7280',
    fontSize: 11,
    marginTop: 8,
  },
  sunBlock: {
    marginTop: 22,
  },
  sunRow: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
  },
  sunItem: {
    alignItems: 'center',
  },
  sunLabel: {
    color: '#4b5563',
    fontSize: 13,
  },
  sunTime: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
});

export default styles;
