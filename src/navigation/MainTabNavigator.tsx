import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainTabParamList } from '../types/navigation';
import { conversations, notifications } from '../data/mockData';
import { Colors, FontSize, FontWeight, Radius, Shadow } from '../theme';
import { Icon } from '../components/Icon';
import { IconName } from '../components/Icon/types';

import HomeScreen from '../screens/home';
import ContactsScreen from '../screens/contacts';
import NotificationsScreen from '../screens/notifications';
import SettingsScreen from '../screens/settings';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabIconProps {
  name: IconName;
  focused: boolean;
  badge?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, badge }) => (
  <View style={[styles.pill, focused && styles.pillActive]} pointerEvents="none">
    <Icon
      name={name}
      size={22}
      color={focused ? Colors.primary : Colors.textMuted}
      strokeWidth={focused ? 2.4 : 1.8}
    />
    {badge !== undefined && badge > 0 ? (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
      </View>
    ) : null}
  </View>
);

export const MainTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const unreadMessages = conversations.reduce((sum, c) => sum + c.unread, 0);
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const renderHomeIcon = useCallback(
    ({ focused }: { focused: boolean }) => (
      <TabIcon name="messages" focused={focused} badge={unreadMessages} />
    ),
    [unreadMessages]
  );

  const renderContactsIcon = useCallback(
    ({ focused }: { focused: boolean }) => (
      <TabIcon name="contacts" focused={focused} />
    ),
    []
  );

  const renderNotifsIcon = useCallback(
    ({ focused }: { focused: boolean }) => (
      <TabIcon name="notifications" focused={focused} badge={unreadNotifs} />
    ),
    [unreadNotifs]
  );

  const renderSettingsIcon = useCallback(
    ({ focused }: { focused: boolean }) => (
      <TabIcon name="settings" focused={focused} />
    ),
    []
  );

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.borderLight,
          height: 64 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          ...Shadow.md,
        },
        tabBarLabelStyle: {
          fontSize: FontSize.xs,
          fontWeight: FontWeight.semibold,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Tin nhắn',
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tab.Screen
        name="ContactsTab"
        component={ContactsScreen}
        options={{
          title: 'Danh bạ',
          tabBarIcon: renderContactsIcon,
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          title: 'Thông báo',
          tabBarIcon: renderNotifsIcon,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: 'Cài đặt',
          tabBarIcon: renderSettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  pill: {
    width: 48,
    height: 30,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pillActive: {
    backgroundColor: Colors.primaryLight,
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: 2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.danger,
    borderWidth: 1.5,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: FontWeight.bold,
  },
});

export default MainTabNavigator;
