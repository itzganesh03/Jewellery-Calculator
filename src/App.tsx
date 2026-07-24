import { useCallback, useState } from 'react';
import { NavigationContainer, DefaultTheme as NavigationLight, DarkTheme as NavigationDark } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './navigation/RootNavigator';
import { SplashScreen } from './screens/SplashScreen';
import { createTheme } from './theme';
import { useSettings } from './hooks/useSettings';
const client = new QueryClient();
export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const { settings, update } = useSettings();
  const theme = createTheme(settings.isDarkMode);
  const finishSplash = useCallback(() => setSplashDone(true), []);
  return <SafeAreaProvider><QueryClientProvider client={client}><PaperProvider theme={theme}><NavigationContainer theme={settings.isDarkMode ? NavigationDark : NavigationLight}><StatusBar style={settings.isDarkMode ? 'light' : 'dark'}/>{splashDone ? <RootNavigator settings={settings} update={update}/> : <SplashScreen onDone={finishSplash}/>}</NavigationContainer></PaperProvider></QueryClientProvider></SafeAreaProvider>;
}
