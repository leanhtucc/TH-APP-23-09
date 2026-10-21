import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../types/navigation';

import HomeScreen from '../screens/home';
import ContactsScreen from '../screens/contacts';
import NotificationsScreen from '../screens/notifications';
import SettingsScreen from '../screens/settings';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Dùng emoji icon — không cần cài thêm thư viện
const TabIcon = ({ emoji, color }: { emoji: string; color: string }) => (
  <Text style={{ fontSize: 20, color }}>{emoji}</Text>
);

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0068ff',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: '#0068ff' },
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Tin nhắn',
          tabBarIcon: ({ color }) => <TabIcon emoji="💬" color={color} />,
        }}
      />
      <Tab.Screen
        name="ContactsTab"
        component={ContactsScreen}
        options={{
          title: 'Danh bạ',
          tabBarIcon: ({ color }) => <TabIcon emoji="👥" color={color} />,
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          title: 'Thông báo',
          tabBarIcon: ({ color }) => <TabIcon emoji="🔔" color={color} />,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color }) => <TabIcon emoji="⚙️" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
