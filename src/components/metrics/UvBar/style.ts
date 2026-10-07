import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  track: {
    borderRadius: 4,
    flexDirection: 'row',
    height: 8,
    overflow: 'visible',
    position: 'relative',
  },
  segment: {
    height: '100%',
  },
  marker: {
    backgroundColor: '#111827',
    borderColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 2,
    height: 12,
    marginLeft: -6,
    position: 'absolute',
    top: -2,
    width: 12,
  },
  level: {
    color: '#4b5563',
    fontSize: 11,
    marginTop: 6,
  },
});

export default styles;
