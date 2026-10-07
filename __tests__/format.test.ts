import { formatTemp } from '../src/utils/format';

describe('formatTemp', () => {
  it('rounds to integer and normalizes negative zero', () => {
    expect(formatTemp(18.6)).toBe('19');
    expect(formatTemp(18.4)).toBe('18');
    expect(formatTemp(-0.2)).toBe('0');
  });

  it('uses a placeholder for missing or invalid values', () => {
    expect(formatTemp(undefined)).toBe('--');
    expect(formatTemp(Number.NaN)).toBe('--');
  });
});
