// src/components/ScreenHeader/types.ts
import React from 'react';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  /** Nút/hành động bên phải tiêu đề */
  right?: React.ReactNode;
  /** Nội dung thêm bên dưới (vd: SearchBar) */
  children?: React.ReactNode;
}
