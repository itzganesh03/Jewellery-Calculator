import { ScrollView, StyleSheet } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings } from '../types';
import { CurrencyInrIcon, InfoOutlineIcon, ShieldCheckOutlineIcon, ThemeLightDarkIcon } from '../components/SvgIcons';

export function SettingsScreen({ settings, update }: { settings: Settings; update: (patch: Partial<Settings>) => Promise<void> }) {
  return <SafeAreaView style={styles.safe} edges={['top', 'right', 'left']}><ScrollView contentContainerStyle={styles.root}>
    <Text variant="headlineSmall" style={styles.title}>Settings</Text>
    <List.Section>
      <List.Subheader>Appearance</List.Subheader>
      <List.Item title="Dark mode" description="Use the Shraddha Jewellers dark theme" left={props => <ThemeLightDarkIcon size={24} color={props.color} />} right={() => <Switch value={settings.isDarkMode} onValueChange={isDarkMode => update({ isDarkMode })} />} />
    </List.Section>
    <List.Section>
      <List.Subheader>Currency</List.Subheader>
      <List.Item title="Currency" description="Indian Rupee (INR)" left={props => <CurrencyInrIcon size={24} color={props.color} />} />
    </List.Section>
    <List.Section>
      <List.Subheader>About</List.Subheader>
      <List.Item title="Shraddha Jewellers Rate Calculator" description="Version 1.0.0 · Built by Dgonix.com" left={props => <InfoOutlineIcon size={24} color={props.color} />} />
      <List.Item title="Privacy policy" description="Your calculations stay on this device" left={props => <ShieldCheckOutlineIcon size={24} color={props.color} />} />
    </List.Section>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1 }, root: { padding: 16 }, title: { fontWeight: '800', marginBottom: 10 } });
