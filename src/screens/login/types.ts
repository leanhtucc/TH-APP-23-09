import { LoginScreenProps } from '../../types/navigation';

export type LoginProps = LoginScreenProps;

export interface LoginFormState {
  phoneNumber: string;
  password: string;
  showPassword: boolean;
  focused: 'phone' | 'password' | null;
  phoneError?: string;
  passwordError?: string;
  isLoading: boolean;
}
