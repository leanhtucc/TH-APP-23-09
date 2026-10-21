// src/components/CardNotification/types.ts
import { Notification } from '../../data/mockData';

export interface CardNotificationProps {
  notification: Notification;
  onPress: (id: string) => void;
}
