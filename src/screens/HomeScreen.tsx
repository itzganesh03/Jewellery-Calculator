import { useState } from 'react';
import { ScrollView, StyleSheet, View, Modal, useWindowDimensions } from 'react-native';
import { useForm } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Chip, IconButton, Menu, RadioButton, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '../components/AnimatedButton';
import { CalculationBreakdown } from '../components/CalculationBreakdown';
import { FadeInCard } from '../components/FadeInCard';
import { NumberField } from '../components/Field';
import { PURITY_LABELS } from '../constants';
import { useRates } from '../hooks/useRates';
import { storage } from '../storage/storage';
import { CalculationResult, Metal, Purity } from '../types';
import { calculateJewellery, dateTime, money } from '../utils/calculation';

interface FormValues { weight: string; makingPercent: string; makingChargeType: 'percent' | 'fixedRate'; hallmark: string; stone: string; rhodium: string; }
const defaultValues: FormValues = { weight: '', makingPercent: '', makingChargeType: 'percent', hallmark: '0', stone: '0', rhodium: '0' };
export function HomeScreen() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 360;
  const [metal, setMetal] = useState<Metal>('gold');
  const [purity, setPurity] = useState<Purity>('gold22');
  const [result, setResult] = useState<CalculationResult>();
  const [editing, setEditing] = useState(false);
  const [makingMenuVisible, setMakingMenuVisible] = useState(false);
  const { rates, loading, updateRates } = useRates();
  const { control, handleSubmit, reset, watch, setValue } = useForm<FormValues>({ defaultValues });
  const makingChargeType = watch('makingChargeType');
  const choices: Purity[] = metal === 'gold' ? ['gold22', 'gold18'] : ['silver90', 'silver925'];
  const selectMetal = (next: Metal) => { setMetal(next); setPurity(next === 'gold' ? 'gold22' : 'silver90'); setResult(undefined); };
  const onCalculate = handleSubmit(async values => { const weight = Number(values.weight); if (!weight || weight <= 0) return; const next = calculateJewellery({ metal, purity, weight, makingPercent: Number(values.makingPercent || 0), makingChargeType: values.makingChargeType, hallmark: Number(values.hallmark || 0), stone: Number(values.stone || 0), rhodium: Number(values.rhodium || 0), rate: rates[purity] }); setResult(next); const history = await storage.getHistory(); await storage.saveHistory([next, ...history].slice(0, 100)); });
  const rate = rates[purity];
  const displayRate = rate ? money(rate) : undefined;
  const unit = '/gm';
  const openEdit = () => setEditing(true);
  const closeEdit = () => setEditing(false);
  const saveEdit = async (patch: Partial<Record<Purity, number>>) => {
    await updateRates(patch);
    setEditing(false);
  };
  const horizontalPadding = isSmallScreen ? 12 : 16;
  const cardRadius = isSmallScreen ? 14 : 16;
  return <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'right', 'left']}><ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding, paddingBottom: 32 + 16 }]} showsVerticalScrollIndicator={false}><View style={styles.hero}><View><Text variant="headlineSmall" style={styles.title}>Swastik{`\n`}Jewellers</Text><Text variant="bodyMedium" style={styles.heroSub}>Jewellery Rate Calculator</Text><Text variant="bodySmall" style={styles.heroCaption}>A Dgonix solution</Text></View><View style={styles.heroIcon}><MaterialCommunityIcons name="diamond-stone" color="#3A0D1C" size={isSmallScreen ? 26 : 30}/></View></View>
    <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><View style={styles.cardPad}><Text variant="titleMedium">Select metal</Text><View style={styles.metalRow}>{(['gold', 'silver'] as Metal[]).map(item => <Chip key={item} selected={metal === item} onPress={() => selectMetal(item)} showSelectedCheck icon={item === 'gold' ? 'gold' : 'circle-outline'} style={styles.chip}>{item === 'gold' ? 'Gold' : 'Silver'}</Chip>)}</View><RadioButton.Group value={purity} onValueChange={v => { setPurity(v as Purity); setResult(undefined); }}>{choices.map(item => <RadioButton.Item key={item} value={item} label={PURITY_LABELS[item]} position="leading" style={styles.radio}/>)}</RadioButton.Group></View></FadeInCard>
    <FadeInCard style={[styles.rateCard, { borderRadius: cardRadius, borderWidth: 1, borderColor: '#C9A22755' }]}><View style={styles.cardPad}>{loading ? <Text>Loading rates...</Text> : <><View style={styles.rateHeader}><View style={styles.rateContent}><Text variant="labelLarge">MANUAL RATE</Text><Text variant="headlineSmall" numberOfLines={1} adjustsFontSizeToFit style={{ color: theme.colors.primary }}>{displayRate ? `${displayRate} ${unit}` : 'Rate unavailable'}</Text><Text variant="bodySmall" numberOfLines={1}>{PURITY_LABELS[purity]} · per gram</Text></View><IconButton icon="pencil" mode="contained-tonal" size={20} onPress={openEdit} accessibilityLabel="Edit rate" /></View><Text variant="bodySmall" style={styles.updated}>Last updated {dateTime(rates.updatedAt)}</Text></>}</View></FadeInCard>
    <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><View style={styles.cardPad}><Text variant="titleMedium" style={styles.sectionTitle}>Jewellery details</Text><NumberField control={control} name="weight" label="Weight (grams)" suffix="gm" /><Menu visible={makingMenuVisible} onDismiss={() => setMakingMenuVisible(false)} anchor={<NumberField control={control} name="makingPercent" label="Making Charges" suffix={makingChargeType === 'percent' ? '%' : '₹'} onSuffixPress={() => setMakingMenuVisible(true)} />}><Menu.Item onPress={() => { setValue('makingChargeType', 'percent'); setMakingMenuVisible(false); }} title="Percentage (%)" /><Menu.Item onPress={() => { setValue('makingChargeType', 'fixedRate'); setMakingMenuVisible(false); }} title="Fixed Rate (₹)" /></Menu><NumberField control={control} name="hallmark" label="Hallmark Charges" suffix="₹" /><NumberField control={control} name="stone" label="Stone Charges" suffix="₹" /><NumberField control={control} name="rhodium" label="Rhodium Charges" suffix="₹" /><View style={styles.actions}><AnimatedButton mode="contained" icon="calculator" onPress={onCalculate} style={styles.calculate}>Calculate</AnimatedButton><AnimatedButton mode="outlined" onPress={() => { reset(defaultValues); setResult(undefined); }}>Reset</AnimatedButton></View></View></FadeInCard>
    {result && <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><Text variant="titleMedium" style={styles.resultTitle}>Calculation summary</Text><CalculationBreakdown result={result}/></FadeInCard>}
    <Modal visible={editing} animationType="slide" presentationStyle="pageSheet" onRequestClose={closeEdit}><View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}><View style={styles.modalHeader}><Text variant="titleLarge" style={styles.modalTitle}>Edit Rates (per gram)</Text><IconButton icon="close" onPress={closeEdit} /></View><ScrollView style={styles.modalBody}>{(['gold22', 'gold18', 'silver90', 'silver925'] as Purity[]).map(item => <RateInput key={item} label={PURITY_LABELS[item]} value={rates[item]} onChange={(value) => { void saveEdit({ [item]: value }); }} />)}</ScrollView></View></Modal>
  </ScrollView></SafeAreaView>; }

function RateInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const [text, setText] = useState(String(value));
  return <View style={styles.rateInputRow}><Text variant="bodyMedium" style={styles.rateInputLabel}>{label}</Text><TextInput value={text} onChangeText={setText} keyboardType="decimal-pad" mode="outlined" style={styles.rateInput} right={<TextInput.Affix text="₹/gm" />} onEndEditing={() => { const parsed = Number(text); if (!isNaN(parsed) && parsed > 0) { onChange(parsed); } }} /></View>;
}

  const styles = StyleSheet.create({ safe: { flex: 1 }, content: { gap: 14 }, hero: { minHeight: 106, padding: 18, borderRadius: 22, backgroundColor: '#3A0D1C', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#3A0D1C', shadowOpacity: .24, shadowRadius: 12, elevation: 5 }, title: { fontWeight: '800', color: '#FFFFFF' }, heroSub: { color: '#F2D29B', marginTop: 3 }, heroCaption: { color: '#F3E6D6', opacity: .72, marginTop: 4 }, heroIcon: { width: 58, height: 58, borderRadius: 18, backgroundColor: '#D8AB5F', justifyContent: 'center', alignItems: 'center', elevation: 4 }, card: { borderRadius: 16, overflow: 'hidden' }, rateCard: { borderRadius: 16, overflow: 'hidden' }, cardPad: { padding: 16 }, metalRow: { flexDirection: 'row', gap: 10, marginVertical: 10 }, chip: { flex: 1 }, radio: { paddingVertical: 1 }, rateHeader: { flexDirection: 'row', alignItems: 'center', gap: 4 }, rateContent: { flex: 1, minWidth: 0 }, updated: { marginTop: 14, opacity: .65 }, sectionTitle: { marginBottom: 15 }, actions: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end', marginTop: 6 }, calculate: { flex: 1 }, resultTitle: { paddingHorizontal: 16, paddingTop: 16 }, modalContent: { flex: 1 }, modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#00000010' }, modalTitle: { fontWeight: '800' }, modalBody: { flex: 1, padding: 16 }, rateInputRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }, rateInputLabel: { flex: 1 }, rateInput: { flex: 2 } });
