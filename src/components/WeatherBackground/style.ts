import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  gradientBand: {
    flex: 1,
  },
  sunGlow: {
    alignItems: 'center',
    height: 150,
    position: 'absolute',
    right: 16,
    width: 150,
  },
  sunGlowOuter: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,214,102,0.05)',
    borderRadius: 75,
    height: 150,
    justifyContent: 'center',
    width: 150,
  },
  sunGlowMiddle: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,214,102,0.08)',
    borderRadius: 57,
    height: 114,
    justifyContent: 'center',
    width: 114,
  },
  sunGlowInner: {
    backgroundColor: 'rgba(255,214,102,0.12)',
    borderRadius: 38,
    height: 76,
    width: 76,
  },
  rainField: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  raindrop: {
    backgroundColor: 'rgba(219,234,254,0.7)',
    borderRadius: 2,
    height: 26,
    position: 'absolute',
    top: 0,
    width: 2,
  },
});

export default styles;
