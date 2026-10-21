// src/components/CardChat/types.ts
import { Conversation } from '../../data/mockData';

export interface CardChatProps {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
}
