// src/components/CardContact/types.ts
import { Contact } from '../../types/chat';

export interface CardContactProps {
  contact: Contact;
  onPress: (contact: Contact) => void;
  onCall?: (contact: Contact) => void;
}
