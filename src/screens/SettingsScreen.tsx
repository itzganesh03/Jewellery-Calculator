import { ScrollView, StyleSheet } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings } from '../types';

export function SettingsScreen({ settings, update }: { settings: Settings; update: (patch: Partial<Settings>) => Promise<void> }) {
  return <SafeAreaView style={styles.safe} edges={['top', 'right', 'left']}><ScrollView contentContainerStyle={styles.root}>
    <Text variant="headlineSmall" style={styles.title}>Settings</Text>
    <List.Section>
      <List.Subheader>Appearance</List.Subheader>
      <List.Item title="Dark mode" description="Use the Shraddha Jewellers dark theme" left={p => <List.Icon {...p} icon="theme-light-dark" />} right={() => <Switch value={settings.isDarkMode} onValueChange={isDarkMode => update({ isDarkMode })} />} />
    </List.Section>
    <List.Section>
      <List.Subheader>Currency</List.Subheader>
      <List.Item title="Currency" description="Indian Rupee (INR)" left={p => <List.Icon {...p} icon="currency-inr" />} />
    </List.Section>
    <List.Section>
      <List.Subheader>About</List.Subheader>
      <List.Item title="Shraddha Jewellers Rate Calculator" description="Version 1.0.0 · Built by Dgonix.com" left={p => <List.Icon {...p} icon="information-outline" />} />
      <List.Item title="Privacy policy" description="Your calculations stay on this device" left={p => <List.Icon {...p} icon="shield-check-outline" />} />
    </List.Section>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1 }, root: { padding: 16 }, title: { fontWeight: '800', marginBottom: 10 } });
