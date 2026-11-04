// src/components/ScreenHeader/styles.ts — header sáng theo design (tiêu đề đậm, nền trang)
import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight, Spacing } from '../../theme';

export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  circleLarge: {
    display: 'none',
  },
  circleSmall: {
    display: 'none',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleArea: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: FontSize.md - 1,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    marginTop: 4,
  },
});
