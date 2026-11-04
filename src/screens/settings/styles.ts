import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../../theme';

export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
    padding: 22,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    ...Shadow.primary,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 2,
  },
  profileContact: {
    fontSize: FontSize.md - 1,
    fontWeight: FontWeight.medium,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  statusBadgeOff: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  statusBadgeText: {
    fontSize: FontSize.xs,
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },
  statusBadgeTextOff: {
    color: 'rgba(255,255,255,0.8)',
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLabel: {
    paddingHorizontal: Spacing.xl + 4,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  sectionLabelText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    letterSpacing: 0.8,
  },
  section: {
    borderRadius: 24,
    overflow: 'hidden',
    marginHorizontal: Spacing.xl,
    backgroundColor: Colors.surface,
    ...Shadow.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.surface,
  },
  labelBox: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: FontSize.xs + 1,
    color: Colors.textMuted,
    marginTop: 2,
  },
  valueText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    height: 60,
    backgroundColor: Colors.dangerLight,
    borderRadius: 20,
    gap: 10,
  },
  logoutText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: '#B42318',
  },
  bottomSpacer: {
    height: 120,
  },
});
