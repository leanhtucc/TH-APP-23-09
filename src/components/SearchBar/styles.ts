import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, Radius, Spacing } from '../../theme';

export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    height: 44,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  containerFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 2,
    backgroundColor: Colors.textDisabled,
    borderRadius: Radius.full,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
