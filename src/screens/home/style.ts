import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollViewport: {
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  headerTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  locationTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  updatedAt: {
    fontSize: 12,
    marginTop: 2,
  },
  refreshButton: {
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.18)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  refreshIcon: {
    fontSize: 21,
  },
  responsiveRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
  },
  stacked: {
    flexDirection: 'column',
  },
  responsiveColumn: {
    gap: 12,
    minWidth: 0,
    width: '100%',
  },
  responsiveColumnTwo: {
    flex: 1,
    width: undefined,
  },
  sectionHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    color: '#4b5563',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  viewThoiTietHienTai: {},
  currentMetrics: {},
  currentMetricsGrid: {
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  viewThoiTietTheoGio: {},
  horizontalScrollContent: {
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 4,
  },
  hourlyScroll: { flexGrow: 0 },
  viewThoiTietTheoNgay: {
    gap: 8,
  },
  fallbackBanner: {
    backgroundColor: '#eff6ff',
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  fallbackText: {
    color: '#1d4ed8',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorBanner: {
    backgroundColor: '#fff7ed',
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorText: {
    color: '#9a3412',
    fontSize: 13,
    textAlign: 'center',
  },
});
