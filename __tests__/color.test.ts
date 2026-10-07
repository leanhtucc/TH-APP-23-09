import { blendOver, contrastRatio, getGradientStops, lerpColor } from '../src/utils/color';

describe('color helpers', () => {
  it('interpolates endpoints and midpoint with short and long hex forms', () => {
    expect(lerpColor('#000', '#fff', 0)).toBe('#000000');
    expect(lerpColor('#000000', '#ffffff', 1)).toBe('#ffffff');
    expect(lerpColor('#000', '#fff', 0.5)).toBe('#808080');
    expect(getGradientStops('#000', '#fff', 3)).toEqual(['#000000', '#808080', '#ffffff']);
  });

  it('blends translucent glass over a background and computes WCAG contrast', () => {
    expect(blendOver('rgba(255,255,255,0.5)', '#000000')).toBe('#808080');
    expect(contrastRatio('#ffffff', '#000000')).toBe(21);
  });
});
