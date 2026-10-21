// src/theme/index.ts — Design System chung cho toàn app

export const lightColors = {
  // Brand
  primary: '#0068ff',
  primaryDark: '#0050cc',
  primaryDeep: '#003d99',
  primaryLight: '#e8f1ff',
  primarySoft: '#f2f7ff',
  primaryMid: '#93c5fd',

  // Status
  danger: '#ef4444',
  dangerLight: '#fee2e2',
  success: '#22c55e',
  successDark: '#16a34a',
  successLight: '#dcfce7',
  warning: '#f59e0b',

  // Surfaces
  white: '#ffffff',
  background: '#f3f5f9',
  backgroundAlt: '#f8fafc',
  surface: '#ffffff',
  inputBg: '#f3f5f9',

  // Text
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  textDisabled: '#cbd5e1',
  disabled: '#cbd5e1',
  textOnPrimary: '#ffffff',
  textOnPrimaryMuted: 'rgba(255,255,255,0.75)',

  // Border
  border: '#e2e8f0',
  borderLight: '#f1f5f9',

  // Misc
  overlay: 'rgba(0,0,0,0.04)',
  glass: 'rgba(255,255,255,0.18)',
};

export type ThemeColors = { [K in keyof typeof lightColors]: string };

// Dark mode: `white` luôn là trắng thật (chữ/icon trên nền xanh);
// nền thẻ/panel dùng `surface` để đổi theo theme.
export const darkColors: ThemeColors = {
  ...lightColors,
  primaryLight: '#16294d',
  primarySoft: '#111f3a',
  primaryMid: '#2f5fb3',

  dangerLight: '#3b1519',
  successLight: '#11321f',

  background: '#0b1220',
  backgroundAlt: '#101828',
  surface: '#151e30',
  inputBg: '#1e293b',

  textPrimary: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textMuted: '#8394ab',
  textDisabled: '#475569',
  disabled: '#475569',

  border: '#263248',
  borderLight: '#1e293b',
  overlay: 'rgba(255,255,255,0.05)',
};

/** Bảng màu mặc định (light) — dùng cho code ngoài React tree. */
export const Colors = lightColors;

export const FontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  base: 15,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  display: 32,
};

export const IconSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  xxl: 36,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  heavy: '800' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
  primary: {
    shadowColor: '#0068ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};
