import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { ChatProvider } from '../context/ChatContext';

import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import ChatScreen from '../screens/chat';
import MainTabNavigator from '../navigation/MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { user, ready } = useAuth();
  const { isDark, colors } = useTheme();

  // Chờ đọc xong phiên đăng nhập đã lưu để chọn đúng màn hình đầu tiên
  if (!ready) {
    return null;
  }

  const base = isDark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer
      theme={{
        ...base,
        colors: {
          ...base.colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.textPrimary,
          border: colors.border,
        },
      }}
    >
      <Stack.Navigator
        initialRouteName={user ? 'Main' : 'Login'}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const AppNavigator: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <ChatProvider>
        <RootNavigator />
      </ChatProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppNavigator;
