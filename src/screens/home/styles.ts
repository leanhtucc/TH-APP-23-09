import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight, Spacing } from '../../theme';

export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingBottom: 2,
  },
  greeting: {
    fontSize: FontSize.md - 1,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 26,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  searchWrap: {
    paddingHorizontal: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  onlineSection: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  onlineRow: {
    flexDirection: 'row',
    gap: 18,
    paddingTop: 14,
    paddingBottom: 4,
  },
  onlineItem: {
    alignItems: 'center',
    width: 62,
  },
  onlineRing: {
    padding: 3,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  onlineName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginTop: 6,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: 22,
    paddingBottom: 12,
  },
  unreadChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
  },
  unreadChipActive: {
    backgroundColor: Colors.primary,
  },
  unreadChipText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primaryDark,
  },
  unreadChipTextActive: {
    color: Colors.white,
  },
  listContent: {
    paddingBottom: 120,
  },
});
