import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderColor: 'rgba(255,255,255,0.18)',
    borderWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    fontSize: 36,
    marginBottom: 12,
  },
  message: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 16,
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#0068ff',
    borderRadius: 10,
    minWidth: 180,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: '#0068ff',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    minWidth: 180,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  secondaryButtonText: {
    color: '#0068ff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;
