import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { Chip, Menu, RadioButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalculationBreakdown } from '../components/CalculationBreakdown';
import { FadeInCard } from '../components/FadeInCard';
import { NumberField } from '../components/Field';
import { AnimatedButton } from '../components/AnimatedButton';
import { DiamondIcon, GoldIcon, SilverIcon } from '../components/SvgIcons';
import { PURITY_LABELS } from '../constants';
import { useRates } from '../hooks/useRates';
import { useSettings } from '../hooks/useSettings';
import { CalculationResult, Metal, Purity } from '../types';
import { calculateJewellery, dateTime, money } from '../utils/calculation';

interface FormValues { weight: string; makingPercent: string; makingChargeType: 'percent' | 'fixedRate'; hallmark: string; stone: string; rhodium: string; }
const defaultValues: FormValues = { weight: '', makingPercent: '', makingChargeType: 'percent', hallmark: '0', stone: '0', rhodium: '0' };
export function HomeScreen() {
  const theme = useTheme();
  const { settings } = useSettings();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 360;
  const [metal, setMetal] = useState<Metal>('gold');
  const [purity, setPurity] = useState<Purity>('gold22');
  const [result, setResult] = useState<CalculationResult>();
  const [makingMenuVisible, setMakingMenuVisible] = useState(false);
  const { rates, loading, updateRates } = useRates();
  const { control, reset, watch, setValue } = useForm<FormValues>({ defaultValues });
  const makingChargeType = watch('makingChargeType');
  const weight = watch('weight');
  const makingPercent = watch('makingPercent');
  const hallmark = watch('hallmark');
  const stone = watch('stone');
  const rhodium = watch('rhodium');
  const choices: Purity[] = metal === 'gold' ? ['gold22', 'gold18'] : ['silver90', 'silver925'];
  const selectMetal = (next: Metal) => { setMetal(next); setPurity(next === 'gold' ? 'gold22' : 'silver90'); setResult(undefined); };
  useEffect(() => {
    const w = Number(weight);
    if (!w || w <= 0) {
      setResult(undefined);
      return;
    }
    const next = calculateJewellery({ metal, purity, weight: w, makingPercent: Number(makingPercent || 0), makingChargeType: makingChargeType || 'percent', hallmark: Number(hallmark || 0), stone: Number(stone || 0), rhodium: Number(rhodium || 0), rate: rates[purity], gstEnabled: settings.gstEnabled, gstRate: settings.gstRate });
    setResult(next);
  }, [weight, makingPercent, makingChargeType, hallmark, stone, rhodium, metal, purity, rates, settings.gstEnabled, settings.gstRate]);
  const rate = rates[purity];
  const displayRate = rate ? money(rate) : undefined;
  const unit = '/gm';
  const horizontalPadding = isSmallScreen ? 12 : 16;
  const cardRadius = isSmallScreen ? 14 : 16;
  return <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'right', 'left']}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding, paddingBottom: 32 + 16 }]} showsVerticalScrollIndicator={false}>
    <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><View style={styles.cardPad}><Text variant="titleMedium">Select metal</Text><View style={styles.metalRow}>{(['gold', 'silver'] as Metal[]).map(item => <Chip key={item} selected={metal === item} onPress={() => selectMetal(item)} showSelectedCheck icon={({ size, color }) => item === 'gold' ? <GoldIcon size={size ?? 18} color={color} /> : <SilverIcon size={size ?? 18} color={color} />} style={styles.chip}>{item === 'gold' ? 'Gold' : 'Silver'}</Chip>)}</View><RadioButton.Group value={purity} onValueChange={v => { setPurity(v as Purity); setResult(undefined); }}><View style={styles.radioRow}>{choices.map(item => <View key={item} style={styles.radioItem}><RadioButton value={item} /><Text variant="bodyMedium" style={styles.radioLabel}>{PURITY_LABELS[item]}</Text></View>)}</View></RadioButton.Group></View></FadeInCard>
    <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><View style={styles.cardPad}><Text variant="titleMedium" style={styles.sectionTitle}>Jewellery details</Text><NumberField control={control} name="weight" label="Weight (grams)" suffix="gm" containerStyle={styles.fullWidthField} /><View style={styles.chargesRow}><View style={styles.chargeCol}><View style={styles.makingFieldWrap}><Menu visible={makingMenuVisible} onDismiss={() => setMakingMenuVisible(false)} anchor={<Pressable onPress={() => setMakingMenuVisible(true)} style={styles.makingTypeButton}><View><Text variant="labelSmall" style={styles.makingTypeLabel}>Making type</Text><Text variant="bodyMedium" style={styles.makingTypeValue}>{makingChargeType === 'percent' ? 'Percentage (%)' : 'Fixed Rate (₹)'}</Text></View><Text style={styles.makingTypeChevron}>▾</Text></Pressable>}><Menu.Item onPress={() => { setValue('makingChargeType', 'percent'); setMakingMenuVisible(false); }} title="Percentage (%)" /><Menu.Item onPress={() => { setValue('makingChargeType', 'fixedRate'); setMakingMenuVisible(false); }} title="Fixed Rate (₹)" /></Menu></View></View><NumberField control={control} name="makingPercent" label="Making Charges" suffix={makingChargeType === 'percent' ? '%' : '₹'} containerStyle={styles.chargeCol} /></View><View style={styles.chargesRow}><NumberField control={control} name="hallmark" label="Hallmark" suffix="₹" containerStyle={styles.chargeCol} /><NumberField control={control} name="stone" label="Stone" suffix="₹" containerStyle={styles.chargeCol} /><NumberField control={control} name="rhodium" label="Rhodium" suffix="₹" containerStyle={styles.chargeCol} /></View><View style={styles.actions}><AnimatedButton mode="outlined" onPress={() => { reset(defaultValues); setResult(undefined); }}>Reset</AnimatedButton></View></View></FadeInCard>
    {result && <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><Text variant="titleMedium" style={styles.resultTitle}>Calculation summary</Text><CalculationBreakdown result={result}/></FadeInCard>}
    <View style={styles.hero}><View style={styles.heroText}><Text variant="headlineSmall" style={styles.title}>Swastik Gold{`\n`}</Text><Text variant="bodyMedium" style={styles.heroSub}>By Shraddha Group</Text><Text variant="bodyMedium" style={styles.heroSubLine2}>Jewellery Rate Calculator</Text><Text variant="bodySmall" style={styles.heroCaption}>A Dgonix solution</Text></View><View style={styles.heroIcon}><DiamondIcon color="#3A0D1C" size={isSmallScreen ? 26 : 30}/></View></View>
  </ScrollView></SafeAreaView>; }

  const styles = StyleSheet.create({ safe: { flex: 1 }, content: { gap: 14 }, hero: { minHeight: 120, padding: 18, borderRadius: 22, backgroundColor: '#3A0D1C', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }, heroText: { flex: 1, minWidth: 0 }, title: { fontWeight: '800', color: '#FFFFFF', fontSize: 22, lineHeight: 28 }, heroSub: { color: '#F2D29B', marginTop: 3, fontSize: 14, lineHeight: 20 }, heroSubLine2: { color: '#F2D29B', fontSize: 14, lineHeight: 20, marginTop: 1 }, heroCaption: { color: '#F3E6D6', opacity: .72, marginTop: 4, fontSize: 12, lineHeight: 16 }, heroIcon: { width: 58, height: 58, borderRadius: 18, backgroundColor: '#D8AB5F', justifyContent: 'center', alignItems: 'center', elevation: 4 }, card: { borderRadius: 16, overflow: 'hidden' }, rateCard: { borderRadius: 16, overflow: 'hidden' }, cardPad: { padding: 16 }, metalRow: { flexDirection: 'row', gap: 10, marginVertical: 10 }, chip: { flex: 1, borderWidth: 1.5 }, radioRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 10, paddingHorizontal: 4 }, radioItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }, radioLabel: { marginTop: 0 }, rateHeader: { flexDirection: 'row', alignItems: 'center', gap: 4 }, rateContent: { flex: 1, minWidth: 0 }, updated: { marginTop: 14, opacity: .65 }, sectionTitle: { marginBottom: 15 }, makingFieldWrap: { marginBottom: 12, width: '100%' }, makingTypeButton: { borderWidth: 1, borderColor: '#C9A22755', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff9f1' }, makingTypeLabel: { opacity: .65 }, makingTypeValue: { fontWeight: '700', marginTop: 2 }, makingTypeChevron: { fontSize: 18, opacity: .7, paddingLeft: 8 }, actions: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end', marginTop: 6 }, calculate: { flex: 1 }, resultTitle: { paddingHorizontal: 16, paddingTop: 16 }, modalContent: { flex: 1 }, modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#00000010' }, modalTitle: { fontWeight: '800' }, modalBody: { flex: 1, padding: 16 }, modalActions: { flexDirection: 'row', gap: 12, paddingTop: 8 }, modalActionButton: { flex: 1 }, rateInputRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }, rateInputLabel: { flex: 1 }, rateInput: { flex: 2 }, chargesRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' }, chargeCol: { flex: 1, minWidth: 0 }, fullWidthField: { width: '100%' } });
