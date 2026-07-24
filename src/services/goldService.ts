import { currencyApi, metalsApi } from './api';

const TROY_OUNCE_GRAMS = 31.1034768;
export async function fetchGoldRates() {
  const [gold, exchange] = await Promise.all([metalsApi.get<{ price: number }>('/price/XAU'), currencyApi.get<{ rates: { INR: number } }>('/latest/USD')]);
  const basePerGram = (gold.data.price * exchange.data.rates.INR) / TROY_OUNCE_GRAMS;
  return { gold22: basePerGram * 0.916, gold18: basePerGram * 0.75 };
}
