import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { HomeScreen } from '../screens/HomeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Rates, Settings } from '../types';
import { CalculatorIcon, HistoryIcon, SettingsIcon } from '../components/SvgIcons';

const Tab = createBottomTabNavigator();

export function RootNavigator({ settings, update, rates, updateRates }: { settings: Settings; update: (patch: Partial<Settings>) => Promise<void>; rates: Rates; updateRates: (patch: Partial<Omit<Rates, 'updatedAt'>>) => Promise<Rates> }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      animation: 'fade',
      tabBarActiveTintColor: theme.colors.primary,
      tabBarStyle: { paddingBottom: insets.bottom, height: 56 + insets.bottom },
      tabBarIcon: ({ color, size }) => {
        const iconSize = size ?? 24;
        if (route.name === 'Calculator') return <CalculatorIcon size={iconSize} color={color} />;
        if (route.name === 'History') return <HistoryIcon size={iconSize} color={color} />;
        return <SettingsIcon size={iconSize} color={color} />;
      },
    })}>
      <Tab.Screen name="Calculator">
        {() => <HomeScreen settings={settings} rates={rates} />}
      </Tab.Screen>
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings">
        {() => <SettingsScreen settings={settings} update={update} rates={rates} updateRates={updateRates} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
