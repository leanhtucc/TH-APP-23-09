// src/components/CardChat/styles.ts
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
  containerUnread: {
    backgroundColor: Colors.primarySoft,
  },
  avatarArea: {
    marginRight: Spacing.md,
  },
  infoArea: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  nameUnread: {
    fontWeight: FontWeight.bold,
  },
  time: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  timeUnread: {
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: 4,
  },
  lastMsg: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  lastMsgUnread: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.medium,
  },
  unreadPill: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    marginLeft: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadPillText: {
    color: Colors.white,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
});
