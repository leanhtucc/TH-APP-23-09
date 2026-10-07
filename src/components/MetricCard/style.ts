import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  stretch: { alignSelf: 'stretch' },
  fillCard: { flex: 1 },
  card: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 122,
    padding: 14,
    alignSelf: 'stretch',
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  icon: {
    fontSize: 17,
    marginRight: 7,
  },
  label: {
    color: '#4b5563',
    flexShrink: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  valueRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  compositeBody: {
    flex: 1,
  },
  compositeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  compositeStacked: {
    flexDirection: 'column',
  },
  compositeText: {
    flex: 1,
    minWidth: 0,
  },
  compositeTrailing: {
    flexShrink: 0,
  },
  value: {
    color: '#111827',
    flexShrink: 1,
    fontSize: 23,
    fontWeight: '700',
  },
  unit: {
    color: '#4b5563',
    fontSize: 13,
    marginLeft: 4,
  },
  description: {
    color: '#6b7280',
    fontSize: 11,
    marginTop: 4,
  },
});

export default styles;
