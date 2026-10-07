import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/app';
import { WeatherThemeProvider, useWeatherTheme } from './src/context/WeatherThemeContext';

function ThemedStatusBar(): React.JSX.Element {
  const { theme } = useWeatherTheme();
  return (
    <StatusBar
      barStyle={theme.statusBarStyle}
    />
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.container}>
      <WeatherThemeProvider>
        <ThemedStatusBar />
        <AppNavigator />
      </WeatherThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
