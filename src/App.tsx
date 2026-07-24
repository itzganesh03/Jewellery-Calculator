import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme as NavigationLight, DarkTheme as NavigationDark } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './navigation/RootNavigator';
import { SplashScreen } from './screens/SplashScreen';
import { createTheme } from './theme';
import { useSettings } from './hooks/useSettings';
import { useRates } from './hooks/useRates';
const client = new QueryClient();
export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [ready, setReady] = useState(false);
  const { settings, update } = useSettings();
  const { rates, updateRates } = useRates();
  const theme = createTheme(settings.isDarkMode);
  const finishSplash = useCallback(() => setSplashDone(true), []);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  if (!ready || !splashDone) return <SplashScreen onDone={finishSplash} />;
  return <SafeAreaProvider><QueryClientProvider client={client}><PaperProvider theme={theme}><NavigationContainer theme={settings.isDarkMode ? NavigationDark : NavigationLight}><StatusBar style={settings.isDarkMode ? 'light' : 'dark'}/><RootNavigator settings={settings} update={update} rates={rates} updateRates={updateRates}/></NavigationContainer></PaperProvider></QueryClientProvider></SafeAreaProvider>;
}
