import { IconName } from '../../components/Icon/types';

export interface SettingSwitchRowProps {
  icon: IconName;
  iconBgColor?: string;
  iconColor?: string;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}

export interface InfoRowProps {
  icon: IconName;
  iconBgColor?: string;
  iconColor?: string;
  label: string;
  value: string;
}

export interface NavRowProps {
  icon: IconName;
  iconBgColor?: string;
  iconColor?: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}
