import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-start',
    marginTop: 8,
  },
  compass: {
    alignItems: 'center',
    borderColor: '#ffffff',
    borderRadius: 36,
    borderWidth: 1,
    height: 72,
    justifyContent: 'center',
    position: 'relative',
    width: 72,
  },
  cardinal: {
    color: '#ffffff',
    fontSize: 10,
    opacity: 0.85,
    fontWeight: '700',
    position: 'absolute',
  },
  north: { top: 3 },
  east: { right: 5 },
  south: { bottom: 3 },
  west: { left: 5 },
  arrow: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 38,
  },
});

export default styles;
