import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { CalculationResult } from '../types';
import { money } from '../utils/calculation';
import { PURITY_LABELS } from '../constants';
export async function shareCalculation(result: CalculationResult) {
  const html = `<html><body style="font-family:Arial;padding:28px;color:#29220f"><h1 style="color:#C9A227">Jewellery Rate Calculator</h1><p>${PURITY_LABELS[result.purity]} · ${result.weight} gm</p><hr/><table style="width:100%;font-size:15px"><tr><td>Metal Amount</td><td align="right">${money(result.metalAmount)}</td></tr><tr><td>Making Charges</td><td align="right">${money(result.makingAmount)}</td></tr><tr><td>Hallmark Charges</td><td align="right">${money(result.hallmark)}</td></tr><tr><td>Other Charges</td><td align="right">${money(result.other)}</td></tr><tr><td>GST (3%)</td><td align="right">${money(result.gst)}</td></tr></table><h2 style="text-align:right;color:#C9A227">Grand Total: ${money(result.total)}</h2><p style="color:#777">Generated ${new Date(result.createdAt).toLocaleString('en-IN')}</p></body></html>`;
  const file = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(file.uri, { mimeType: 'application/pdf', dialogTitle: 'Share jewellery calculation' });
}
