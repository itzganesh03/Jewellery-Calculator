import { currencyApi, metalsApi } from './api';

const TROY_OUNCE_GRAMS = 31.1034768;
export async function fetchSilverRates() {
  const [silver, exchange] = await Promise.all([metalsApi.get<{ price: number }>('/price/XAG'), currencyApi.get<{ rates: { INR: number } }>('/latest/USD')]);
  const basePerGram = (silver.data.price * exchange.data.rates.INR) / TROY_OUNCE_GRAMS;
  return { silver90: basePerGram * 0.9, silver925: basePerGram * 0.925 };
}
