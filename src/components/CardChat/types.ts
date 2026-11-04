// src/components/CardChat/types.ts
import { Conversation } from '../../types/chat';

export interface CardChatProps {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
}
