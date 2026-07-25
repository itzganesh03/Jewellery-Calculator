import { forwardRef } from 'react';
import { Control } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Divider, Text } from 'react-native-paper';
import { NumberField } from './Field';
import { CalculationResult, JewelleryFormValues } from '../types';
import { money } from '../utils/calculation';

export const CalculationBreakdown = forwardRef<ViewShot, { result: CalculationResult; control: Control<JewelleryFormValues>; makingChargeType: 'percent' | 'fixedRate' }>(
  ({ result, control, makingChargeType }, ref) => {
    const staticRows: [string, string][] = [['Metal Weight', `${result.weight.toFixed(2)} gm`], ['Metal Amount', money(result.metalAmount)]];
    const editableRows: [string, 'makingPercent' | 'hallmark' | 'other', string][] = [
      ['Making Charges', 'makingPercent', makingChargeType === 'percent' ? '%' : '₹'],
      ['Hallmark', 'hallmark', '₹'],
      ['Other', 'other', '₹'],
    ];
    return (
      <ViewShot ref={ref} options={{ format: 'png', quality: 0.92 }} style={styles.root}>
        {staticRows.map(([label, value]) => <View style={styles.row} key={label}><Text variant="bodyMedium">{label}</Text><Text variant="bodyMedium">{value}</Text></View>)}
        {editableRows.map(([label, name, suffix]) => <View style={styles.row} key={name}><Text variant="bodyMedium">{label}</Text><NumberField control={control} name={name} label="" suffix={suffix} containerStyle={styles.valueField} /></View>)}
        {result.gstEnabled && <View style={styles.row}><Text variant="bodyMedium">{`GST (${result.gstRate}%)`}</Text><Text variant="bodyMedium">{money(result.gst)}</Text></View>}
        <Divider style={styles.divider}/>
        <View style={styles.row}><Text variant="titleMedium">Grand Total</Text><Text variant="titleLarge" style={styles.total}>{money(result.total)}</Text></View>
        <Text variant="bodySmall" style={styles.watermark}>Swastik Gold · By Shraddha Group</Text>
      </ViewShot>
    );
  }
);
const styles = StyleSheet.create({ root: { padding: 14, gap: 4 }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, valueField: { width: 100 }, divider: { marginVertical: 4 }, total: { fontWeight: '800' }, watermark: { textAlign: 'center', marginTop: 6, opacity: .5 } });
