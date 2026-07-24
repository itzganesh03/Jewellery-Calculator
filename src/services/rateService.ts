import { DEFAULT_RATES } from '../constants';
import { storage } from '../storage/storage';
import { Rates } from '../types';
import { fetchGoldRates } from './goldService';
import { fetchSilverRates } from './silverService';

export async function getRates(): Promise<Rates> {
  try {
    const [gold, silver] = await Promise.all([fetchGoldRates(), fetchSilverRates()]);
    const rates: Rates = { ...gold, ...silver, updatedAt: new Date().toISOString(), source: 'live' };
    await storage.saveRates(rates); return rates;
  } catch {
    const cached = await storage.getRates();
    return cached ? { ...cached, source: 'cache' } : DEFAULT_RATES;
  }
}
