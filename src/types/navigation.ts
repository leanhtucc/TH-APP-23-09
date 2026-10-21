import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Conversation } from '../data/mockData';

// Stack gốc: Login/Register → Main (tabs); Chat nằm ngoài tab
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined; // Bottom Tab container
  Chat: { conversation: Conversation };
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
