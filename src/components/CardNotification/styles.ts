// src/components/CardNotification/styles.ts
import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../../theme';

export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Spacing.md,
    alignItems: 'center',
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  containerUnread: {
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  containerRead: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  iconCircleUnread: {
    backgroundColor: Colors.primaryLight,
  },
  iconCircleRead: {
    backgroundColor: Colors.background,
  },
  contentArea: {
    flex: 1,
  },
  contentText: {
    fontSize: FontSize.md,
    lineHeight: 20,
    marginBottom: 4,
  },
  contentTextUnread: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.semibold,
  },
  contentTextRead: {
    color: Colors.textSecondary,
    fontWeight: FontWeight.regular,
  },
  timeText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: Spacing.sm,
  },
});
