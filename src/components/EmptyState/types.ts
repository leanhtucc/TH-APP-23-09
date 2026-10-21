import { StyleProp, ViewStyle } from 'react-native';
import { IconName } from '../Icon/types';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  subtitle?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}
