import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { AuthProvider } from '../context/AuthContext';
import StudentHomeScreen from '../screens/StudentHomeScreen';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import LogoutScreen from '../screens/logout';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StudentHome"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0068ff',
            },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            contentStyle: {
              backgroundColor: '#f4f5f7',
            },
          }}
        >
          <Stack.Screen
            name="StudentHome"
            component={StudentHomeScreen}
            options={{
              title: 'Quản lý sinh viên',
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Trang chủ',
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Đăng nhập',
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'Tạo tài khoản',
            }}
          />
          <Stack.Screen
            name="Logout"
            component={LogoutScreen}
            options={{
              title: 'Cá nhân',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
