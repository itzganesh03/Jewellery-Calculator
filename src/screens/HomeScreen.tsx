import { useState } from 'react';
import { ScrollView, StyleSheet, View, Modal, useWindowDimensions, Pressable, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { Chip, IconButton, Menu, RadioButton, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '../components/AnimatedButton';
import { CalculationBreakdown } from '../components/CalculationBreakdown';
import { FadeInCard } from '../components/FadeInCard';
import { NumberField } from '../components/Field';
import { CalculatorIcon, CheckboxIcon, DiamondIcon, GoldIcon, SilverIcon, PencilIcon, CloseIcon } from '../components/SvgIcons';
import { PURITY_LABELS } from '../constants';
import { useRates } from '../hooks/useRates';
import { useSettings } from '../hooks/useSettings';
import { storage } from '../storage/storage';
import { CalculationResult, Metal, Purity } from '../types';
import { calculateJewellery, dateTime, money } from '../utils/calculation';

interface FormValues { weight: string; makingPercent: string; makingChargeType: 'percent' | 'fixedRate'; hallmark: string; stone: string; rhodium: string; }
const defaultValues: FormValues = { weight: '', makingPercent: '', makingChargeType: 'percent', hallmark: '0', stone: '0', rhodium: '0' };
export function HomeScreen() {
  const theme = useTheme();
  const { settings, update } = useSettings();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 360;
  const [metal, setMetal] = useState<Metal>('gold');
  const [purity, setPurity] = useState<Purity>('gold22');
  const [result, setResult] = useState<CalculationResult>();
  const [editing, setEditing] = useState(false);
  const [draftRates, setDraftRates] = useState<Partial<Record<Purity, number>>>({});
  const [draftGstRate, setDraftGstRate] = useState(String(settings.gstRate));
  const [makingMenuVisible, setMakingMenuVisible] = useState(false);
  const { rates, loading, updateRates } = useRates();
  const { control, handleSubmit, reset, watch, setValue } = useForm<FormValues>({ defaultValues });
  const makingChargeType = watch('makingChargeType');
  const choices: Purity[] = metal === 'gold' ? ['gold22', 'gold18'] : ['silver90', 'silver925'];
  const selectMetal = (next: Metal) => { setMetal(next); setPurity(next === 'gold' ? 'gold22' : 'silver90'); setResult(undefined); };
  const onCalculate = handleSubmit(async values => { Keyboard.dismiss(); const weight = Number(values.weight); if (!weight || weight <= 0) return; const next = calculateJewellery({ metal, purity, weight, makingPercent: Number(values.makingPercent || 0), makingChargeType: values.makingChargeType, hallmark: Number(values.hallmark || 0), stone: Number(values.stone || 0), rhodium: Number(values.rhodium || 0), rate: rates[purity], gstEnabled: settings.gstEnabled, gstRate: settings.gstRate }); setResult(next); const history = await storage.getHistory(); await storage.saveHistory([next, ...history].slice(0, 100)); });
  const rate = rates[purity];
  const displayRate = rate ? money(rate) : undefined;
  const unit = '/gm';
  const openEdit = () => {
    setDraftRates({
      gold22: rates.gold22,
      gold18: rates.gold18,
      silver90: rates.silver90,
      silver925: rates.silver925,
    });
    setDraftGstRate(String(settings.gstRate));
    setEditing(true);
  };
  const closeEdit = () => setEditing(false);
  const saveEdit = async () => {
    await updateRates(draftRates as Partial<Omit<typeof rates, 'updatedAt'>>);
    const gstRateValue = Number(draftGstRate);
    if (!isNaN(gstRateValue) && gstRateValue > 0) {
      await update({ gstRate: gstRateValue });
    }
    setEditing(false);
  };
  const toggleGst = async () => {
    await update({ gstEnabled: !settings.gstEnabled });
    setResult(undefined);
  };
  const horizontalPadding = isSmallScreen ? 12 : 16;
  const cardRadius = isSmallScreen ? 14 : 16;
  return <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'right', 'left']}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding, paddingBottom: 32 + 16 }]} showsVerticalScrollIndicator={false}><View style={styles.hero}><View style={styles.heroText}><Text variant="headlineSmall" style={styles.title}>Swastik Gold{`\n`}</Text><Text variant="bodyMedium" style={styles.heroSub}>By Shraddha Group</Text><Text variant="bodyMedium" style={styles.heroSubLine2}>Jewellery Rate Calculator</Text><Text variant="bodySmall" style={styles.heroCaption}>A Dgonix solution</Text></View><View style={styles.heroIcon}><DiamondIcon color="#3A0D1C" size={isSmallScreen ? 26 : 30}/></View></View>
    <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><View style={styles.cardPad}><Text variant="titleMedium">Select metal</Text><View style={styles.metalRow}>{(['gold', 'silver'] as Metal[]).map(item => <Chip key={item} selected={metal === item} onPress={() => selectMetal(item)} showSelectedCheck icon={({ size, color }) => item === 'gold' ? <GoldIcon size={size ?? 18} color={color} /> : <SilverIcon size={size ?? 18} color={color} />} style={styles.chip}>{item === 'gold' ? 'Gold' : 'Silver'}</Chip>)}</View><RadioButton.Group value={purity} onValueChange={v => { setPurity(v as Purity); setResult(undefined); }}>{choices.map(item => <RadioButton.Item key={item} value={item} label={PURITY_LABELS[item]} position="leading" style={styles.radio}/>)}</RadioButton.Group></View></FadeInCard>
    {purity !== 'silver925' && <FadeInCard style={[styles.rateCard, { borderRadius: cardRadius, borderWidth: 1, borderColor: '#C9A22755' }]}><View style={styles.cardPad}>{loading ? <Text>Loading rates...</Text> : <><View style={styles.rateHeader}><View style={styles.rateContent}><Text variant="labelLarge">MANUAL RATE</Text><Text variant="headlineSmall" numberOfLines={1} adjustsFontSizeToFit style={{ color: theme.colors.primary }}>{displayRate ? `${displayRate} ${unit}` : 'Rate unavailable'}</Text><Text variant="bodySmall" numberOfLines={1}>{PURITY_LABELS[purity]} · per gram</Text></View><IconButton icon={({ size, color }) => <PencilIcon size={size ?? 20} color={color} />} mode="contained-tonal" size={20} onPress={openEdit} accessibilityLabel="Edit rate" /></View><Text variant="bodySmall" style={styles.updated}>Last updated {dateTime(rates.updatedAt)}</Text></>}</View></FadeInCard>}
    <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><View style={styles.cardPad}><Text variant="titleMedium" style={styles.sectionTitle}>Jewellery details</Text><NumberField control={control} name="weight" label="Weight (grams)" suffix="gm" /><View style={styles.makingFieldWrap}><Menu visible={makingMenuVisible} onDismiss={() => setMakingMenuVisible(false)} anchor={<Pressable onPress={() => setMakingMenuVisible(true)} style={styles.makingTypeButton}><View><Text variant="labelSmall" style={styles.makingTypeLabel}>Making type</Text><Text variant="bodyMedium" style={styles.makingTypeValue}>{makingChargeType === 'percent' ? 'Percentage (%)' : 'Fixed Rate (₹)'}</Text></View><Text style={styles.makingTypeChevron}>▾</Text></Pressable>}><Menu.Item onPress={() => { setValue('makingChargeType', 'percent'); setMakingMenuVisible(false); }} title="Percentage (%)" /><Menu.Item onPress={() => { setValue('makingChargeType', 'fixedRate'); setMakingMenuVisible(false); }} title="Fixed Rate (₹)" /></Menu></View><NumberField control={control} name="makingPercent" label="Making Charges" suffix={makingChargeType === 'percent' ? '%' : '₹'} /><NumberField control={control} name="hallmark" label="Hallmark Charges" suffix="₹" /><NumberField control={control} name="stone" label="Stone Charges" suffix="₹" /><NumberField control={control} name="rhodium" label="Rhodium Charges" suffix="₹" /><Pressable onPress={() => { void toggleGst(); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8, paddingVertical: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#C9A22755', borderRadius: 14, backgroundColor: '#fff9f1' }}><CheckboxIcon checked={settings.gstEnabled} color={settings.gstEnabled ? theme.colors.primary : theme.colors.outline} size={24} /><View style={{ flex: 1, minWidth: 0 }}><Text variant="bodyMedium" style={{ fontWeight: '700' }}>Enable GST</Text><Text variant="bodySmall" style={{ opacity: .7, marginTop: 2 }}>{settings.gstRate}% added to the calculation</Text></View><Text variant="bodySmall" style={{ fontWeight: '800' }}>{settings.gstEnabled ? 'On' : 'Off'}</Text></Pressable><View style={styles.actions}><AnimatedButton mode="contained" icon={({ size, color }) => <CalculatorIcon size={size ?? 20} color={color} />} onPress={onCalculate} style={styles.calculate}>Calculate</AnimatedButton><AnimatedButton mode="outlined" onPress={() => { reset(defaultValues); setResult(undefined); }}>Reset</AnimatedButton></View></View></FadeInCard>
    {result && <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><Text variant="titleMedium" style={styles.resultTitle}>Calculation summary</Text><CalculationBreakdown result={result}/></FadeInCard>}
    <Modal visible={editing} animationType="slide" presentationStyle="pageSheet" onRequestClose={closeEdit}><View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}><View style={styles.modalHeader}><Text variant="titleLarge" style={styles.modalTitle}>Edit Rates (per gram)</Text><IconButton icon={({ size, color }) => <CloseIcon size={size ?? 24} color={color} />} onPress={closeEdit} /></View><ScrollView style={styles.modalBody}>{(['gold22', 'gold18', 'silver90', 'silver925'] as Purity[]).map(item => <RateInput key={item} label={PURITY_LABELS[item]} value={draftRates[item] ?? 0} onChange={(value) => { setDraftRates(prev => ({ ...prev, [item]: value })); }} />)}<Text variant="titleSmall" style={styles.gstRateLabel}>GST Rate (%)</Text><TextInput value={draftGstRate} onChangeText={setDraftGstRate} keyboardType="decimal-pad" mode="outlined" style={styles.gstRateInput} right={<TextInput.Affix text="%" />} onEndEditing={() => { const parsed = Number(draftGstRate); if (!isNaN(parsed) && parsed > 0) { void update({ gstRate: parsed }); } }} /><View style={styles.modalActions}><AnimatedButton mode="outlined" onPress={closeEdit} style={styles.modalActionButton}>Cancel</AnimatedButton><AnimatedButton mode="contained" onPress={() => { void saveEdit(); }} style={styles.modalActionButton}>Save</AnimatedButton></View></ScrollView></View></Modal>
  </ScrollView></SafeAreaView>; }

function RateInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const [text, setText] = useState(String(value));
  return <View style={styles.rateInputRow}><Text variant="bodyMedium" style={styles.rateInputLabel}>{label}</Text><TextInput value={text} onChangeText={setText} keyboardType="decimal-pad" mode="outlined" style={styles.rateInput} right={<TextInput.Affix text="₹/gm" />} onEndEditing={() => { const parsed = Number(text); if (!isNaN(parsed) && parsed > 0) { onChange(parsed); } }} /></View>;
}

  const styles = StyleSheet.create({ safe: { flex: 1 }, content: { gap: 14 }, hero: { minHeight: 120, padding: 18, borderRadius: 22, backgroundColor: '#3A0D1C', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }, heroText: { flex: 1, minWidth: 0 }, title: { fontWeight: '800', color: '#FFFFFF', fontSize: 22, lineHeight: 28 }, heroSub: { color: '#F2D29B', marginTop: 3, fontSize: 14, lineHeight: 20 }, heroSubLine2: { color: '#F2D29B', fontSize: 14, lineHeight: 20, marginTop: 1 }, heroCaption: { color: '#F3E6D6', opacity: .72, marginTop: 4, fontSize: 12, lineHeight: 16 }, heroIcon: { width: 58, height: 58, borderRadius: 18, backgroundColor: '#D8AB5F', justifyContent: 'center', alignItems: 'center', elevation: 4 }, card: { borderRadius: 16, overflow: 'hidden' }, rateCard: { borderRadius: 16, overflow: 'hidden' }, cardPad: { padding: 16 }, metalRow: { flexDirection: 'row', gap: 10, marginVertical: 10 }, chip: { flex: 1, borderWidth: 1.5 }, radio: { paddingVertical: 1 }, rateHeader: { flexDirection: 'row', alignItems: 'center', gap: 4 }, rateContent: { flex: 1, minWidth: 0 }, updated: { marginTop: 14, opacity: .65 }, sectionTitle: { marginBottom: 15 }, makingFieldWrap: { marginBottom: 12 }, makingTypeButton: { borderWidth: 1, borderColor: '#C9A22755', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff9f1', marginBottom: 12 }, makingTypeLabel: { opacity: .65 }, makingTypeValue: { fontWeight: '700', marginTop: 2 }, makingTypeChevron: { fontSize: 18, opacity: .7, paddingLeft: 8 }, actions: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end', marginTop: 6 }, calculate: { flex: 1 }, resultTitle: { paddingHorizontal: 16, paddingTop: 16 }, modalContent: { flex: 1 }, modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#00000010' }, modalTitle: { fontWeight: '800' }, modalBody: { flex: 1, padding: 16 }, modalActions: { flexDirection: 'row', gap: 12, paddingTop: 8 }, modalActionButton: { flex: 1 }, rateInputRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }, rateInputLabel: { flex: 1 }, rateInput: { flex: 2 }, gstRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#00000010' }, gstRateLabel: { marginTop: 16, marginBottom: 8 }, gstRateInput: { marginBottom: 16 } });
