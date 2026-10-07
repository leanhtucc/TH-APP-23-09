import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DailyWeather, HourlyWeather } from './weather';

export type RootStackParamList = {
  Home: undefined;
  Detail:
    | { type: 'hour'; item: HourlyWeather; city: string }
    | { type: 'day'; item: DailyWeather; city: string };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
