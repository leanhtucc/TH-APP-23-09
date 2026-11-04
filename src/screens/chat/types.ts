import { ChatScreenProps as BaseChatScreenProps } from '../../types/navigation';
import { ChatMessage } from '../../types/chat';

export type ChatScreenProps = BaseChatScreenProps;

export interface MessageItemProps {
  item: ChatMessage;
  isMine: boolean;
  showAvatar: boolean;
  isGroupStart: boolean;
  avatarUri?: string;
  name?: string;
}
