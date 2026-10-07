import { getLayoutInfo } from '../src/utils/layout';

describe('responsive layout', () => {
  it('uses one column on a narrow portrait screen', () => {
    expect(getLayoutInfo(375, 812)).toEqual({
      columns: 1,
      isTablet: false,
      isLandscape: false,
      hourCardWidth: 75,
    });
  });

  it('uses two columns for tablet width and landscape screens', () => {
    expect(getLayoutInfo(768, 1024).columns).toBe(2);
    expect(getLayoutInfo(844, 390)).toMatchObject({ columns: 2, isLandscape: true });
  });

  it('clamps hourly card widths at both ends', () => {
    expect(getLayoutInfo(320, 720).hourCardWidth).toBe(64);
    expect(getLayoutInfo(600, 900).hourCardWidth).toBe(88);
  });
});
