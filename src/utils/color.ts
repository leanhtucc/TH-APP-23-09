function parseHex(hex: string): [number, number, number] {
  const value = hex.replace(/^#/, '');
  const expanded = value.length === 3 ? value.split('').map(char => char + char).join('') : value;
  if (!/^[\da-fA-F]{6}$/.test(expanded)) throw new Error(`Invalid hex color: ${hex}`);
  return [0, 2, 4].map(index => Number.parseInt(expanded.slice(index, index + 2), 16)) as [number, number, number];
}

function toHex(value: number): string {
  return Math.round(value).toString(16).padStart(2, '0');
}

export function lerpColor(hexA: string, hexB: string, t: number): string {
  const a = parseHex(hexA);
  const b = parseHex(hexB);
  const amount = Math.min(1, Math.max(0, t));
  return `#${a.map((channel, index) => toHex(channel + (b[index] - channel) * amount)).join('')}`;
}

export function getGradientStops(top: string, bottom: string, steps = 24): string[] {
  const count = Math.max(2, Math.floor(steps));
  return Array.from({ length: count }, (_, index) => lerpColor(top, bottom, index / (count - 1)));
}

function linearize(channel: number): number {
  const normalized = channel / 255;
  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function rgba(color: string): { rgb: [number, number, number]; alpha: number } {
  if (color.startsWith('#')) return { rgb: parseHex(color), alpha: 1 };
  const match = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i.exec(color);
  if (!match) throw new Error(`Invalid color: ${color}`);
  return { rgb: [Number(match[1]), Number(match[2]), Number(match[3])], alpha: match[4] === undefined ? 1 : Number(match[4]) };
}

export function blendOver(rgbaGlass: string, bgHex: string): string {
  const foreground = rgba(rgbaGlass);
  const background = parseHex(bgHex);
  return `#${foreground.rgb.map((channel, index) => toHex(channel * foreground.alpha + background[index] * (1 - foreground.alpha))).join('')}`;
}

export function contrastRatio(fgHex: string, bgHex: string): number {
  const luminance = (color: string): number => rgba(color).rgb
    .map(linearize)
    .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const first = luminance(fgHex);
  const second = luminance(bgHex);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}
