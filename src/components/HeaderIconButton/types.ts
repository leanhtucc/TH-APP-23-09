import { StyleProp, ViewStyle } from 'react-native';
import { IconName } from '../Icon/types';

export interface HeaderIconButtonProps {
  icon: IconName;
  onPress: () => void;
  size?: number;
  iconSize?: number;
  iconColor?: string;
  badge?: number;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}
