export type UvLevel = 'Thấp' | 'Trung bình' | 'Cao' | 'Rất cao' | 'Cực cao';

export function getUvLevel(uv: number): UvLevel {
  const rounded = Math.round(uv);
  if (rounded <= 2) return 'Thấp';
  if (rounded <= 5) return 'Trung bình';
  if (rounded <= 7) return 'Cao';
  if (rounded <= 10) return 'Rất cao';
  return 'Cực cao';
}

export function getPressureLabel(hPa: number): string {
  if (hPa < 1000) return 'Thấp';
  if (hPa <= 1020) return 'Bình thường';
  return 'Cao';
}

export function getVisibilityLabel(km: number): string {
  if (km < 2) return 'Kém';
  if (km <= 5) return 'Trung bình';
  if (km <= 10) return 'Tốt';
  return 'Rất tốt';
}

export function getWindLevel(kmh: number): string {
  if (kmh < 1) return 'Lặng';
  if (kmh < 20) return 'Nhẹ';
  if (kmh < 40) return 'Vừa';
  if (kmh < 60) return 'Mạnh';
  return 'Rất mạnh';
}
