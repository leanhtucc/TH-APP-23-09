// src/components/CardContact/styles.ts
import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../../theme';

export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  avatarArea: {
    marginRight: 14,
  },
  infoArea: {
    flex: 1,
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  statusOnline: {
    fontSize: FontSize.sm,
    color: Colors.successDark,
    fontWeight: FontWeight.medium,
  },
  statusOffline: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  actionsArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: Colors.inputBg,
  },
});
