import { CalculationInput, CalculationResult } from '../types';

export const calculateJewellery = (input: CalculationInput): CalculationResult => {
  const metalAmount = input.purity === 'silver925' ? 0 : input.rate * input.weight;
  const makingAmount = input.purity === 'silver925'
    ? input.makingChargeType === 'fixedRate'
      ? Number(input.makingPercent || 0) * input.weight
      : Number(input.makingPercent || 0)
    : input.makingChargeType === 'percent'
      ? metalAmount * (input.makingPercent / 100)
      : input.makingPercent;
  const subtotal = metalAmount + makingAmount + input.hallmark + input.stone + input.rhodium;
  const gst = input.gstEnabled ? subtotal * (input.gstRate / 100) : 0;
  return { ...input, metalAmount, makingAmount, subtotal, gst, total: subtotal + gst, createdAt: new Date().toISOString() };
};
export const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
export const dateTime = (iso: string) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
