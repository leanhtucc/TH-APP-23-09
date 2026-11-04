export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export type RegisterErrors = Partial<Record<keyof RegisterInput, string>>;

export const validateRegister = ({ name, email, password, confirm }: RegisterInput): RegisterErrors => {
  const errors: RegisterErrors = {};
  if (name.trim().length < 2) errors.name = 'Vui lòng nhập họ tên';
  if (!email.trim()) errors.email = 'Vui lòng nhập email';
  else if (!isValidEmail(email)) errors.email = 'Email không hợp lệ';
  if (password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự';
  if (!confirm) errors.confirm = 'Vui lòng nhập lại mật khẩu';
  else if (confirm !== password) errors.confirm = 'Mật khẩu nhập lại không khớp';
  return errors;
};
