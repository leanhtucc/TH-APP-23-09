import { StyleProp, ViewStyle } from 'react-native';

export type IconName =
  | 'messages'
  | 'contacts'
  | 'notifications'
  | 'notificationsOff'
  | 'settings'
  | 'search'
  | 'clear'
  | 'back'
  | 'compose'
  | 'edit'
  | 'lock'
  | 'eye'
  | 'eyeOff'
  | 'phone'
  | 'chevronDown'
  | 'chevronRight'
  | 'send'
  | 'user'
  | 'idCard'
  | 'eyeStatus'
  | 'moon'
  | 'logout'
  | 'check'
  | 'checkCheck'
  | 'smile'
  | 'paperclip'
  | 'mic'
  | 'userPlus'
  | 'alert'
  | 'arrowRight'
  | 'video'
  | 'more'
  | 'image'
  | 'key'
  | 'globe'
  | 'info'
  | 'pin'
  | 'trash';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
  style?: StyleProp<ViewStyle>;
}

export interface IconBadgeProps {
  name: IconName;
  size?: number;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  strokeWidth?: number;
  fill?: string;
  style?: StyleProp<ViewStyle>;
}
