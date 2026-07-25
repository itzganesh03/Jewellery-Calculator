import { PURITY_LABELS } from '../constants';
import { CalculationResult } from '../types';
import { money } from './calculation';

export function buildShareText(result: CalculationResult): string {
  const lines = [
    'Swastik Gold, Jewellery Rate Calculator',
    `${PURITY_LABELS[result.purity]} · ${result.weight.toFixed(2)} gm`,
    '',
    `Metal Amount: ${money(result.metalAmount)}`,
    `Making Charges: ${money(result.makingAmount)}`,
    `Hallmark Charges: ${money(result.hallmark)}`,
    `Other Charges: ${money(result.other)}`,
  ];
  if (result.gstEnabled) lines.push(`GST (${result.gstRate}%): ${money(result.gst)}`);
  lines.push('', `Grand Total: ${money(result.total)}`, '', 'Shared via Swastik Gold · By Shraddha Group');
  return lines.join('\n');
}
