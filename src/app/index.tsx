import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { AuthProvider } from '../context/AuthContext';

import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import ChatScreen from '../screens/chat';
import MainTabNavigator from '../navigation/MainTabNavigator';

// Các màn hình cũ vẫn giữ để không mất code
import TH1 from '../screens/TH1';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#0068ff' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            contentStyle: { backgroundColor: '#f4f5f7' },
          }}
        >
          {/* Auth screens */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Đăng nhập', headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Tạo tài khoản' }}
          />

          {/* Main app — Bottom Tabs */}
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />

          {/* Chat screen nằm ngoài tab để có header riêng */}
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ title: 'Chat' }}
          />

          {/* Màn hình cũ giữ lại */}
          <Stack.Screen
            name="TH1"
            component={TH1}
            options={{ title: 'Hồ sơ' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
