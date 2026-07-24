import { Purity, Settings } from './types';

export const GOLD = '#C9A227';
export const SILVER = '#9E9E9E';
export const GST_RATE = 0.03;
export const DEFAULT_SETTINGS: Settings = { isDarkMode: false, currency: 'INR' };
export const DEFAULT_RATES = { gold22: 8425, gold18: 6893, silver90: 100.8, silver925: 103.6, updatedAt: new Date().toISOString() };
export const PURITY_LABELS: Record<Purity, string> = { gold22: '22KT (916)', gold18: '18KT (750)', silver90: 'Silver Orna Regular (90%)', silver925: 'Silver Orna Premium (92.5%)' };
