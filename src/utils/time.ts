const pad = (n: number) => String(n).padStart(2, '0');

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export const formatClock = (ts: number): string => {
  const d = new Date(ts);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

/** Giờ hiển thị trong danh sách hội thoại: giờ / Hôm qua / Thứ / ngày-tháng */
export const formatListTime = (ts: number, now: number = Date.now()): string => {
  if (!ts) return '';
  const days = Math.round((startOfDay(new Date(now)) - startOfDay(new Date(ts))) / 86400000);
  if (days <= 0) return formatClock(ts);
  if (days === 1) return 'Hôm qua';
  if (days < 7) return WEEKDAYS[new Date(ts).getDay()];
  const d = new Date(ts);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
};

/** Giờ trong bong bóng chat: thêm ngày nếu không phải hôm nay */
export const formatMessageTime = (ts: number, now: number = Date.now()): string => {
  if (!ts) return '';
  const days = Math.round((startOfDay(new Date(now)) - startOfDay(new Date(ts))) / 86400000);
  if (days <= 0) return formatClock(ts);
  const d = new Date(ts);
  return `${formatClock(ts)} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
};
