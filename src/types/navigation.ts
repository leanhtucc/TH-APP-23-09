import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  StudentHome: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Logout: undefined;
  TH1: undefined,
  settings: undefined
};

export type StudentHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'StudentHome'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type LogoutScreenProps = NativeStackScreenProps<RootStackParamList, 'Logout'>;
export type TH1ScreenProps = NativeStackScreenProps<RootStackParamList, 'TH1'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'settings'>;
