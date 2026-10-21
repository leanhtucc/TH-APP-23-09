import { ChatScreenProps as BaseChatScreenProps } from '../../types/navigation';
import { ChatMessage } from '../../data/mockData';

export type ChatScreenProps = BaseChatScreenProps;

export interface MessageItemProps {
  item: ChatMessage;
  isMine: boolean;
  showAvatar: boolean;
  isGroupStart: boolean;
  avatarUri?: string;
  name?: string;
}
