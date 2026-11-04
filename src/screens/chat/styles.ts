import { StyleSheet } from 'react-native';
import { ThemeColors, FontSize, FontWeight, Shadow, Spacing } from '../../theme';

// Màn Chat theo design: header trắng bo góc, bong bóng lớn, thanh nhập dạng viên thuốc nổi
export const createStyles = (Colors: ThemeColors) => StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    gap: 12,
    ...Shadow.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  headerStatus: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  headerStatusOnline: {
    color: Colors.successDark,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  messageRowMine: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  groupGap: {
    marginTop: Spacing.sm,
  },
  avatarSlot: {
    width: 32,
    marginRight: Spacing.xs,
    alignItems: 'center',
  },
  bubble: {
    maxWidth: '76%',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleMine: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 6,
  },
  bubbleOther: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 6,
    ...Shadow.sm,
  },
  messageText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  messageTextMine: {
    color: Colors.white,
  },
  bubbleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 4,
    gap: 4,
  },
  timeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  timeTextMine: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 32,
    gap: 6,
    ...Shadow.lg,
  },
  attachBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
    maxHeight: 100,
    justifyContent: 'center',
  },
  input: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
    paddingVertical: 6,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: Colors.inputBg,
  },
  // Tin nhắn vị trí: thẻ có hình bản đồ + ghim, khác hẳn tin thường
  bubbleLocation: {
    width: 244,
    maxWidth: '80%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    ...Shadow.md,
  },
  locationMap: {
    height: 84,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mapRoad: {
    position: 'absolute',
    height: 10,
    left: -20,
    right: -20,
    backgroundColor: Colors.surface,
  },
  mapBlock: {
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: Colors.primaryMid,
    opacity: 0.45,
  },
  mapRoadA: { top: 22, transform: [{ rotate: '-8deg' }] },
  mapRoadB: { top: 56, transform: [{ rotate: '12deg' }] },
  mapBlockA: { top: 6, left: 20, width: 46, height: 18 },
  mapBlockB: { bottom: 8, right: 22, width: 36, height: 22 },
  locationBody: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
  },
  locationTitle: {
    fontSize: FontSize.base - 1,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  locationCoords: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  locationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  locationHint: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primaryDark,
  },
  locationTime: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});
