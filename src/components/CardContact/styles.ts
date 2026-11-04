// src/components/CardContact/styles.ts — thẻ danh bạ + nhãn Online/Offline theo design
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
  avatarArea: {
    marginRight: 12,
  },
  infoArea: {
    flex: 1,
  },
  name: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingLeft: 8,
    paddingRight: 10,
    borderRadius: 20,
  },
  statusPillOn: {
    backgroundColor: Colors.successLight,
  },
  statusPillOff: {
    backgroundColor: Colors.borderLight,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  statusTextOn: {
    color: Colors.successDark,
  },
  statusTextOff: {
    color: Colors.textSecondary,
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
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: Colors.inputBg,
  },
});
