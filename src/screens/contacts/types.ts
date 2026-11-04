import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { Contact } from '../../types/chat';

export type ContactsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ContactListItem =
  | { type: 'header'; label: string; count: number; online: boolean }
  | { type: 'contact'; data: Contact };
