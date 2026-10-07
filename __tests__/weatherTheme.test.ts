import { getWeatherKind, getWeatherTheme } from '../src/utils/weatherTheme';
import { blendOver, contrastRatio } from '../src/utils/color';

describe('weather theme', () => {
  it.each([
    [[0], 'clear'],
    [[1, 2], 'partly_cloudy'],
    [[3], 'cloudy'],
    [[45, 48], 'fog'],
    [[51, 56, 61, 67, 80, 82], 'rain'],
    [[71, 73, 75, 77, 85, 86], 'snow'],
    [[95, 96, 99], 'thunder'],
    [[999], 'clear'],
  ] as const)('maps WMO codes %j to %s', (codes, expected) => {
    codes.forEach(code => expect(getWeatherKind(code)).toBe(expected));
  });

  it('provides day and night palettes for every weather kind', () => {
    [0, 1, 3, 45, 61, 71, 95].forEach(code => {
      const day = getWeatherTheme(code, true);
      const night = getWeatherTheme(code, false);
      expect(day.kind).toBe(getWeatherKind(code));
      expect(day.isDay).toBe(true);
      expect(night.isDay).toBe(false);
      expect(day.background).not.toBe(night.background);
    });
  });

  it('uses dark text for bright daytime snow and fog palettes', () => {
    [45, 71].forEach(code => {
      expect(getWeatherTheme(code, true).statusBarStyle).toBe('dark-content');
      expect(getWeatherTheme(code, true).textPrimary).toBe('#1f2937');
      expect(getWeatherTheme(code, false).statusBarStyle).toBe('light-content');
    });
  });

  it('keeps primary and secondary text readable on glass in every weather and time combination', () => {
    [0, 2, 3, 45, 61, 71, 95].forEach(code => [true, false].forEach(isDay => {
      const theme = getWeatherTheme(code, isDay);
      [theme.background, theme.backgroundSecondary].forEach(background => {
        const glassBackground = blendOver(theme.glass, background);
        expect(contrastRatio(theme.textPrimary, glassBackground)).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(theme.textSecondary, glassBackground)).toBeGreaterThanOrEqual(3.5);
      });
    }));
  });
});
