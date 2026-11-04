import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Peer } from './chat';

// Chưa đăng nhập: Login/Register — đã đăng nhập: Main (tabs) + Chat
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined; // Bottom Tab container
  Chat: { peer: Peer };
};

// Tab navigator param list
export type MainTabParamList = {
  HomeTab: undefined;
  ContactsTab: undefined;
  NotificationsTab: undefined;
  SettingsTab: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;
