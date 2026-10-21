// src/components/CardContact/types.ts
import { Contact } from '../../data/mockData';

export interface CardContactProps {
  contact: Contact;
  onPress: (contact: Contact) => void;
  onCall?: (contact: Contact) => void;
}
