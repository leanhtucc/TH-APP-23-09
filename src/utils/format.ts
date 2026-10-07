const DIRECTIONS = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
const WEEKDAYS = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export function formatTemp(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return '--';
  const rounded = Math.round(value);
  return String(Object.is(rounded, -0) ? 0 : rounded);
}

export function degreesToDirection(deg: number): string {
  const normalized = ((deg % 360) + 360) % 360;
  return DIRECTIONS[Math.round(normalized / 45) % 8];
}

export function formatHour(iso: string): string {
  const match = /T(\d{2}:\d{2})/.exec(iso);
  return match?.[1] ?? '';
}

export function formatWeekday(iso: string, index: number): string {
  if (index === 0) return 'Hôm nay';
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return '';
  const weekday = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))).getUTCDay();
  return WEEKDAYS[weekday];
}

export function formatDayMonth(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return match ? `${match[3]}/${match[2]}` : '';
}

export function metersToKm(m: number): number {
  return Math.round((m / 1000) * 10) / 10;
}
