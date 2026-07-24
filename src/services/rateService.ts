import { DEFAULT_RATES } from '../constants';
import { storage } from '../storage/storage';
import { Rates } from '../types';

export async function getRates(): Promise<Rates> {
  const cached = await storage.getRates();
  return cached ?? DEFAULT_RATES;
}

export async function saveManualRates(rates: Omit<Rates, 'updatedAt'>): Promise<Rates> {
  const next: Rates = { ...rates, updatedAt: new Date().toISOString() };
  await storage.saveRates(next);
  return next;
}
