export interface LayoutInfo {
  columns: 1 | 2;
  isTablet: boolean;
  isLandscape: boolean;
  hourCardWidth: number;
}

export function getLayoutInfo(width: number, height: number): LayoutInfo {
  const isTablet = width >= 600;
  const isLandscape = width > height;
  return {
    columns: isTablet || isLandscape ? 2 : 1,
    isTablet,
    isLandscape,
    hourCardWidth: Math.min(88, Math.max(64, width * 0.2)),
  };
}
