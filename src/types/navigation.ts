import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Conversation } from '../data/mockData';

// Stack gốc: Login → Main (tabs); Chat nằm ngoài tab
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;         // Bottom Tab container
  Chat: { conversation: Conversation };
  // Màn hình cũ giữ lại để không break code hiện tại
  StudentHome: undefined;
  Home: undefined;
  Logout: undefined;
  TH1: undefined;
  settings: undefined;
};

// Tab navigator param list
export type MainTabParamList = {
  HomeTab: undefined;
  ContactsTab: undefined;
  NotificationsTab: undefined;
  SettingsTab: undefined;
};

export type StudentHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'StudentHome'>;
export type HomeScreenProps        = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LoginScreenProps       = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps    = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type LogoutScreenProps      = NativeStackScreenProps<RootStackParamList, 'Logout'>;
export type TH1ScreenProps         = NativeStackScreenProps<RootStackParamList, 'TH1'>;
export type SettingsScreenProps    = NativeStackScreenProps<RootStackParamList, 'settings'>;
export type ChatScreenProps        = NativeStackScreenProps<RootStackParamList, 'Chat'>;
