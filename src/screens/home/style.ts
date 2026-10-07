import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 10,
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4b5563',
    letterSpacing: 0.5,
  },
  subHint: {
    fontSize: 12,
    color: '#9ca3af',
  },
  accountLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0068ff',
  },
  viewThoiTietHienTai: {
  },
  viewThoiTietTheoGio: {
  },
  horizontalScrollContent: {
    paddingVertical: 4,
    gap: 10,
  },
  viewThoiTietTheoNgay: {
    flex: 1, 
  },
  verticalScrollContent: {
    gap: 8,
    paddingBottom: 16,
  },
});
