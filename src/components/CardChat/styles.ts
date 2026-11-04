// src/components/CardChat/styles.ts — thẻ hội thoại theo design
import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight, Shadow } from '../../theme';

export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    ...Shadow.sm,
  },
  containerUnread: {
    backgroundColor: Colors.surface,
  },
  avatarArea: {
    marginRight: 12,
  },
  infoArea: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  name: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  nameUnread: {
    fontWeight: FontWeight.bold,
  },
  time: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  timeUnread: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    display: 'none',
  },
  lastMsg: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  lastMsgUnread: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.semibold,
  },
  unreadPill: {
    backgroundColor: Colors.primary,
    borderRadius: 11,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 7,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadPillText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
});
