// Text / TextInput có sẵn font Plus Jakarta Sans (đăng ký ở MainApplication.kt).
// Các độ đậm 400–800 lấy từ res/font/plus_jakarta_sans.xml qua prop fontWeight.
import React from 'react';
import {
  Text as RNText,
  TextInput as RNTextInput,
  TextProps,
  TextInputProps,
} from 'react-native';
import { FontFamily } from '../../theme';

const base = { fontFamily: FontFamily.regular };

export const Text: React.FC<TextProps> = (props) => (
  <RNText {...props} style={[base, props.style]} />
);

export const TextInput: React.FC<TextInputProps> = (props) => (
  <RNTextInput {...props} style={[base, props.style]} />
);
