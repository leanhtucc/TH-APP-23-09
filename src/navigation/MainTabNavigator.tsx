import React, { useEffect, useMemo, useState } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Text } from '../components/Typography';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainTabParamList } from '../types/navigation';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeColors, FontSize, FontWeight } from '../theme';
import { Icon } from '../components/Icon';
import { IconName } from '../components/Icon/types';

import HomeScreen from '../screens/home';
import ContactsScreen from '../screens/contacts';
import NotificationsScreen from '../screens/notifications';
import SettingsScreen from '../screens/settings';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_META: Record<keyof MainTabParamList, { icon: IconName; label: string }> = {
  HomeTab: { icon: 'messages', label: 'Tin nhắn' },
  ContactsTab: { icon: 'contacts', label: 'Danh bạ' },
  NotificationsTab: { icon: 'notifications', label: 'Thông báo' },
  SettingsTab: { icon: 'settings', label: 'Cài đặt' },
};

// Thanh tab nổi theo design: tab đang chọn là viên thuốc xanh có chữ
const FloatingTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { totalUnread, unreadNotifications } = useChat();
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardShown(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardShown(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  if (keyboardShown) return null;

  const badgeFor = (name: string) =>
    name === 'HomeTab' ? totalUnread : name === 'NotificationsTab' ? unreadNotifications : 0;

  return (
    <View style={[styles.bar, { bottom: Math.max(insets.bottom, 12) + 4 }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const meta = TAB_META[route.name as keyof MainTabParamList];
        const badge = badgeFor(route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.item, focused ? styles.itemActive : styles.itemIdle]}
            onPress={onPress}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={meta.label}
            accessibilityState={{ selected: focused }}
          >
            <Icon
              name={meta.icon}
              size={22}
              color={focused ? colors.white : colors.textSecondary}
              strokeWidth={2.2}
            />
            {focused && (
              <Text style={styles.label} numberOfLines={1}>
                {meta.label}
              </Text>
            )}
            {badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const renderTabBar = (props: BottomTabBarProps) => <FloatingTabBar {...props} />;

export const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="HomeTab"
    tabBar={renderTabBar}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Tin nhắn' }} />
    <Tab.Screen name="ContactsTab" component={ContactsScreen} options={{ title: 'Danh bạ' }} />
    <Tab.Screen
      name="NotificationsTab"
      component={NotificationsScreen}
      options={{ title: 'Thông báo' }}
    />
    <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Cài đặt' }} />
  </Tab.Navigator>
);

const createStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    bar: {
      position: 'absolute',
      left: 16,
      right: 16,
      height: 68,
      borderRadius: 28,
      backgroundColor: Colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      gap: 4,
      elevation: 12,
      shadowColor: '#101828',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.16,
      shadowRadius: 24,
    },
    item: {
      height: 48,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    itemActive: {
      flex: 2.2,
      backgroundColor: Colors.primary,
    },
    itemIdle: {
      flex: 1,
    },
    label: {
      color: Colors.white,
      fontSize: 13,
      fontWeight: FontWeight.bold,
    },
    badge: {
      position: 'absolute',
      top: 2,
      right: 6,
      minWidth: 18,
      height: 18,
      paddingHorizontal: 4,
      borderRadius: 9,
      backgroundColor: Colors.danger,
      borderWidth: 1.5,
      borderColor: Colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      color: Colors.white,
      fontSize: FontSize.xs - 1,
      fontWeight: FontWeight.bold,
    },
  });

export default MainTabNavigator;
