import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculationResult, Rates, Settings } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

const KEYS = { rates: '@jrc/rates', history: '@jrc/history', settings: '@jrc/settings' };
async function read<T>(key: string, fallback: T): Promise<T> { try { const value = await AsyncStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }
async function write<T>(key: string, value: T) { await AsyncStorage.setItem(key, JSON.stringify(value)); }
export const storage = {
  getRates: () => read<Rates | null>(KEYS.rates, null), saveRates: (rates: Rates) => write(KEYS.rates, rates),
  getHistory: () => read<CalculationResult[]>(KEYS.history, []), saveHistory: (items: CalculationResult[]) => write(KEYS.history, items),
  getSettings: () => read<Settings>(KEYS.settings, DEFAULT_SETTINGS), saveSettings: (settings: Settings) => write(KEYS.settings, settings),
};
