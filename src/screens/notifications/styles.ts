import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight, Radius, Spacing } from '../../theme';

export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    gap: 4,
  },
  markAllText: {
    fontSize: FontSize.xs + 1,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  hint: {
    fontSize: FontSize.xs + 1,
    color: Colors.textMuted,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  listContent: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
});
