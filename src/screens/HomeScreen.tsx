import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Share, StyleSheet, View, useWindowDimensions, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { IconButton, Menu, RadioButton, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import { CalculationBreakdown } from '../components/CalculationBreakdown';
import { FadeInCard } from '../components/FadeInCard';
import { NumberField } from '../components/Field';
import { AnimatedButton } from '../components/AnimatedButton';
import { BookmarkIcon, DiamondIcon, GoldIcon, ShareIcon, SilverIcon } from '../components/SvgIcons';
import { PURITY_LABELS } from '../constants';
import { storage } from '../storage/storage';
import { CalculationResult, JewelleryFormValues, Metal, Purity, Rates, Settings } from '../types';
import { calculateJewellery, dateTime, money } from '../utils/calculation';
import { buildShareText } from '../utils/shareText';

const defaultValues: JewelleryFormValues = { weight: '', makingPercent: '', makingChargeType: 'percent', hallmark: '0', other: '0' };
export function HomeScreen({ settings, rates }: { settings: Settings; rates: Rates }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 360;
  const [metal, setMetal] = useState<Metal>('gold');
  const [purity, setPurity] = useState<Purity>('gold22');
  const [result, setResult] = useState<CalculationResult>();
  const [makingMenuVisible, setMakingMenuVisible] = useState(false);
  const [shareMenuVisible, setShareMenuVisible] = useState(false);
  const [savedSnackbar, setSavedSnackbar] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);
  const { control, reset, watch, setValue } = useForm<JewelleryFormValues>({ defaultValues });
  const makingChargeType = watch('makingChargeType');
  const weight = watch('weight');
  const makingPercent = watch('makingPercent');
  const hallmark = watch('hallmark');
  const other = watch('other');
  const choices: Purity[] = metal === 'gold' ? ['gold22', 'gold18'] : ['silver90', 'silver925'];
  const selectMetal = (next: Metal) => { setMetal(next); setPurity(next === 'gold' ? 'gold22' : 'silver90'); setResult(undefined); };
  useEffect(() => {
    const w = Number(weight);
    if (!w || w <= 0) {
      setResult(undefined);
      return;
    }
    const next = calculateJewellery({ metal, purity, weight: w, makingPercent: Number(makingPercent || 0), makingChargeType: makingChargeType || 'percent', hallmark: Number(hallmark || 0), other: Number(other || 0), rate: rates[purity], gstEnabled: settings.gstEnabled, gstRate: settings.gstRate });
    setResult(next);
  }, [weight, makingPercent, makingChargeType, hallmark, other, metal, purity, rates, settings.gstEnabled, settings.gstRate]);
  useFocusEffect(useCallback(() => {
    const editRecord = (route.params as { editRecord?: CalculationResult } | undefined)?.editRecord;
    if (!editRecord) return;
    setMetal(editRecord.metal);
    setPurity(editRecord.purity);
    reset({
      weight: String(editRecord.weight),
      makingPercent: String(editRecord.makingPercent),
      makingChargeType: editRecord.makingChargeType,
      hallmark: String(editRecord.hallmark),
      other: String(editRecord.other),
    });
    navigation.setParams({ editRecord: undefined } as never);
  }, [route.params]));
  const saveToHistory = async () => {
    if (!result) return;
    const history = await storage.getHistory();
    await storage.saveHistory([result, ...history]);
    setSavedSnackbar(true);
  };
  const shareAsText = async () => {
    if (!result) return;
    await Share.share({ message: buildShareText(result) });
  };
  const shareAsImage = async () => {
    if (!result || !viewShotRef.current?.capture) return;
    const uri = await viewShotRef.current.capture();
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: 'Share calculation' });
    }
  };
  const rate = rates[purity];
  const displayRate = rate ? money(rate) : undefined;
  const unit = '/gm';
  const horizontalPadding = isSmallScreen ? 12 : 16;
  const cardRadius = isSmallScreen ? 14 : 16;
  return <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'right', 'left']}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding, paddingBottom: 32 + 16 }]} showsVerticalScrollIndicator={false}>
    <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><View style={styles.cardPad}><Text variant="titleMedium">Select metal</Text><View style={styles.metalRow}>{(['gold', 'silver'] as Metal[]).map(item => { const active = metal === item; return <Pressable key={item} onPress={() => selectMetal(item)} android_ripple={{ color: theme.colors.onPrimary + '33' }} style={[styles.metalOption, { borderColor: active ? theme.colors.primary : theme.colors.outline, backgroundColor: active ? theme.colors.primary : theme.colors.surface }]}>{item === 'gold' ? <GoldIcon size={18} color={active ? theme.colors.onPrimary : theme.colors.primary} /> : <SilverIcon size={18} color={active ? theme.colors.onPrimary : theme.colors.primary} />}<Text variant="labelLarge" style={[styles.metalOptionText, { color: active ? theme.colors.onPrimary : theme.colors.onSurface }]}>{item === 'gold' ? 'Gold' : 'Silver'}</Text></Pressable>; })}</View><View style={styles.purityRow}>{choices.map(item => { const active = purity === item; return <Pressable key={item} onPress={() => { setPurity(item); setResult(undefined); }} style={[styles.purityOption, { borderColor: active ? theme.colors.primary : theme.colors.outline, backgroundColor: active ? theme.colors.primary + '14' : theme.colors.surface }]}><RadioButton value={item} status={active ? 'checked' : 'unchecked'} onPress={() => { setPurity(item); setResult(undefined); }} color={theme.colors.primary} /><Text variant="bodyMedium" style={styles.purityLabel} numberOfLines={2}>{PURITY_LABELS[item]}</Text></Pressable>; })}</View></View></FadeInCard>
    <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><View style={styles.cardPad}><Text variant="titleMedium" style={styles.sectionTitle}>Jewellery details</Text><NumberField control={control} name="weight" label="Weight (grams)" suffix="gm" containerStyle={styles.fullWidthField} /><View style={styles.chargesRow}><View style={styles.chargeCol}><View style={styles.makingFieldWrap}><Menu visible={makingMenuVisible} onDismiss={() => setMakingMenuVisible(false)} anchor={<Pressable onPress={() => setMakingMenuVisible(true)}><TextInput label="Making type" value={makingChargeType === 'percent' ? 'Percentage (%)' : 'Fixed Rate (₹)'} mode="outlined" dense editable={false} pointerEvents="none" right={<TextInput.Affix text="▾" />} /></Pressable>}><Menu.Item onPress={() => { setValue('makingChargeType', 'percent'); setMakingMenuVisible(false); }} title="Percentage (%)" /><Menu.Item onPress={() => { setValue('makingChargeType', 'fixedRate'); setMakingMenuVisible(false); }} title="Fixed Rate (₹)" /></Menu></View></View><View style={styles.resetCol}><AnimatedButton mode="outlined" onPress={() => { reset(defaultValues); setResult(undefined); }}>Reset</AnimatedButton></View></View></View></FadeInCard>
    {result && <FadeInCard style={[styles.card, { borderRadius: cardRadius }]}><View style={styles.resultHeader}><Text variant="titleMedium" style={styles.resultTitle}>Calculation summary</Text><View style={styles.resultActions}><IconButton icon={({ size, color }) => <BookmarkIcon size={size ?? 20} color={color} />} onPress={saveToHistory} accessibilityLabel="Save to history" /><Menu visible={shareMenuVisible} onDismiss={() => setShareMenuVisible(false)} anchor={<IconButton icon={({ size, color }) => <ShareIcon size={size ?? 20} color={color} />} onPress={() => setShareMenuVisible(true)} accessibilityLabel="Share calculation" />}><Menu.Item onPress={() => { setShareMenuVisible(false); shareAsText(); }} title="Share as text" /><Menu.Item onPress={() => { setShareMenuVisible(false); shareAsImage(); }} title="Share as image" /></Menu></View></View><CalculationBreakdown ref={viewShotRef} result={result} control={control} makingChargeType={makingChargeType}/></FadeInCard>}
    <View style={styles.hero}><View style={styles.heroText}><Text variant="headlineSmall" style={styles.title}>Swastik Gold{`\n`}</Text><Text variant="bodyMedium" style={styles.heroSub}>By Shraddha Group</Text><Text variant="bodyMedium" style={styles.heroSubLine2}>Jewellery Rate Calculator</Text><Text variant="bodySmall" style={styles.heroCaption}>A Dgonix solution</Text></View><View style={styles.heroIcon}><DiamondIcon color="#3A0D1C" size={isSmallScreen ? 26 : 30}/></View></View>
  </ScrollView>
  <Snackbar visible={savedSnackbar} onDismiss={() => setSavedSnackbar(false)} duration={2000}>Saved to history</Snackbar>
  </SafeAreaView>; }

  const styles = StyleSheet.create({ safe: { flex: 1 }, content: { gap: 10 }, hero: { minHeight: 120, padding: 18, borderRadius: 22, backgroundColor: '#3A0D1C', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }, heroText: { flex: 1, minWidth: 0 }, title: { fontWeight: '800', color: '#FFFFFF', fontSize: 22, lineHeight: 28 }, heroSub: { color: '#F2D29B', marginTop: 3, fontSize: 14, lineHeight: 20 }, heroSubLine2: { color: '#F2D29B', fontSize: 14, lineHeight: 20, marginTop: 1 }, heroCaption: { color: '#F3E6D6', opacity: .72, marginTop: 4, fontSize: 12, lineHeight: 16 }, heroIcon: { width: 58, height: 58, borderRadius: 18, backgroundColor: '#D8AB5F', justifyContent: 'center', alignItems: 'center', elevation: 4 }, card: { borderRadius: 16, overflow: 'hidden' }, rateCard: { borderRadius: 16, overflow: 'hidden' }, cardPad: { padding: 14 }, metalRow: { flexDirection: 'row', gap: 10, marginVertical: 10 }, metalOption: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 14, borderWidth: 1.5, overflow: 'hidden' }, metalOptionText: { fontWeight: '700' }, purityRow: { flexDirection: 'row', gap: 10 }, purityOption: { flex: 1, flexDirection: 'row', alignItems: 'center', minWidth: 0, borderRadius: 14, borderWidth: 1.5, paddingVertical: 2, paddingRight: 10 }, purityLabel: { flex: 1, flexShrink: 1, flexWrap: 'wrap' }, rateHeader: { flexDirection: 'row', alignItems: 'center', gap: 4 }, rateContent: { flex: 1, minWidth: 0 }, updated: { marginTop: 14, opacity: .65 }, sectionTitle: { marginBottom: 8 }, makingFieldWrap: { marginBottom: 8, width: '100%' }, resetCol: { flex: 1, minWidth: 0, justifyContent: 'center' }, calculate: { flex: 1 }, resultHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8, paddingTop: 8 }, resultTitle: { paddingHorizontal: 8 }, resultActions: { flexDirection: 'row', alignItems: 'center' }, modalContent: { flex: 1 }, modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#00000010' }, modalTitle: { fontWeight: '800' }, modalBody: { flex: 1, padding: 16 }, modalActions: { flexDirection: 'row', gap: 12, paddingTop: 8 }, modalActionButton: { flex: 1 }, rateInputRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }, rateInputLabel: { flex: 1 }, rateInput: { flex: 2 }, chargesRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 8 }, chargeCol: { flex: 1, minWidth: 0 }, fullWidthField: { width: '100%', marginBottom: 8 } });
