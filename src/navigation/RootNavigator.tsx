import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { HomeScreen } from '../screens/HomeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Settings } from '../types';

const Tab = createBottomTabNavigator();
const icons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = { Calculator: 'calculator-variant-outline', History: 'history', Settings: 'cog-outline' };

export function RootNavigator({ settings, update }: { settings: Settings; update: (patch: Partial<Settings>) => Promise<void> }) {
  const theme = useTheme();
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      animation: 'fade',
      tabBarActiveTintColor: theme.colors.primary,
      tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={icons[route.name]} color={color} size={size} />,
    })}>
      <Tab.Screen name="Calculator" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings">
        {() => <SettingsScreen settings={settings} update={update} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
