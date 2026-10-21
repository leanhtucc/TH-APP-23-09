import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight, Radius } from '../../theme';

export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  button: {
    backgroundColor: Colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.danger,
    borderWidth: 1.5,
    borderColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: FontSize.xs - 2,
    fontWeight: FontWeight.bold,
  },
});
