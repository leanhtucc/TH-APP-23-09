import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type HomeFilterTab = 'all' | 'unread';

export interface HomeScreenProps {}
