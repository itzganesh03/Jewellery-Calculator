import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, Switch, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PURITY_LABELS } from '../constants';
import { Rates, Settings } from '../types';
import { CurrencyInrIcon, InfoOutlineIcon, SaveIcon, ShieldCheckOutlineIcon, ThemeLightDarkIcon } from '../components/SvgIcons';

export function SettingsScreen({ settings, update, rates, updateRates }: { settings: Settings; update: (patch: Partial<Settings>) => Promise<void>; rates: Rates; updateRates: (patch: Partial<Omit<Rates, 'updatedAt'>>) => Promise<Rates> }) {
  const [draftRates, setDraftRates] = useState<Record<string, string>>({
    gold22: String(rates.gold22),
    gold18: String(rates.gold18),
    silver90: String(rates.silver90),
    silver925: String(rates.silver925),
  });
  const [draftGstRate, setDraftGstRate] = useState(String(settings.gstRate));

  const saveRates = async () => {
    const next = {
      gold22: Number(draftRates.gold22) || 0,
      gold18: Number(draftRates.gold18) || 0,
      silver90: Number(draftRates.silver90) || 0,
      silver925: Number(draftRates.silver925) || 0,
    };
    await updateRates(next);
    const gstRateValue = Number(draftGstRate);
    if (!isNaN(gstRateValue) && gstRateValue > 0) {
      await update({ gstRate: gstRateValue });
    }
  };

  return <SafeAreaView style={styles.safe} edges={['top', 'right', 'left']}><ScrollView contentContainerStyle={styles.root}>
    <Text variant="headlineSmall" style={styles.title}>Settings</Text>
    <List.Section>
      <List.Subheader>Appearance</List.Subheader>
      <List.Item title="Dark mode" description="Use the Swastik Gold dark theme" left={props => <ThemeLightDarkIcon size={24} color={props.color} />} right={() => <Switch value={settings.isDarkMode} onValueChange={isDarkMode => update({ isDarkMode })} />} />
    </List.Section>
    <List.Section>
      <List.Subheader>Manual Rates (per gram)</List.Subheader>
      <View style={styles.rateSection}>
        {(Object.keys(PURITY_LABELS) as Array<keyof typeof PURITY_LABELS>).map(key => (
          <View key={key} style={styles.rateRow}>
            <Text variant="bodyMedium" style={styles.rateLabel}>{PURITY_LABELS[key]}</Text>
            <TextInput
              value={draftRates[key]}
              onChangeText={text => setDraftRates(prev => ({ ...prev, [key]: text }))}
              keyboardType="decimal-pad"
              mode="outlined"
              dense
              style={styles.rateInput}
              right={<TextInput.Affix text="₹/gm" />}
            />
          </View>
        ))}
      </View>
      <List.Item title="Save rates" description="Update all manual rates" left={props => <SaveIcon size={24} color={props.color} />} onPress={saveRates} />
    </List.Section>
    <List.Section>
      <List.Subheader>GST</List.Subheader>
      <View style={styles.gstSection}>
        <View style={styles.gstRow}>
          <Text variant="bodyMedium" style={styles.gstLabel}>Enable GST</Text>
          <Switch value={settings.gstEnabled} onValueChange={gstEnabled => update({ gstEnabled })} />
        </View>
        <TextInput
          value={draftGstRate}
          onChangeText={setDraftGstRate}
          keyboardType="decimal-pad"
          mode="outlined"
          dense
          label="GST Rate (%)"
          right={<TextInput.Affix text="%" />}
          style={styles.gstInput}
        />
      </View>
    </List.Section>
    <List.Section>
      <List.Subheader>Currency</List.Subheader>
      <List.Item title="Currency" description="Indian Rupee (INR)" left={props => <CurrencyInrIcon size={24} color={props.color} />} />
    </List.Section>
    <List.Section>
      <List.Subheader>About</List.Subheader>
      <List.Item title="Swastik Gold Rate Calculator" description="Version 1.0.0 · Built by Dgonix.com" left={props => <InfoOutlineIcon size={24} color={props.color} />} />
      <List.Item title="Privacy policy" description="Your calculations stay on this device" left={props => <ShieldCheckOutlineIcon size={24} color={props.color} />} />
    </List.Section>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1 }, root: { padding: 16 }, title: { fontWeight: '800', marginBottom: 10 }, rateSection: { paddingHorizontal: 16, paddingVertical: 8 }, rateRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }, rateLabel: { flex: 1, minWidth: 0 }, rateInput: { flex: 2, minWidth: 0 }, gstSection: { paddingHorizontal: 16, paddingVertical: 8 }, gstRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }, gstLabel: { fontWeight: '700' }, gstInput: { marginBottom: 8 } });
